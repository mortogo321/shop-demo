# syntax=docker/dockerfile:1
ARG BUN_VERSION=1.4.2
ARG NODE_VERSION=26.10-alpine
ARG PORT=3000

# ---- deps (bun, cached) ----
FROM oven/bun:${BUN_VERSION}-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---- builder ----
FROM oven/bun:${BUN_VERSION}-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# ---- development (bun hot reload, root for bind-mount parity) ----
FROM oven/bun:${BUN_VERSION}-alpine AS development
ARG PORT=3000
WORKDIR /app
ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1
ENV PORT=${PORT}
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["bun", "run", "dev", "--", "--port", "3000"]

# ---- runtime base (hardened, non-root) ----
FROM node:${NODE_VERSION} AS runtime
ARG PORT=3000
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
ENV PORT=${PORT}
RUN apk add --no-cache curl \
  && addgroup -S appgroup -g 1001 \
  && adduser -S appuser -u 1001 -G appgroup
COPY --from=builder --chown=appuser:appgroup /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||'3000')+'/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

# ---- uat ----
FROM runtime AS uat
ENV NODE_ENV=production
CMD ["node", "server.js"]

# ---- production ----
FROM runtime AS production
ENV NODE_ENV=production
CMD ["node", "server.js"]
