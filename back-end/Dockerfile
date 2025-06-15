# -------- Stage 1: Build NestJS App --------
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Migrations and config handled here using tsx (no need to compile .ts)
RUN npm install --save-dev tsx
RUN npx drizzle-kit generate --config drizzle.config.ts
RUN npx drizzle-kit push --config drizzle.config.ts

# -------- Stage 2: Final Runtime Image --------
FROM node:18-slim AS runner

WORKDIR /app

# Copy only the necessary runtime files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/drizzle.config.js ./drizzle.config.js
# COPY --from=builder /app/migrations ./migrations

# Install only production dependencies
RUN npm install --omit=dev

RUN npx drizzle-kit generate --config drizzle.config.js
RUN npx drizzle-kit push --config drizzle.config.js

EXPOSE 3000

# Run migration and start the app
CMD ["npm", "run", "start:prod"]
        