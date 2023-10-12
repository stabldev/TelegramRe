from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class CustomUser(AbstractUser):
	# extra fields
	bio = models.TextField(blank=True)
	avatar = models.ImageField(
		upload_to="avatar/",
		default=None,
		blank=True,
		null=True
	)