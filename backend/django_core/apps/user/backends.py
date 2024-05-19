from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

"""
custom authentication backend for passwordless auth
authenticates with email only
usage: login(backend="....backends.PasswordlessAuthBackend")
"""
class PasswordlessAuthBackend(ModelBackend):
    def authenticate(self, request, email):
        User = get_user_model()
        try:
            user = User.objects.get(email=email)
            return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
