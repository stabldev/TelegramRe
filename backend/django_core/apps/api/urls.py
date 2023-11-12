from django.urls import path

from apps.api import views

urlpatterns = [
    # Chat
    path("inbox/<int:pk>/", views.InboxView.as_view(), name="inbox"),
    path(
        "messages/<int:sender_id>/<int:reciever_id>/",
        views.MessagesView.as_view(),
        name="messages",
    ),
    # Profile
    path("user/<int:pk>/", views.ProfileDetailView.as_view(), name="profile_view"),
]
