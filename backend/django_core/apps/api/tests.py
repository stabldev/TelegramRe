from django.test import TestCase
from django.shortcuts import reverse
from rest_framework import status
from rest_framework.test import APIClient

from apps.user.models import CustomUser

# Create your tests here.
class APITests(TestCase):
	def setUp(self):
		self.client = APIClient()
		self.test_user = CustomUser.objects.create_user(username="test-user", password="test-password")

	def test_get_user(self):
		url = reverse("user", kwargs={"pk": self.test_user.id})
		# authenticate user
		self.client.force_authenticate(user=self.test_user)
		response = self.client.get(url)
		# check response status code
		self.assertEqual(response.status_code, status.HTTP_200_OK)