import json

from django.db.models import Q
from django.http import HttpRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.contrib.auth import get_user_model, login, logout

from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import CustomUser
from .utils import generate_otp, send_otp
from .serializers import CustomUserSerializer


class CsrfAPIView(APIView):
    @method_decorator(ensure_csrf_cookie)
    # creates a session on client browser
    # token is generated and send
    def get(self, request: HttpRequest):
        response = Response(data={"detail": "CSRF cookie set!"})
        response["X-CSRFToken"] = get_token(request)
        return response


class SessionAPIView(APIView):
    def get(self, request: HttpRequest):
        if request.user.is_authenticated:
            return Response(data={"isAuthenticated": True})
        return Response(data={"isAuthenticated": False})


class EmailVerificaionAPIView(APIView):
    """
    This view checks if user is exists with given email
    if exists:
        send an otp to that email and continue validation
    else: creates a user with given email and begin validation
    """

    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        email = data.get("email")

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = User.objects.create_user(email=email)

        otp = generate_otp()
        user.otp = otp
        user.save()

        # send_otp(email, otp)
        return Response(
            data={"detail": f"OTP sended: {otp}"}
        )  # sending OTP as response for debugging


class OTPVerificationAPIVIew(APIView):
    def post(self, request: HttpRequest):
        data = json.loads(request.body)
        email = data.get("email")
        otp = data.get("otp")

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
            if user.otp == otp:
                # use custom passwordless auth backend
                login(
                    request, user, backend="apps.user.backends.PasswordlessAuthBackend"
                )
                return Response(data={"detail": "Login success"})
            else:
                return Response(
                    data={"detail": "Wrong OTP"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except User.DoesNotExist:
            return Response(
                data={"detail": "User not found"},
                status=status.HTTP_404_NOT_FOUND,
            )


class WhoAmIAPIView(APIView):
    def get(self, request: HttpRequest):
        try:
            serializer = CustomUserSerializer(request.user, many=False)
            return Response(data={"detail": serializer.data})
        except Exception as e:
            return Response(
                data={"detail": "Something went wrong"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LogoutAPIView(APIView):
    def get(self, request: HttpRequest):
        if not request.user.is_authenticated:
            return Response(
                data={"detail": "User isn't authenticated"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        logout(request)
        return Response(data={"detail": "User logout successfully"})


class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def perform_update(self, serializer):
        """
        on update from admin panel
        this prevents avatar field getting cleared if new file isnt provided
        """
        instance = self.get_object()

        if "avatar" in self.request.FILES:
            serializer.save()
        else:
            # save current avatar if new one isnt provided
            serializer.validated_data["avatar"] = instance.avatar
            serializer.save()


class UserDetailViewV2(generics.RetrieveAPIView):
    lookup_field = "username"
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()


class SearchUserView(generics.ListAPIView):
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        username = self.kwargs["username"]
        request_user = self.request.user
        # search users with username and first name
        # exclude requested user from response
        search_users = CustomUser.objects.filter(
            Q(username__icontains=username) | Q(first_name__icontains=username)
        ).exclude(id=request_user.id)

        return search_users


class CheckUserView(APIView):
    def get(self, request: HttpRequest, username: str, format=None):
        user_exists = CustomUser.objects.filter(username=username).exists()
        return Response(data={"userExists": user_exists})
