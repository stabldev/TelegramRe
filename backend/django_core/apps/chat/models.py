from django.db import models
from django.utils.translation import gettext_lazy as _
from dynamic_filenames import FilePattern

from apps.user.models import CustomUser
from mixins.models.uuid import UUIDMixin
from mixins.models.created_at import CreatedAtMixin
from django_core.utilities.get_color import get_color

# Dynamic avatar filename
avatar_pattern = FilePattern(filename_pattern="avatar/{uuid:s}{ext}")


class ChatRoom(UUIDMixin, CreatedAtMixin):
    class ChatRoomType(models.TextChoices):
        DM = "DM", _("DM")
        GROUP = "GROUP", _("GROUP")

    type = models.CharField(
        max_length=10, choices=ChatRoomType, default=ChatRoomType.DM
    )
    members = models.ManyToManyField(CustomUser)
    name = models.CharField(max_length=50, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(upload_to=avatar_pattern, null=True, blank=True)
    color = models.CharField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # assign a default name if empty
        if not self.name:
            self.name = "DM"
        if not self.color and self.type == "GROUP":
            self.color = get_color()
        super(ChatRoom, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.id}: {self.name}"


class ChatMessage(CreatedAtMixin):
    class ChatType(models.TextChoices):
        TXT = "text", "text"
        IMG = "image", "image"
        GIF = "gif", "gif"

    type = models.CharField(
        max_length=10, choices=ChatType.choices, default=ChatType.TXT
    )
    room = models.ForeignKey(
        ChatRoom, on_delete=models.SET_NULL, null=True, related_name="chat_message"
    )
    sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    content = models.TextField(null=True, blank=True)
    file = models.FileField(upload_to="chat_files/", null=True, blank=True)
    is_read = models.BooleanField(default=False)
    edited = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender} -> {self.room}"

    class Meta:
        # DB
        db_table = "chat_message"
        db_table_comment = "Chat messages"
