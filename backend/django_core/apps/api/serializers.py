from django.core import validators
from rest_framework import serializers

from django.contrib.auth.password_validation import validate_password

from apps.user.models import CustomUser


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
            "online",
        ]
        read_only_fields = ["last_login", "date_joined"]
