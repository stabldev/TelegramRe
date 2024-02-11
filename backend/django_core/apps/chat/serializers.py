from rest_framework import serializers

from .models import ChatMessage, ChatRoom
from ..user.models import CustomUser, OnlineUser


class ChatMemberSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ["id", "username", "full_name", "is_verified", "avatar", "bio"]

    def get_full_name(self, obj):
        return obj.get_full_name()


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "type", "room", "sender", "content", "file", "is_read", "timestamp"]


class ChatRoomSerializer(serializers.ModelSerializer):
    member = ChatMemberSerializer(many=True, read_only=True)
    message = serializers.SerializerMethodField()
    unreads = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ["id", "room_id", "type", "name", "unreads", "message", "member"]

    def get_message(self, obj):
        chat_message = obj.chat_message.last()
        serializer = ChatMessageSerializer(chat_message)
        return serializer.data

    def get_unreads(self, obj):
        unreads = obj.chat_message.filter(is_read=False).count()
        return unreads

class OnlineUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineUser
        fields = ["user"]