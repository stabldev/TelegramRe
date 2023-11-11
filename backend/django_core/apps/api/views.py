from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.api.serializers import ProfileSerializer, ChatMessageSerializer
from apps.user.models import CustomUser
from apps.chat.models import ChatMessage


# Create your views here.
class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]

class InboxView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    queryset = ChatMessage.objects.all()