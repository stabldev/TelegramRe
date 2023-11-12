from django.shortcuts import render
from django.db.models import OuterRef, Subquery, Q

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.api.serializers import ProfileSerializer, ChatMessageSerializer
from apps.user.models import CustomUser
from apps.chat.models import ChatMessage


# Create your views here.
class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]


class InboxView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get("pk")
        messages = ChatMessage.objects.filter(
            id__in=Subquery(
                CustomUser.objects.filter(
                    Q(sender__reciever=user_id) | Q(reciever__sender=user_id)
                )
                .distinct()
                .annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef("id"), reciever=user_id)
                            | Q(reciever=OuterRef("id"), sender=user_id)
                        )
                        .order_by("-id")[:1]
                        .values_list("id", flat=True)
                    )
                )
                .values_list("last_msg", flat=True)
                .order_by("-id")
            )
        ).order_by("-id")

        return messages
