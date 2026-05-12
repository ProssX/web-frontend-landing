# Build stage
FROM node:22-slim AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Runner stage
FROM node:22-slim AS runner

# Set working directory
WORKDIR /app

# Copy built files and necessary configs from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# Install production dependencies only
RUN npm install --omit=dev

# Install serve globally
RUN npm install -g serve

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Expose port for serve
EXPOSE 5174

# Healthcheck for Coolify
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5173 || exit 1

# Start serve to host the SPA
CMD ["serve", "-s", "dist", "-l", "5174"]
