import json

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.views.decorators.http import require_POST
from rest_framework.views import APIView

@ensure_csrf_cookie
def set_csrf_cookie(request):
	return JsonResponse({"detail": "CSRF cookie set!"})

@require_POST
def login_view(request):
	data = request.POST
	username = data["username"]
	password = data["password"]

	return JsonResponse({"detail": data})

def check_session(request):
	if request.user.is_authenticated:
		return JsonResponse({"is_authenticated": True})
	return JsonResponse({"is_authenticated": False})