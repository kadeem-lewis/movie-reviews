FROM node:18-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Base setup
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @movie-reviews/backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/pnpm-lock.yaml ./
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Copy the full workspace
COPY --from=builder /app/out/full/ .

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

# Build arguments (passed from GitHub Actions)
ARG MOVIEREVIEWS_DB_URI
ARG MOVIEWREVIEWS_NS
ARG PORT

# Set environment variables for runtime using the arguments
ENV MOVIEREVIEWS_DB_URI=${MOVIEREVIEWS_DB_URI}
ENV MOVIEWREVIEWS_NS=${MOVIEWREVIEWS_NS}
ENV PORT=${PORT}

# Expose the port specified in the environment variable, defaulting to 3000
EXPOSE ${PORT:-3001}

CMD ["node", "apps/backend/index.js"]
