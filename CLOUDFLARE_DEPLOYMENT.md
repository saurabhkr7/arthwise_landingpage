# Cloudflare Tunnel Deployment for Landing Page

This guide covers deploying the Arthwise landing page to `arthhwise.com` using the existing Cloudflare tunnel.

## Prerequisites

- ✅ Next.js landing page built (`npm run build`)
- ✅ Cloudflare tunnel already configured (same tunnel as API)
- ✅ PM2 installed for process management

## Architecture

```
                                   ┌─────────────────────────┐
                                   │   Cloudflare Tunnel     │
                                   │   (arthwise-api)        │
                                   └───────────┬─────────────┘
                                               │
                 ┌─────────────────────────────┼─────────────────────────────┐
                 │                             │                             │
                 ▼                             ▼                             ▼
        arthhwise.com              www.arthhwise.com            api.arthhwise.com
             │                             │                             │
             ▼                             ▼                             ▼
        localhost:3000              localhost:3000              localhost:8000
        (Next.js)                   (Next.js)                   (Node.js API)
```

## Step 1: Build the Landing Page

```bash
cd /Users/saurabhpatel/Documents/Arthwise/arthwise_landingpage
npm run build
```

## Step 2: Start the Landing Page with PM2

```bash
# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js

# Or start directly
pm2 start npm --name "arthwise-landing" -- start
```

Verify it's running:
```bash
pm2 status
curl http://localhost:3000
```

## Step 3: Configure DNS in Cloudflare Dashboard

Go to your Cloudflare Dashboard → arthhwise.com → DNS and add these CNAME records:

| Type  | Name | Target                                         | Proxy |
|-------|------|------------------------------------------------|-------|
| CNAME | @    | b3121f9b-9996-4342-ba81-0001a0bcd825.cfargotunnel.com | ✅    |
| CNAME | www  | b3121f9b-9996-4342-ba81-0001a0bcd825.cfargotunnel.com | ✅    |

**Note:** The `@` symbol represents the root domain (arthhwise.com).

## Step 4: Restart the Cloudflare Tunnel

If you're running the tunnel manually:
```bash
cloudflared tunnel run arthwise-api
```

Or with PM2:
```bash
pm2 restart cloudflared
```

## Updated Tunnel Config

The config file at `~/.cloudflared/config.yml` or `ArthwiseServices/auth_microservice/config.yml` has been updated to:

```yaml
tunnel: b3121f9b-9996-4342-ba81-0001a0bcd825
credentials-file: /Users/saurabhpatel/.cloudflared/b3121f9b-9996-4342-ba81-0001a0bcd825.json

ingress:
  # Landing page - main domain and www
  - hostname: arthhwise.com
    service: http://localhost:3000
  - hostname: www.arthhwise.com
    service: http://localhost:3000
  # API service
  - hostname: api.arthhwise.com
    service: http://localhost:8000
  - service: http_status:404
```

## Quick Start Commands

```bash
# Terminal 1: Start Landing Page
cd /Users/saurabhpatel/Documents/Arthwise/arthwise_landingpage
npm run build && npm start

# Terminal 2: Start API (if not already running)
cd /Users/saurabhpatel/Documents/Arthwise/ArthwiseServices/auth_microservice
node index.js

# Terminal 3: Start Cloudflare Tunnel
cloudflared tunnel --config ~/.cloudflared/config.yml run arthwise-api
```

## Production Startup (with PM2)

```bash
# Start all services
pm2 start /Users/saurabhpatel/Documents/Arthwise/arthwise_landingpage/ecosystem.config.js
pm2 start /Users/saurabhpatel/Documents/Arthwise/ArthwiseServices/auth_microservice/ecosystem.config.js

# Start tunnel
cloudflared tunnel --config /Users/saurabhpatel/Documents/Arthwise/ArthwiseServices/auth_microservice/config.yml run arthwise-api

# Save PM2 process list
pm2 save

# Set PM2 to start on boot
pm2 startup
```

## Verify Deployment

After completing all steps:

1. **Check local services:**
   ```bash
   curl http://localhost:3000  # Landing page
   curl http://localhost:8000/health  # API
   ```

2. **Check public URLs:**
   - https://arthhwise.com - Landing page
   - https://www.arthhwise.com - Landing page  
   - https://api.arthhwise.com - API

## Troubleshooting

### Landing page not accessible
```bash
# Check if Next.js is running
pm2 logs arthwise-landing

# Restart the landing page
pm2 restart arthwise-landing
```

### DNS not resolving
- Wait 5-10 minutes for DNS propagation
- Verify CNAME records in Cloudflare Dashboard
- Ensure orange cloud (proxy) is enabled

### Tunnel connection issues
```bash
# Check tunnel status
cloudflared tunnel info arthwise-api

# View tunnel logs
cloudflared tunnel --config ~/.cloudflared/config.yml run arthwise-api
```
