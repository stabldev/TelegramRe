from django.urls import path, include

from apps.api.views.chat import (
    InboxView,
    MessagesView,
    SendMessageView,
    UpdateMessageView,
)
from apps.api.views.user import SearchUserView, UserDetailView
from apps.api.views.auth import set_csrf_cookie, login_view, check_session

# fmt: off
urlpatterns = [
    # auth views
    path("auth/", include([
        path("set-csrf-cookie/", set_csrf_cookie, name="set-csrf-cookie"),
        path("login/", login_view, name="login-view"),
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
