import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .models import ChatRoom, ChatMessage
from ..user.models import OnlineUser
from .serializers import ChatMessageSerializer, OnlineUserSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    def save_message(self, room_id, content, type):
        chat_room = ChatRoom.objects.get(room_id=room_id)
        chat_message = ChatMessage.objects.create(
            room=chat_room,
            sender=self.user,
            type=type,
            content=content["message"],
            file=content["file"],
        )
        serializer = ChatMessageSerializer(chat_message, many=False)
        return {
            "action": "message",
            "message": serializer.data,
        }

    def read_message(self, message_id):
        message = ChatMessage.objects.get(pk=message_id)
        message.is_read = True
        message.save()

        serializer = ChatMessageSerializer(message, many=False)
        return {"action": "read_message", "message": serializer.data}

    def edit_message(self, message_id, new_message):
        message = ChatMessage.objects.get(pk=message_id)
        message.content = new_message
        if message.edited is not True:
            message.edited = True
        message.save()

        serializer = ChatMessageSerializer(message, many=False)
        return {"action": "edit_message", "message": serializer.data}

    def get_online_users(self):
        online_users = OnlineUser.objects.all()
        serializer = OnlineUserSerializer(online_users, many=True)
        return serializer.data

    def add_online_user(self, user):
        try:
            OnlineUser.objects.create(user=user)
        except:
            pass

    def delete_online_user(self, user):
        try:
            OnlineUser.objects.get(user=user).delete()
        except:
            pass

    def read_room(self, room_id):
        chat_room = ChatRoom.objects.get(room_id=room_id)
        unread_messages = chat_room.chat_message.filter(is_read=False)
        for message in unread_messages:
            message.is_read = True
            message.save()

    async def send_online_users_list(self):
        online_users_list = await database_sync_to_async(self.get_online_users)()
        chat_message = {
            "type": "send_message",
            "message": {
                "action": "online_users",
                "online_users_list": online_users_list,
            },
        }
        await self.channel_layer.group_send("online_users", chat_message)

    async def connect(self):
        """
        get user from request and get chat rooms where user is a part (includes both DMs and GROUPS)
        add user and rooms to channel layer
        update online users list with requested user and send socket message to client
        """
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
        """
        on disconnect discard all allocations on channel layers
        update online users and send socket message
        """
        await database_sync_to_async(self.delete_online_user)(self.user)
        await self.send_online_users_list()
        for room in self.rooms:
            await self.channel_layer.group_discard(room.room_id, self.channel_name)
        await self.channel_layer.group_discard("online_users", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data["action"]
        room_id = data["room_id"]
        send_message = {}

        if action == "message":
            # handle when user send message in a room
            content = data["content"]
            type = data["type"]
            send_message = await database_sync_to_async(self.save_message)(
                room_id, content, type
            )
        elif action == "read_room":
            # when user opens a chat room, read all messages
            await database_sync_to_async(self.read_room)(room_id)
            send_message = {
                "action": "read_room",
            }
        elif action == "read_message":
            # when user sees single message
            # prolly send on intersection observer from client
            message_id = data["message_id"]
            send_message = await database_sync_to_async(self.read_message)(message_id)
        elif action == "edit_message":
            # when user edits a message
            message_id = data["message_id"]
            new_message = data["new_message"]
            send_message = await database_sync_to_async(self.edit_message)(message_id, new_message)

        # send socket message to that specific channel (room)
        await self.channel_layer.group_send(
            room_id,
            {
                "type": "send_message",
                "message": send_message,
            },
        )

    async def send_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps(message))
