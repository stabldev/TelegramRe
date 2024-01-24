from django.urls import re_path
from . import consumers

websockets_urlpatterns = [
    re_path(r"ws/chat/$", consumers.ChatConsumer.as_asgi()),
]
