from django.db import models

from django_core.utilities.numeric_uuid import generate_numeric_uuid


class UUIDMixin(models.Model):
    id = models.CharField(
        primary_key=True, default=generate_numeric_uuid(), editable=False
    )

    class Meta:
        abstract = True
