from rest_framework import serializers

from apps.user.models import CustomUser


class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = CustomUser
		fields = "__all__"