FROM oven/bun:1.0

WORKDIR /app

COPY package.json bun.lockb .

RUN bun install

COPY . .

EXPOSE 5173

CMD ["bun", "start"]
