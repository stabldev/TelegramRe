from django.urls import path, include

from . import views

# fmt: off
urlpatterns = [
    path("chat-rooms/", include([
        path("", views.ChatRoomListView.as_view()),
        path("<str:room_id>/", include([
            path("", views.ChatMessageView.as_view()),
            path("read-all/", views.ReadRoomChatMessages.as_view()),
        ])),
    ])),
]
# fmt: on
