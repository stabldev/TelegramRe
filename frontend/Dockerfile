FROM node:18-slim

# Working directory
WORKDIR /app
# Copy pnpm files
COPY package.json package-lock.json /app/
# Install
RUN npm install
# Copy project code to working directory
COPY . .

EXPOSE 3000
# Run server on 0.0.0.0:3000
CMD ["npm", "run", "dev"]
