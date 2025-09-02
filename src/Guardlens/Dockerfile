# Multi-stage production Dockerfile for SecureAI
# Stage 1: Base image with security updates
FROM node:18-alpine AS base

# Install security updates and essential packages
RUN apk update && apk upgrade && \
    apk add --no-cache \
    curl \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Stage 2: Dependencies installation
FROM base AS deps

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Stage 3: Builder stage
FROM base AS builder

# Install pnpm
RUN npm install -g pnpm

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN pnpm build

# Stage 4: Production runtime
FROM base AS runner

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create necessary directories
RUN mkdir -p /app/data /app/logs /app/.next && \
    chown -R nextjs:nodejs /app

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "server.js"]

# Stage 5: Development stage (optional)
FROM base AS dev

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install all dependencies (including dev dependencies)
RUN pnpm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]

# Labels for better container management
LABEL maintainer="SecureAI Team <team@secureai.dev>"
LABEL version="2.0.0"
LABEL description="Enterprise-grade multi-agent fraud detection system"
LABEL vendor="SecureAI"
LABEL org.opencontainers.image.title="SecureAI"
LABEL org.opencontainers.image.description="AI-powered fraud detection with 99.9% accuracy"
LABEL org.opencontainers.image.version="2.0.0"
LABEL org.opencontainers.image.vendor="SecureAI"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.source="https://github.com/secureai/secureai"
