# ReformLogic Next.js

This app is configured for Cloudflare Workers deployment via OpenNext.

## Local development

```bash
npm run dev
```

## Production build checks

### 1) Build Next.js app

```bash
npm run build
```

### 2) Build Cloudflare worker bundle (OpenNext)

```bash
npm run build:cf
```

### 3) Measure worker size against Cloudflare free-plan 3 MiB limit

```bash
npm run size:cf
```

The size script checks `.open-next/worker.js` and exits non-zero if raw size exceeds 3 MiB.

## Deploy to Cloudflare

```bash
npm run deploy:cf
```

## Required Cloudflare config

- `wrangler.toml` points to OpenNext output:
  - `main = ".open-next/worker.js"`
  - `[assets].directory = ".open-next/assets"`
- Required runtime flag:
  - `compatibility_flags = ["nodejs_compat"]`

## Environment variables

Non-secret vars are configured in `wrangler.toml` under `[vars]`.
Secrets must be set in Cloudflare (example):

```bash
npx wrangler secret put RESEND_API_KEY
```
