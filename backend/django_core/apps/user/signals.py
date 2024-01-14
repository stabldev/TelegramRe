from django.db.models.signals import post_save
from .models import CustomUser
from django.dispatch import receiver


@receiver(post_save, sender=CustomUser)
def create_username(sender, instance, created, **kwargs):
    if created:
        instance.username = instance.email.split("@")[0]
        instance.save()