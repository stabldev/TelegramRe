# Monorepo for Telegram-RE
A Telegram inspired web messaging experience with the power of [`django`](https://www.djangoproject.com/) and [`solid-start`](https://start.solidjs.com/getting-started/what-is-solidstart)\
Project status: **In Development**

## Installation and Setup
1. [Docker/Podman](#dockerpodman)
2. [Native setup](#nativesetup)


> [!IMPORTANT]
> Make sure you've proper `.env` configured for frontend and backend.

## Docker/Podman
You can use [docker](https://www.docker.com/) or [podman](https://podman.io/)(recommended) to build/test application.
### Docker and docker-compose
Install docker and run `docker.service`, also make sure you've [docker-compose](https://docs.docker.com/compose/) installed.
```bash
docker-compose up -d
```
### Podman and podman-compose
Install podman and [podman-compose](https://github.com/containers/podman-compose) on your system.
```bash
podman-compose up -d
# to run on detach mode
```
