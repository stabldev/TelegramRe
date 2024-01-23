from django.urls import path

from . import views

urlpatterns = [
    path("chat-rooms/", views.ChatRoomListView.as_view()),
]