from django.urls import path

from apps.api.views.chat import InboxView, MessagesView
from apps.api.views.user import ProfileDetailView

urlpatterns = [
    # chat views
    path("inbox/<int:pk>/", InboxView.as_view(), name="inbox"),
    path(
        "messages/<int:sender_id>/<int:reciever_id>/",
        MessagesView.as_view(),
        name="messages",
    ),
    # user views
    path("user/<int:pk>/", ProfileDetailView.as_view(), name="profile_view"),
]
