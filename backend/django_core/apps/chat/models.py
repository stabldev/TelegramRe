from django.db import models
from shortuuidfield import ShortUUIDField
from apps.user.models import CustomUser


class ChatRoom(models.Model):
	room_id = ShortUUIDField()
	type = models.CharField(max_length=10, default="DM")
	member = models.ManyToManyField(CustomUser)
	name = models.CharField(max_length=50, null=True, blank=True)

	def __str__(self):
		return f"{self.room_id} -> {self.name}"


class ChatMsg(models.Model):
	room = models.ForeignKey(ChatRoom, on_delete=models.SET_NULL, null=True, related_name="chat_message")
	user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
	content = models.TextField()
	is_read = models.BooleanField(default=False)
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.user} -> {self.room}"


class ChatMessage(models.Model):
    # fmt: off
	sender = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="sender")
	reciever = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="reciever")

	message = models.TextField()
	is_read = models.BooleanField(default=False)
	date = models.DateTimeField(auto_now_add=True)
	# fmt: off

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
