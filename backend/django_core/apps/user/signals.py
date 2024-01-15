from django.db.models.signals import post_save
from .models import CustomUser
from django.dispatch import receiver
import uuid
from django.db import IntegrityError


@receiver(post_save, sender=CustomUser)
def create_username(sender, instance, created, **kwargs):
    if created:
        base_username = instance.email.split("@")[0]

        while True:
            unique_id = str(uuid.uuid4().hex[:4])
            instance.username = f"{base_username}-{unique_id}"

            try:
                instance.save()
                break
            except IntegrityError:
                continue