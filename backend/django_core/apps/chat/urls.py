from django.urls import path

from . import views

urlpatterns = [
    path("chat-rooms/", views.ChatRoomListView.as_view()),
    path("chat-rooms/<str:room_id>/", views.ChatMessageListView.as_view()),
    path("chat-rooms/<str:room_id>/read-all/", views.ReadRoomChatMessages.as_view()),
    path("online-users/", views.OnlineUsersView.as_view()),
]
