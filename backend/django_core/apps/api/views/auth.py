import json

from django.http import HttpRequest, JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token

from apps.api.serializers import RegisterSerializer


@ensure_csrf_cookie
def set_csrf_view(request):
    response = JsonResponse({"detail": "CSRF cookie set!"})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def sign_up_view(request: HttpRequest):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse(
            data={"detail": "Please provide username and password."},
            status=400,
        )

    user = authenticate(username=password, password=password)
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
