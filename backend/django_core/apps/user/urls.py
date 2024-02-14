from django.urls import path, include

from .views import (
    csrf_view,
    session_view,
    email_verification_view,
    register_email_verification_view,
    otp_verification_view,
    who_am_i_view,
    logout_view,
    UserDetailView,
    SearchUserView,
)

# fmt: off
urlpatterns = [
    # user views
    path("", include([
        path("<int:pk>/", UserDetailView.as_view(), name="user"),
        path("search/<str:username>/", SearchUserView.as_view(), name="search-user"),
    ])),
    # auth views
    path("auth/", include([
        path("csrf/", csrf_view, name="csrf"),
        path("session/", session_view, name="session"),
        path("email-verification/", email_verification_view, name="email-verification"),
        path("register-email-verification/", register_email_verification_view, name="register-email-verification"),
        path("otp-verification/", otp_verification_view, name="otp-verification"),
        path("who_am_i/", who_am_i_view, name="who_am_i"),
        path("logout/", logout_view, name="logout"),
    ])),
]
# fmt: on
