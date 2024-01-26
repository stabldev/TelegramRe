from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView

from .models import ChatRoom, ChatMessage
from ..user.models import OnlineUser
from .serializers import ChatRoomSerializer, ChatMessageSerializer, OnlineUserSerializer


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

class ReadRoomChatMessages(APIView):
    def get(self, request, *args, **kwargs):
        room_id = self.kwargs["room_id"]
        chat_room = ChatRoom.objects.get(room_id=room_id)
        unread_messages = chat_room.chat_message.filter(is_read=False)
        for message in unread_messages:
            message.is_read = True
            message.save()
        return JsonResponse({ "detail": "Messages Readed" })

class OnlineUsersView(ListAPIView):
    queryset = OnlineUser.objects.all()
    serializer_class = OnlineUserSerializer