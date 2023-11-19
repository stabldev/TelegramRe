from django.urls import path

from apps.api.views.chat import (
    InboxView,
    MessagesView,
    SendMessageView,
    UpdateMessageView,
)
from apps.api.views.user import SearchUserView, UserDetailView

urlpatterns = [
    # chat views
    path("inbox/<int:pk>/", InboxView.as_view(), name="inbox"),
    path(
        "messages/<int:sender_id>/<int:reciever_id>/",
        MessagesView.as_view(),
        name="messages",
    ),
    path("send-message/", SendMessageView.as_view(), name="send-message"),
    path(
        "update-message/<int:pk>/", UpdateMessageView.as_view(), name="update-message"
    ),
    # user views
    path("user/<int:pk>/", UserDetailView.as_view(), name="profile_view"),
    path("search-user/<str:username>/", SearchUserView.as_view(), name="search-user"),
]
