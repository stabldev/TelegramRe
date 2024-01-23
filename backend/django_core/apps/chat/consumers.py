import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import ChatRoom, ChatMsg

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope["url_route"]["kwargs"]["user_id"]
        self.rooms = await database_sync_to_async(
            list
        )(ChatRoom.objects.filter(member=self.user_id))
        for room in self.rooms:
            await self.channel_layer.group_add(
                room.room_id,
                self.channel_name
            )

        await self.accept()

    async def disconnect(self, close_code):
        for room in self.rooms:
            self.channel_layer.group_discard(
                room.room_id,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)
        room_id = data["room_id"]
        message = data["message"]

        await self.channel_layer.group_send(
            room_id,
            {
                "type": "send_message",
                "message": message,
            }
        )

    async def send_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps(message))