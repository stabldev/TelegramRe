from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

USER_MODEL: type[CustomUser] = get_user_model()


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = USER_MODEL
        fields = "__all__"


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = USER_MODEL
        fields = "__all__"
