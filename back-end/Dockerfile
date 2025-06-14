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

COPY --from=builder /app/dist ./dist
COPY package*.json ./
# Debug step
RUN echo "=== FILES IN /app ===" && find /app
COPY --from=builder /app/dist/drizzle.config.js ./drizzle.config.js
COPY migrations ./migrations


RUN npm install --omit=dev

EXPOSE 3000

CMD ["sh", "-c", "npx drizzle-kit push && npm run start:prod"]
