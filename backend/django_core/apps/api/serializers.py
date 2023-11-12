from rest_framework import serializers

from apps.user.models import CustomUser
from apps.chat.models import ChatMessage


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_verified",
            "avatar",
            "bio",
            "last_login",
            "date_joined",
        ]


class ChatMessageSerializer(serializers.ModelSerializer):
    sender_id = serializers.IntegerField(source='sender.id', read_only=True)
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    sender_full_name = serializers.SerializerMethodField()
    sender_avatar = serializers.ImageField(source='sender.avatar', read_only=True)

    class Meta:
        model = ChatMessage
        fields = ["id", "message", "is_read", "date", "sender_id", "sender_username", "sender_full_name", "sender_avatar"]

    def get_sender_full_name(self, obj):
        return obj.sender.get_full_name()