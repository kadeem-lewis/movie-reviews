FROM node:22.10.0-alpine AS development

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

# First install the dependencies (as they change less often)
COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install
COPY . .

FROM node:22.10.0-alpine AS production

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

# First install the dependencies (as they change less often)
COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install
COPY . .

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs

ARG PORT
ARG MOVIEREVIEWS_NS
ARG MOVIEREVIEWS_DB_URI

ENV PORT=$PORT
ENV MOVIEREVIEWS_NS=$MOVIEREVIEWS_NS
ENV MOVIEREVIEWS_DB_URI=$MOVIEREVIEWS_DB_URI

CMD ["node", "index.js"]
