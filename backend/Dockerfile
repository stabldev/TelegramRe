FROM python:3.11-slim

ENV \
  # python:
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  # pip:
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  # poetry:
  POETRY_VERSION=1.8.2 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR="/var/cache/pypoetry"

RUN pip install "poetry==$POETRY_VERSION" && poetry --version

WORKDIR /code

COPY pyproject.toml poetry.lock /code/

RUN poetry install

COPY . .
# Run server
CMD [ "poetry", "run", "django_core/manage.py", "runserver", "0.0.0.0:8000" ]