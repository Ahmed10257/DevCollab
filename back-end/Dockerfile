# Stage 1: Build the NestJS app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:18-slim

WORKDIR /app
# Debugging step
RUN echo "=== DEBUG FILE STRUCTURE ===" && find /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev


# Copy drizzle config and migrations
COPY drizzle.config.json ./drizzle.config.json
COPY migrations ./migrations


EXPOSE 3000

CMD ["sh", "-c", "npx drizzle-kit push && npm run start:prod"]
