from django.db import models
from django.utils.timezone import now

class CreatedAtMixin(models.Model):
    created_at = models.DateTimeField(default=now)

    class Meta:
        abstract = True
