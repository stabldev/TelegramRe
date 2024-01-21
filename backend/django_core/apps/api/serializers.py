from django.core import validators
from rest_framework import serializers

from django.contrib.auth.password_validation import validate_password

from apps.user.models import CustomUser
from apps.chat.models import ChatMessage


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "is_verified",
            "avatar",
            "bio",
            "last_login",
            "date_joined",
        ]
        read_only_fields = ["last_login", "date_joined"]


class ChatMessageSerializer(serializers.ModelSerializer):
    sender = CustomUserSerializer(many=False)
    reciever = CustomUserSerializer(many=False)

    class Meta:
        model = ChatMessage
        fields = ["id", "sender", "reciever", "message", "is_read", "date"]