from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from rest_framework.generics import ListAPIView

from .models import ChatRoom
from .serializers import ChatRoomSerializer

# Create your views here.
class ChatRoomListView(ListAPIView):
    serializer_class = ChatRoomSerializer
    model = serializer_class.Meta.model

    def get_queryset(self):
        user = self.request.user
        chat_rooms = self.model.objects.filter(member=user)
        return chat_rooms