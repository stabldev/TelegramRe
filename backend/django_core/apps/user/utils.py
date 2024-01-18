import random
import string
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import get_template


def generate_otp(length=5):
    chars = string.digits
    otp = "".join(random.choice(chars) for _ in range(length))
    return otp


def send_otp(email, otp):
    context = {"otp": otp}
    template = get_template("email/otp_template.html").render(context)

    subject = "OTP for login to Telegram RE"
    message = f"OTP: {otp}"
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]

    send_mail(
        subject,
        None,
        from_email,
        recipient_list,
        fail_silently=False,
        html_message=template,
    )
