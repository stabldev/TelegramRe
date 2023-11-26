import json

from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST


@ensure_csrf_cookie
def set_csrf_view(request):
    return JsonResponse({"detail": "CSRF cookie set!"})

@require_POST
def login_view(request):
    data = request.POST
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