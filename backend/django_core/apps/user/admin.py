from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .forms import CustomUserChangeForm, CustomUserCreationForm

from .models import CustomUser

USER_MODEL: type[CustomUser] = get_user_model()


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = USER_MODEL

    list_display = (
        "get_custom_username",
        "first_name",
        "last_name",
        "is_verified",
        "is_staff",
    )

    # return username starts with '@'
    def get_custom_username(self, obj):
        return f"@{obj.username}"
    get_custom_username.short_description = "username"

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
                    "username",
                    "password",
                )
            },
        ),
        (
            _("Personal info"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "avatar",
                    "bio",
                    "is_verified",
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
                    "username",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
