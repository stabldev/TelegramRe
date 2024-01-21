from django.db.models import Q, OuterRef, Subquery

from rest_framework import generics

from apps.api.serializers import ChatMessageSerializer, InboxMessageSerializer
from apps.user.models import CustomUser
from apps.chat.models import ChatMessage


class InboxView(generics.ListAPIView):
    serializer_class = InboxMessageSerializer

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
        chat_user_username = self.kwargs["username"]
        user_username = self.request.user.username

        return ChatMessage.objects.filter(
            sender__username__in=[chat_user_username, user_username],
            reciever__username__in=[chat_user_username, user_username]
        )


class SendMessageView(generics.CreateAPIView):
    serializer_class = ChatMessageSerializer


class UpdateMessageView(generics.RetrieveUpdateAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
