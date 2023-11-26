from django.urls import path, include

from apps.api.views.chat import (
    InboxView,
    MessagesView,
    SendMessageView,
    UpdateMessageView,
)
from apps.api.views.user import SearchUserView, UserDetailView
from apps.api.views.auth import get_csrf_token, login_view, check_session, logout_view

# fmt: off
urlpatterns = [
    # auth views
    path("auth/", include([
        path("get-csrf/", get_csrf_token, name="get-csrf"),
        path("login/", login_view, name="login-view"),
        path("logout/", logout_view, name="logout-view"),
        path("check-session/", check_session, name="check-session"),
    ])),
    # chat views
    path("inbox/<int:pk>/", InboxView.as_view(), name="inbox"),
    # prefix urls
    path("messages/", include([
        path("<int:sender_id>/<int:reciever_id>/", MessagesView.as_view(), name="messages"),
        path("send/", SendMessageView.as_view(), name="send-message"),
        path("update/<int:pk>/", UpdateMessageView.as_view(), name="update-message"),
    ])),
    # user views
    path("users/", include([
        path("<int:pk>/", UserDetailView.as_view(), name="user"),
        path("search/<str:username>/", SearchUserView.as_view(), name="search-user"),
    ])),
]
# fmt: off
