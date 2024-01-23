from django.contrib import admin

from .models import ChatMessage, ChatRoom, ChatMsg


# Register your models here.
@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ("__str__", "sender", "reciever", "get_message", "is_read")

    def get_message(self, obj):
        return f"{obj.message[0:50]}..."

    get_message.short_description = "message"

@admin.register(ChatRoom)
class CharRoomAdmin(admin.ModelAdmin):
    list_display = ("__str__", "name", "type", "get_member_count")

    def get_member_count(self, obj):
        return obj.member.count()
    get_member_count.short_description = "member count"

@admin.register(ChatMsg)
class ChatMsgAdmin(admin.ModelAdmin):
    list_display = ("__str__", "message", "timestamp")