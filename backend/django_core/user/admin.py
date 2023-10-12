from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser

USER_MODEL: type[CustomUser] = get_user_model()

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
	model = USER_MODEL

	list_display = (
		"get_username",
		"first_name",
		"last_name",
		"is_staff"
	)

	list_filter = (
		"is_active",
		"is_staff"
	)

	readonly_fields =  (
		"date_joined",
		"last_login"
	)