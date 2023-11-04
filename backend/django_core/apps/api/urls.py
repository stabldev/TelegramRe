from django.urls import path

from apps.api import views

urlpatterns = [
    path("user/<int:pk>/", views.ProfileDetailView.as_view(), name="profile_view"),
]
