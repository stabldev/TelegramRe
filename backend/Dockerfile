FROM python:3.11-slim AS base
# Global ENV variables
ENV \
  # python:
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONDONTWRITEBYTECODE=1 \
  PYTHONHASHSEED=random \
  # pip:
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100
# Global working directory
WORKDIR /code
# Copy poetry files to cache
COPY pyproject.toml poetry.lock /code/

# Build stage
FROM base AS build

ENV \
  # poetry:
  POETRY_VERSION=1.8.2 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_NO_INTERACTION=1 \
  POETRY_CACHE_DIR="/var/cache/pypoetry"

# Install specific poetry
RUN pip install "poetry==$POETRY_VERSION" && poetry --version
# Install dependencies using poetry
RUN poetry install --no-interaction --no-ansi
# Copy project code to working directory
RUN poetry export --without-hashes --format=requirements.txt > /code/requirements.txt

# Final stage
FROM base AS final
# Copy requirements.txt exported from poetry
COPY --from=build /code/requirements.txt /code/requirements.txt
# Install requirements.txt
RUN pip install -r requirements.txt
# Expose port
EXPOSE 8000
# Run server
CMD [ "python3", "django_core/manage.py", "runserver", "0.0.0.0:8000" ]
