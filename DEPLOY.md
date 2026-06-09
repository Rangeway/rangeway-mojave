# Deploy & Ops — rangeway-mojave (rangewaymojave.com)

The Rangeway Mojave microsite. **Self-hosted on a Hostinger VPS** (not GitHub Pages), served by
Nginx at **https://rangewaymojave.com** (and `www`) from `/var/www/rangeway-mojave/` on
`72.60.71.39`.

## How to deploy
**Push to `main`.** GitHub Actions (`.github/workflows/deploy.yml`) rsyncs the repo's static
files straight to the VPS (no build step) — meta files like `.git`, `README.md`, `CLAUDE.md`,
`CNAME`, and `DEPLOY.md` are excluded from what's published. ~30s.
- On failure the live site keeps its last good copy; the deploy retries rsync 3×.

## Local development
Plain static HTML/CSS/JS — no build.
```bash
python3 -m http.server 8000   # http://localhost:8000
```

## TLS / DNS
- HTTPS via **Let's Encrypt** (certbot on the VPS) — auto-renews.
- DNS at **Cloudflare, DNS-only (grey cloud)**: A records `rangewaymojave.com` + `www` → `72.60.71.39`.

## Infra notes
- Server path: `/var/www/rangeway-mojave/`; Nginx server block for `rangewaymojave.com www.rangewaymojave.com`.
- CI auth: SSH deploy key in repo secrets `VPS_SSH_KEY` + `VPS_KNOWN_HOSTS`.
- GitHub Pages is **disabled** for this repo — the VPS is the only host.
