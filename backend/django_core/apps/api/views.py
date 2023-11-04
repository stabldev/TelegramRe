from django.shortcuts import render
from rest_framework import generics

from apps.api.serializers import ProfileSerializer
from apps.user.models import CustomUser


# Create your views here.
class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    queryset = CustomUser.objects.all()
