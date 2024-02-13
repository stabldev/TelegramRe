from rest_framework import serializers
from .models import CustomUser


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
