import json

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token
from django.contrib.auth import get_user_model, login, logout

from rest_framework import status, generics

from .models import CustomUser
from .utils import generate_otp, send_otp
from .serializers import CustomUserSerializer


@ensure_csrf_cookie
def csrf_view(request):
    response = JsonResponse({"detail": "CSRF cookie set!"})
    response["X-CSRFToken"] = get_token(request)
    return response


def session_view(request):
    if request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": True})
    return JsonResponse({"isAuthenticated": False})


@require_POST
def email_verification_view(request: HttpRequest):
    data = json.loads(request.body)
    email = data.get("email")

    User = get_user_model()
    try:
        user = User.objects.get(email=email)
        otp = generate_otp()
        user.otp = otp
        user.save()

        send_otp(email, otp)
        return JsonResponse({"detail": "OTP sended"})

    except User.DoesNotExist:
        return JsonResponse(
            {"detail": "User doesn't exists"}, status=status.HTTP_400_BAD_REQUEST
        )


@require_POST
def register_email_verification_view(request: HttpRequest):
    data = json.loads(request.body)
    email = data.get("email")

    User = get_user_model()
    try:
        user = User.objects.create(email=email)
        otp = generate_otp()
        user.otp = otp
        user.save()

        send_otp(email, otp)
        return JsonResponse({"detail": "OTP sended"})

    except User.DoesNotExist:
        return JsonResponse(
            {"detail": "User with same email already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@require_POST
def otp_verification_view(request: HttpRequest):
    data = json.loads(request.body)
    email = data.get("email")
    otp = data.get("otp")

    User = get_user_model()
    try:
        user = User.objects.get(email=email)
        if user.otp == otp:
            login(request, user, backend="apps.user.backends.PasswordlessAuthBackend")
            return JsonResponse({"detail": "Login success"})
        else:
            return JsonResponse(
                {"detail": "Wrong OTP"}, status=status.HTTP_400_BAD_REQUEST
            )
    except User.DoesNotExist:
        return JsonResponse(
            {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
        )


def who_am_i_view(request: HttpRequest):
    try:
        serializer = CustomUserSerializer(request.user, many=False)
        return JsonResponse({"detail": serializer.data})
    except Exception as e:
        print(e)
        return JsonResponse(
            {"detail": "Something went wrong"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


def logout_view(request: HttpRequest):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"detail": "User isn't authenticated"}, status=status.HTTP_400_BAD_REQUEST
        )
    logout(request)
    return JsonResponse({"detail": "User logout successfully"})


# Class-based views
class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def perform_update(self, serializer):
        instance = self.get_object()

        if "avatar" in self.request.FILES:
            serializer.save()
        else:
            serializer.validated_data["avatar"] = instance.avatar
            serializer.save()


class SearchUserView(generics.ListAPIView):
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        request_user = self.request.user

        search_users = CustomUser.objects.filter(
            Q(username__icontains=username) | Q(first_name__icontains=username)
        ).exclude(id=request_user.id)

        return search_users
