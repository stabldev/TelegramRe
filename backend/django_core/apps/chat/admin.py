from django.contrib import admin

from .models import ChatMessage


# Register your models here.
@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ("user", "sender", "reciever", "get_message", "is_read")

    def get_message(self, obj):
        return f"{obj.message[0:50]}..."
    get_message.short_description = "message"