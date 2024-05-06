FROM python:3.11-slim

# Setting environment variables
# Diasbles generation of pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# stdout and stderr streams are not buffered and sent straight to your terminal
ENV PYTHONUNBUFFERED 1

# Setting working directory
WORKDIR /code

COPY requirements.txt .
# Install required dependencies
RUN pip install -r requirements.txt

# Copy project code to working directory
COPY . .

# Run server
CMD [ "python", "django_core/manage.py", "runserver", "0.0.0.0:8000" ]
