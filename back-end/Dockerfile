# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the project (make sure tsconfig is set up correctly)
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy only the essentials
COPY package*.json ./
RUN npm install --omit=dev

# Copy the compiled output
COPY --from=builder /app/dist ./dist

# Expose the port your NestJS app listens on
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
