from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import CustomUser, OnlineUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "is_verified",
        "is_staff",
    )

    search_fields = (
        "email",
        "first_name",
        "last_name",
    )

    list_filter = (
        "is_verified",
        "is_active",
        "is_staff",
    )

    readonly_fields = (
        "date_joined",
        "last_login",
    )

    # Overrite fieldsets to include additional fields
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (
            _("Personal info"),
            {
                "fields": (
                    "username",
                    "first_name",
                    "last_name",
                    "avatar",
                    "bio",
                    "is_verified",
                    "otp",
                    "online",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Date and time"), {"fields": ("last_login", "date_joined")}),
    )

    # Overrite add_fieldsets to include additional fields
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                ),
            },
        ),
    )

@admin.register(OnlineUser)
class OnlineUserAdmin(admin.ModelAdmin):
    model = OnlineUser
    fields = ["user"]