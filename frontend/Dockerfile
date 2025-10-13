# Multi-stage Dockerfile for Next.js (dev & prod)
FROM node:20-alpine AS base
WORKDIR /app
EXPOSE 3000

# --- Development image ---
FROM base AS dev
RUN apk add --no-cache python3 make g++

# Use Docker BuildKit mounts for fast, cacheable installs (if supported)
RUN --mount=type=bind,source=package.json,target=package.json \
	--mount=type=bind,source=package-lock.json,target=package-lock.json \
	--mount=type=cache,target=/root/.npm \
	npm ci --include=dev

COPY . .

RUN npm run lint || true

VOLUME ["/app"]
CMD ["npm", "run", "dev"]

# --- Production image ---
FROM base AS prod
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

# Use non-root user for runtime and grant write permission to /app
RUN adduser -D app \
	&& chown app:app /app \
	&& chmod 775 /app \
	&& mkdir -p /app/.next/cache \
	&& chown -R app:app /app/.next
USER app

CMD ["npm", "start"]