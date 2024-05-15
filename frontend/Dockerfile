FROM node:18-slim

# Working directory
WORKDIR /app
# Copy pnpm files
COPY package.json pnpm-lock.yaml /app/
# Install pnpm
RUN npm install -g pnpm
# Install using pnpm
RUN pnpm install
# Copy project code to working directory
COPY . .

EXPOSE 3000
# Run server on 0.0.0.0:3000
CMD ["pnpm", "dev"]
