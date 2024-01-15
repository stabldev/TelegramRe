import json

from django.http import HttpRequest, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework import status

from apps.api.serializers import RegisterSerializer
from apps.user.models import CustomUser
from apps.user.utils import generate_otp, send_otp


@ensure_csrf_cookie
def csrf_view(request):
    response = JsonResponse({"detail": "CSRF cookie set!"})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def sign_up_view(request: HttpRequest):
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if email is None or password is None:
        return JsonResponse(
            data={"detail": "Please provide email and password."},
            status=400,
        )

    user = authenticate(email=email, password=password)
    if user is None:
        return JsonResponse(
            data={"detail": "User not found! invalid credentials."},
            status=400,
        )

    login(request, user)
    return JsonResponse({"detail": "Successfully logged in!"})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse(data={"detail": "You're not logged in!"}, status=400)

    logout(request)
    return JsonResponse({"detail": "Successfully logged out!"})


def check_session(request):
    if request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": True})
    return JsonResponse({"isAuthenticated": False})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse(data={"detail": "You're not logged in!"}, status=400)
    return JsonResponse({"detail": request.user.username})


@require_POST
def sign_in_view(request: HttpRequest):
    data = json.loads(request.body)
    serializer = RegisterSerializer(data=data)

    if not serializer.is_valid():
        return JsonResponse({"detail": serializer._errors}, status=400)

    serializer.save()
    return JsonResponse({"detail": "Successfully registered!"})

@require_POST
def verify_email_view(request: HttpRequest):
    data = json.loads(request.body)
    email = data.get("email")

    if not email:
        raise ValueError("Email is required")

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        user = CustomUser.create(email=email)
    
    otp = generate_otp()
    user.otp = otp
    user.save()

    send_otp(email, otp)
    return Response({ "detail": "OTP has been send to your email"}, status=status.HTTP_200_OK)