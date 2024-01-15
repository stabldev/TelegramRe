import random
import string
from django.conf import settings
from django.core.mail import send_mail

def generate_otp(length=5):
    chars = string.digits
    otp = "".join(random.choice(chars) for _ in range(length))
    return otp

def send_otp(email, otp):
    subject = "OTP for login to Telegram RE"
    message = f"OTP: {otp}"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]
    
    send_mail(
        subject,
        message,
        from_email,
        recipient_list
    )