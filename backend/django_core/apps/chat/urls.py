from django.urls import path

from . import views

urlpatterns = [
    path("chat-rooms/", views.ChatRoomListView.as_view()),
    path("chat-rooms/<str:room_id>/", views.ChatMessageListView.as_view()),
]