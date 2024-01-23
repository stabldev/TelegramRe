from rest_framework import serializers

from .models import ChatMsg, ChatRoom
from ..api.serializers import CustomUserSerializer

class ChatMsgSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMsg
        fields = "__all__"

class ChatRoomSerializer(serializers.ModelSerializer):
    member = CustomUserSerializer(many=True, read_only=True)

    class Meta:
        model = ChatRoom
        fields = ["room_id", "type", "name", "member"]