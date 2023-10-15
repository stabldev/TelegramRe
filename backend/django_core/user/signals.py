from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.core.exceptions import ObjectDoesNotExist

from .models import CustomUser

@receiver(pre_save, sender=CustomUser)
def delete_previous_avatar(sender, instance, **kwargs):
	if instance.pk:
		try:
			old_avatar = CustomUser.objects.get(pk=instance.pk).avatar
		except ObjectDoesNotExist:
			return
		else:
			new_avatar = instance.avatar
			# delete if new and old avatar are not same
			if old_avatar and old_avatar.url != new_avatar.url:
				old_avatar.delete(save=False)