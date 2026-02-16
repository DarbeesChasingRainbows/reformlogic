# ============================================
# ReformLogic — Deno Fresh 2 Production Image
# ============================================
# Build:  docker compose build
# Run:    docker compose up -d
# ============================================

FROM denoland/deno:latest AS builder

ARG GIT_REVISION=dev
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY deno.json deno.lock* ./
RUN deno install

# Copy source and build
COPY . .
RUN deno task build

# ------------------------------------------
# Production stage — slim runtime
# ------------------------------------------
FROM denoland/deno:latest

ARG GIT_REVISION=dev
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
ENV DENO_ENV=production

WORKDIR /app

# Copy only the built output and static assets
COPY --from=builder /app/_fresh ./_fresh
COPY --from=builder /app/static ./static

# Cache the server entrypoint
RUN deno cache _fresh/server.js

# Expose the default Fresh port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD ["deno", "eval", "const r = await fetch('http://localhost:8000'); if (!r.ok) Deno.exit(1);"]

CMD ["serve", "-A", "_fresh/server.js"]
