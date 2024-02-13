from django.db import models
from shortuuidfield import ShortUUIDField
from apps.user.models import CustomUser
from dynamic_filenames import FilePattern


class ChatRoom(models.Model):
    room_id = ShortUUIDField()
    type = models.CharField(max_length=10, default="DM")
    member = models.ManyToManyField(CustomUser)
    name = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.room_id} -> {self.name}"


class ChatMessage(models.Model):
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
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} -> {self.room}"

    class Meta:
        # DB
        db_table = "chat_message"
        db_table_comment = "Chat messages"

        ordering = ["timestamp"]
        get_latest_by = ["order_timestamp"]
