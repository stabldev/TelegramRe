FROM python:3

# Setting environment variables
# For our home directory path
ENV HOME=/code
# Diasbles generation of pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# stdout and stderr streams are not buffered and sent straight to your terminal
ENV PYTHONUNBUFFERED 1

# Setting working directory
WORKDIR $HOME

COPY requirements.txt $HOME
# Install required dependencies
RUN pip install -r requirements.txt

# Copy project code to working directory
COPY . $HOME

EXPOSE 8000
# Run Django on 0.0.0.0:8000
CMD [ "python", "django_core/manage.py", "runserver", "0.0.0.0:8000" ]