FROM node:22.10.0-alpine AS development

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

# First install the dependencies (as they change less often)
COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install
COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

FROM caddy:2.9-alpine AS production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 reactjs
USER reactjs

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=development /app/dist /srv