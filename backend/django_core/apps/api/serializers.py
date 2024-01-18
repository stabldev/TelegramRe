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


# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(validators=[validate_password])
    password2 = serializers.CharField()

    class Meta:
        model = CustomUser
        fields = [
            "username",
            "password",
            "password2",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password field didn't match."}
            )
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data["username"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "sender", "reciever", "message", "is_read", "date"]
