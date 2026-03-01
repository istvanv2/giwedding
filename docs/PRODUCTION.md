# Production checklist

## Uptime and “page sometimes doesn’t load”

If the site sometimes doesn’t load when opening the link (e.g. from WhatsApp), check the following on the **server** (not in this repo).

### 1. Health check

- **Endpoint:** `GET https://giwedding.com/api/health` should return `200` and `{"ok":true}`.
- Use it for monitoring (e.g. UptimeRobot, Pingdom) or PM2 health checks.

### 2. PM2

- **Auto-restart on crash:** PM2 restarts the process by default. Ensure it’s saved: `pm2 save` and (once) `pm2 startup` so the app comes back after a server reboot.
- **Logs:** `pm2 logs giwedding` to see errors when the page fails to load.
- **Restart policy:** If the process exits or uses too much memory, PM2 will restart it; check `pm2 status` and logs after a failure.

### 3. Reverse proxy (nginx / Caddy)

- **Timeouts:** If you use nginx (or similar) in front of Node, set proxy read/timeout high enough (e.g. `proxy_read_timeout 60s`) so slow requests don’t get cut off.
- **HTTPS:** Terminate SSL at the proxy and set `X-Forwarded-Proto: https` so our middleware doesn’t redirect again.

### 4. Memory and Node

- **Node memory:** Default Node heap can be small. If the app is heavy or you see OOM, run with e.g. `NODE_OPTIONS=--max-old-space-size=512` in the PM2 ecosystem or start script.
- **Restart after deploy:** Always `pm2 restart giwedding --update-env` after `git pull` and `npm run build`.

### 5. What this repo does for production

- **Security headers** in `next.config.mjs`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, etc.
- **Permanent redirects (308)** in middleware: http → https, www → canonical host, so browsers and crawlers cache the canonical URL.
- **Health route:** `/api/health` for monitoring and load balancers.

If the page still “sometimes doesn’t load,” the cause is usually: server/PM2 crash, proxy timeout, or network/DNS; use the health endpoint and PM2 logs to narrow it down.
