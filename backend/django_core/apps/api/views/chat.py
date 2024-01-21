from django.db.models import Q, OuterRef, Subquery

from rest_framework import generics

from apps.api.serializers import ChatMessageSerializer
from apps.user.models import CustomUser
from apps.chat.models import ChatMessage


class InboxView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        user = self.request.user

        messages = ChatMessage.objects.filter(
            id__in=Subquery(
                CustomUser.objects.filter(
                    Q(sender__reciever=user) | Q(reciever__sender=user)
                )
                .distinct()
                .annotate(
                    last_message=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=user, reciever=OuterRef("id")) | Q(reciever=user, sender=OuterRef("id"))
                        )
                        .order_by("-id")[:1]
                        .values_list("id", flat=True)
                    )
                )
                .values_list("last_message", flat=True)
                .order_by("-id")
            )
        ).order_by("-id")
        
        return messages


class MessagesView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        sender_id = self.kwargs["sender_id"]
        reciever_id = self.kwargs["reciever_id"]

        return ChatMessage.objects.filter(
            sender__in=[sender_id, reciever_id], reciever__in=[sender_id, reciever_id]
        )


class SendMessageView(generics.CreateAPIView):
    serializer_class = ChatMessageSerializer


class UpdateMessageView(generics.RetrieveUpdateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
