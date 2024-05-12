# telegram-re-monorepo
A Telegram inspired web messaging experience with the power of [`django`](https://www.djangoproject.com/) and [`solid-start`](https://start.solidjs.com/getting-started/what-is-solidstart)\
Project status: **In Development**

# Installation and Setup
1. [Docker/Podman](#dockerpodman)

## Pre-requisites
#### Clone repo and change directory:
```bash
git clone https://github.com/tokitouq/telegram-re-monorepo.git
cd telegram-re-monorepo
```
#### Add proper values in `.env` files for both /backend and /frontend.
Steps:
1. Go to /backend or /frontend
2. Copy and paste `.env.example` file (it has required env keys)
3. Fill required keys with proper values
4. Make sure you've proper `.env` file on both ends directory.

## Docker/Podman
You could use [docker](https://www.docker.com/) or [podman](https://podman.io/)(recommended) to build/test application.
### Docker and docker-compose
Install docker and run `docker.service`, also make sure you've [docker-compose](https://docs.docker.com/compose/) installed.
```bash
docker-compose up -d
```
### Podman and podman-compose
Install podman and [podman-compose](https://github.com/containers/podman-compose) on your system.
```bash
podman-compose up -d
```
