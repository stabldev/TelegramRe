from rest_framework import serializers

from .models import ChatMessage, ChatRoom
from ..api.serializers import CustomUserSerializer
from ..user.models import CustomUser

class ChatMemberSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ["id", "username", "full_name", "is_verified", "avatar"]

    def get_full_name(self, obj):
        return obj.get_full_name();


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "room", "sender", "content", "is_read", "timestamp"]

class ChatRoomSerializer(serializers.ModelSerializer):
    member = ChatMemberSerializer(many=True, read_only=True)
    message = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ["room_id", "type", "name", "message", "member"]

    def get_message(self, obj):
        chat_message = obj.chat_message.last()
        serializer = ChatMessageSerializer(chat_message)
        return serializer.data