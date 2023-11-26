import json
from django.contrib.auth import authenticate, login, logout

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.views.decorators.http import require_POST

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

@ensure_csrf_cookie
def get_csrf_token(request):
	return JsonResponse({"detail": "CSRF cookie set!"})

@require_POST
def login_view(request):
	data = request.POST
	username = data.get("username")
	password = data.get("password")

	if username is None or password is None:
		return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

	user = authenticate(username=password, password=password)

	if user is None:
		return JsonResponse({'detail': 'User not found! invalid credentials.'}, status=400)

	login(request, user)
	return JsonResponse({'detail': 'Successfully logged in!'})

def logout_view(request):
	if not request.user.is_authenticated:
		return JsonResponse({"detail": "You're not logged in!"}, status=400)

	logout(request)
	return JsonResponse({"detail": "Successfully logged out!"})

def check_session(request):
	if request.user.is_authenticated:
		return JsonResponse({"is_authenticated": True})
	return JsonResponse({"is_authenticated": False})