from django.contrib import admin

from .models import ChatMessage


# Register your models here.
@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ["user", "sender", "reciever", "message", "is_read"]
    list_editable = ["message", "is_read"]
