import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import ChatRoom, ChatMessage
from .serializers import ChatMessageSerializer

class ChatConsumer(AsyncWebsocketConsumer):
    def save_message(self, room_id, message):
        chat_room = ChatRoom.objects.get(room_id=room_id)
        chat_msg = ChatMessage.objects.create(
            room=chat_room, user=self.user, content=message
        )
        serializer = ChatMessageSerializer(chat_msg, many=False)
        return serializer.data

    async def connect(self):
        self.user = self.scope["user"]
        self.rooms = await database_sync_to_async(
            list
        )(ChatRoom.objects.filter(member=self.user))
        for room in self.rooms:
            await self.channel_layer.group_add(
                room.room_id,
                self.channel_name
            )

        await self.accept()

    async def disconnect(self, close_code):
        for room in self.rooms:
            await self.channel_layer.group_discard(
                room.room_id,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)
        room_id = data["room_id"]
        message = data["message"]
        chat_message = await database_sync_to_async(
            self.save_message
        )(room_id, message)

        await self.channel_layer.group_send(
            room_id,
            {
                "type": "send_message",
                "message": chat_message,
            }
        )

    async def send_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps(message))