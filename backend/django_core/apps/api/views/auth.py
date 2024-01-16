from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token

from apps.api.serializers import RegisterSerializer
from apps.user.models import CustomUser
from apps.user.utils import generate_otp, send_otp


@ensure_csrf_cookie
def csrf_view(request):
    response = JsonResponse({"detail": "CSRF cookie set!"})
    response["X-CSRFToken"] = get_token(request)
    return response

def check_session(request):
    if request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": True})
    return JsonResponse({"isAuthenticated": False})
