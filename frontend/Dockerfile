FROM node:18-slim

# Working directory
WORKDIR /app

# Copy pnpm files
COPY package.json package-lock.json /app/

# Install
RUN npm install

# Copy project code to working directory
COPY . .

# Run server on port 3000 and hmr socket on port  4000
EXPOSE 3000
EXPOSE 4000

CMD ["npm", "run", "dev"]
