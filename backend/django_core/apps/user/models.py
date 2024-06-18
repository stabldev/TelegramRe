from django.contrib.auth.models import AbstractUser
from django.db import IntegrityError, models
from dynamic_filenames import FilePattern
from django.utils.translation import gettext_lazy as _

from .managers import UserManager
from django_core.utilities.numeric_uuid import generate_numeric_uuid

# Dynamic avatar filename
avatar_pattern = FilePattern(filename_pattern="avatar/{uuid:s}{ext}")


# Custom user with extra fields
class CustomUser(AbstractUser):
    username = models.CharField(max_length=100, unique=True, blank=True, null=True)
    email = models.EmailField(_("email address"), unique=True)
    # extra fields
    is_verified = models.BooleanField(default=False)
    bio = models.TextField(blank=True)
    otp = models.CharField(max_length=5, null=True, blank=True)

    avatar = models.ImageField(
        upload_to=avatar_pattern,
        blank=True,
        null=True,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def save(self, *args, **kwargs):
        if self.username is None:
            self.username = self.email.split("@")[0]
        super().save(*args, **kwargs)


class OnlineUser(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.email
