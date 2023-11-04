from rest_framework import serializers

from apps.user.models import CustomUser


class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = CustomUser
		fields = ["id", "username", "email", "first_name", "last_name", "is_verified", "avatar", "bio", "last_login", "date_joined"]