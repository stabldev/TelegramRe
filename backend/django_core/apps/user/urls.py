from django.urls import path, include

from .views import (
    CsrfAPIView,
    SessionAPIView,
    EmailVerificaionAPIView,
    OTPVerificationAPIVIew,
    WhoAmIAPIView,
    LogoutAPIView,
    UserDetailView,
    SearchUserView,
    CheckUserView,
    UserDetailViewV2,
)

# fmt: off
urlpatterns = [
    # user views
    path("", include([
        path("<int:pk>/", UserDetailView.as_view(), name="user"),
        path("v2/<str:username>/", UserDetailViewV2.as_view(), name="user-v2"),
        path("search/<str:username>/", SearchUserView.as_view(), name="search-user"),
        path("check/<str:username>/", CheckUserView.as_view(), name="check-user"),
    ])),
    # auth views
    path("auth/", include([
        path("csrf/", CsrfAPIView.as_view(), name="csrf"),
        path("session/", SessionAPIView.as_view(), name="session"),
        path("email-verification/", EmailVerificaionAPIView.as_view(), name="email-verification"),
        path("otp-verification/", OTPVerificationAPIVIew.as_view(), name="otp-verification"),
        path("who_am_i/", WhoAmIAPIView.as_view(), name="who_am_i"),
        path("logout/", LogoutAPIView.as_view(), name="logout"),
    ])),
]
# fmt: on
