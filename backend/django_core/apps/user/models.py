from django.contrib.auth.models import AbstractUser
from django.db import models
from dynamic_filenames import FilePattern

# Dynamic avatar filename
avatar_pattern = FilePattern(filename_pattern="avatar/{uuid:s}{ext}")


# Custom user with extra fields
class CustomUser(AbstractUser):
    # extra fields
    is_verified = models.BooleanField(default=False)
    bio = models.TextField(blank=True)

    avatar = models.ImageField(
        upload_to=avatar_pattern, default=None, blank=True, null=True
    )
