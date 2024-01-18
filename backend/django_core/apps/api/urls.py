from django.urls import path, include

from apps.api.views.chat import (
    InboxView,
    MessagesView,
    SendMessageView,
    UpdateMessageView,
)
from apps.api.views.user import SearchUserView, UserDetailView
from .views.auth import (
    set_csrf_view,
    check_session_view,
    email_verification_view,
    register_email_verification_view,
    otp_verification_view,
    who_am_i_view,
)

# fmt: off
urlpatterns = [
    # auth views
    path("auth/", include([
        path("set-csrf/", set_csrf_view, name="csrf"),
        path("session/", check_session_view, name="session"),
        path("email-verification/", email_verification_view, name="email-verification"),
        path("register-email-verification/", register_email_verification_view, name="register-email-verification"),
        path("otp-verification/", otp_verification_view, name="otp-verification"),
        path("who_am_i/", who_am_i_view, name="who_am_i"),
    ])),
    # chat views
    path("inbox/", InboxView.as_view(), name="inbox"),
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
