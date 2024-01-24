from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from rest_framework.generics import ListAPIView

from .models import ChatRoom, ChatMessage
from .serializers import ChatRoomSerializer, ChatMessageSerializer


# Create your views here.
class ChatRoomListView(ListAPIView):
    serializer_class = ChatRoomSerializer
    model = ChatRoom

    def get_queryset(self):
        user = self.request.user
        chat_rooms = self.model.objects.filter(
            member=user, chat_message__isnull=False
        ).distinct()
        return chat_rooms


class ChatMessageListView(ListAPIView):
    serializer_class = ChatMessageSerializer
    model = ChatMessage

    def get_queryset(self):
        room_id = self.kwargs["room_id"]
        chat_messages = self.model.objects.filter(room__room_id=room_id)
        return chat_messages
