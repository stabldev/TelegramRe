from django.contrib import admin

from .models import ChatMessage, ChatRoom


# Register your models here.
@admin.register(ChatRoom)
class CharRoomAdmin(admin.ModelAdmin):
    list_display = ("__str__", "name", "type", "get_member_count")

    def get_member_count(self, obj):
        return obj.member.count()
    get_member_count.short_description = "member count"

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ("__str__", "content", "timestamp")