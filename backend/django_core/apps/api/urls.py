from django.urls import path

from apps.api.views import ProfileDetailView

urlpatterns = [
	path("user/<int:pk>/", ProfileDetailView.as_view(), name="profile_view"),
]