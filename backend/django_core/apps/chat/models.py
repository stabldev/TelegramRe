from django.db import models

from apps.user.models import CustomUser

# Create your models here.
class ChatMessage(models.Model):
	user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="user")
	sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="sender")
	reciever = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="reciever")

	message = models.TextField()
	is_read = models.BooleanField(default=False)
	date = models.DateTimeField(auto_now_add=True)

	class Meta:
		# DB
		db_table = "chat_message"
		db_table_comment = "Chat messages"

		ordering = ["date"]
		get_latest_by = ["order_date"]

	def __str__(self) -> str:
		return f"{self.sender} - {self.reciever}"

	@property
	def get_sender(self):
		sender = CustomUser.objects.filter(id=self.sender.id).first()
		return sender

	@property
	def get_reciever(self):
		reciever = CustomUser.objects.filter(id=self.reciever.id).first()
		return reciever
