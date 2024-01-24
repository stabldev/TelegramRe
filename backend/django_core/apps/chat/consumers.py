import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import ChatRoom, ChatMessage
from ..user.models import OnlineUser
from .serializers import ChatMessageSerializer, OnlineUserSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    def save_message(self, room_id, message):
        chat_room = ChatRoom.objects.get(room_id=room_id)
        chat_message = ChatMessage.objects.create(
            room=chat_room, sender=self.user, content=message
        )
        serializer = ChatMessageSerializer(chat_message, many=False)
        return {
            "action": "message",
            "message": serializer.data,
        }

    def get_online_users(self):
        online_users = OnlineUser.objects.all()
        serializer = OnlineUserSerializer(online_users, many=True)
        return serializer.data

    def add_online_user(self, user):
        try:
            OnlineUser.objects.create(user=user)
        except: pass

    def delete_online_user(self, user):
        try:
            OnlineUser.objects.get(user=user).delete()
        except: pass

    async def send_online_users_list(self):
        online_users_list = await database_sync_to_async(self.get_online_users)()
        chat_message = {
            "type": "send_message",
            "message": {
                "action": "online_users",
                "online_user_list": online_users_list,
            },
        }
        await self.channel_layer.group_send("online_users", chat_message)

    async def connect(self):
        self.user = self.scope["user"]
        self.rooms = await database_sync_to_async(list)(
            ChatRoom.objects.filter(member=self.user)
        )
        for room in self.rooms:
            await self.channel_layer.group_add(room.room_id, self.channel_name)
        await self.channel_layer.group_add("online_users", self.channel_name)
        await database_sync_to_async(self.add_online_user)(self.user)
        await self.send_online_users_list()
        await self.accept()

    async def disconnect(self, close_code):
        await database_sync_to_async(self.delete_online_user)(self.user)
        await self.send_online_users_list()
        for room in self.rooms:
            await self.channel_layer.group_discard(room.room_id, self.channel_name)
        await self.channel_layer.group_discard("online_users", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        room_id = data["room_id"]
        message = data["message"]
        chat_message = await database_sync_to_async(self.save_message)(room_id, message)

        await self.channel_layer.group_send(
            room_id,
            {
                "type": "send_message",
                "message": chat_message,
            },
        )

    async def send_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps(message))
