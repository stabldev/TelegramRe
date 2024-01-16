from django.urls import path, include

from apps.api.views.chat import (
    InboxView,
    MessagesView,
    SendMessageView,
    UpdateMessageView,
)
from apps.api.views.user import SearchUserView, UserDetailView
from .views.auth import (
    csrf_view,
    check_session,
    verify_email_view,
    verify_otp_view,
    complete_verification_view,
)

# fmt: off
urlpatterns = [
    # auth views
    path("auth/", include([
        path("csrf/", csrf_view, name="csrf"),
        path("session/", check_session, name="session"),
        path("verify-email/", verify_email_view, name="verify-email"),
        path("verify-otp/", verify_otp_view, name="verify-otp"),
        path("complete-verify/", complete_verification_view, name="complete-verify"),
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
