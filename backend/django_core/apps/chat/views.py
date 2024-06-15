from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework import mixins, generics
from rest_framework.response import Response
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

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


class ChatMessageView(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    serializer_class = ChatMessageSerializer
    model = ChatMessage

    def get_queryset(self):
        """
        returns all chat messages on specific room with id
        used for get request (self.list)
        """
        room_id = self.kwargs["room_id"]
        chat_messages = self.model.objects.filter(room__id=room_id)
        return chat_messages

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        response = self.create(request, *args, **kwargs)
        """
        201 status code means: request successfully create resources in server
        if response is 201:
            get created message details and send socket message to that room
        """
        if response.status_code == 201:
            channel_layer = get_channel_layer()
            new_message = response.data
            room = ChatRoom.objects.get(pk=new_message["room"])

            async_to_sync(channel_layer.group_send)(
                room.id,
                {
                    "type": "send_message",
                    "message": {
                        "action": "message",
                        "message": new_message,
                    },
                },
            )

        return response


# TODO: add socket support to this as well
class ReadRoomChatMessages(APIView):
    def get(self, request, *args, **kwargs):
        room_id = self.kwargs["room_id"]
        chat_room = ChatRoom.objects.get(id=room_id)
        unread_messages = chat_room.chat_message.filter(is_read=False)
        for message in unread_messages:
            message.is_read = True
            message.save()
        return JsonResponse({"detail": "Messages Readed"})


class OnlineUsersView(ListAPIView):
    queryset = OnlineUser.objects.all()
    serializer_class = OnlineUserSerializer
