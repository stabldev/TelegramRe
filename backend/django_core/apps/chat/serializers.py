from rest_framework import serializers

from .models import ChatMessage, ChatRoom
from ..user.models import CustomUser, OnlineUser


class ChatMemberSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "full_name",
            "is_verified",
            "avatar",
            "color",
            "bio",
        ]

    def get_full_name(self, obj):
        return obj.get_full_name()


class ChatMessageSerializer(serializers.ModelSerializer):
    sender = ChatMemberSerializer()

    class Meta:
        model = ChatMessage
        fields = [
            "id",
            "type",
            "room",
            "sender",
            "content",
            "file",
            "is_read",
            "edited",
            "created_at",
        ]


class ChatRoomSerializer(serializers.ModelSerializer):
    message = serializers.SerializerMethodField()
    unreads = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = [
            "id",
            "type",
            "name",
            "unreads",
            "is_verified",
            "avatar",
            "bio",
            "color",
            "message",
            "members",
        ]

    def get_members(self, obj):
        if obj.type == "GROUP":
            return list(obj.members.only("id").values_list("id", flat=True))
        return ChatMemberSerializer(obj.members, many=True).data

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
