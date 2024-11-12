FROM node:22.10.0-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @movie-reviews/frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/pnpm-lock.yaml ./
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Copy the full workspace
COPY --from=builder /app/out/full/ .

RUN pnpm turbo build --filter=@movie-reviews/frontend

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 reactjs
USER reactjs

# Copy the built frontend
COPY --from=installer /app .

# Set environment variable for runtime
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

# Serve the app using a simple HTTP server
USER root
RUN pnpm add -g serve
USER reactjs

EXPOSE 3000

CMD ["serve", "-s", "apps/frontend/build"]
