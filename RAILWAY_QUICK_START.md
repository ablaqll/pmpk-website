# 🚀 Railway Quick Start - 5 Minutes to Deploy

## One-Page Guide to Get Backend Running

### Prerequisites

- ✅ GitHub account
- ✅ Git installed
- ✅ Node.js 20+ installed

---

## 🎯 Deploy in 5 Steps

### Step 1: Install PostgreSQL Package (30 seconds)

```bash
cd /Users/abl/pmpk-website
npm install pg @types/pg
```

### Step 2: Push to GitHub (2 minutes)

```bash
# If you haven't already:
git init
git add .
git commit -m "Initial commit - PMPK backend"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/pmpk-website.git
git push -u origin main
```

### Step 3: Deploy to Railway (2 minutes)

1. Open: https://railway.app
2. Click: **"Login with GitHub"**
3. Click: **"New Project"**
4. Select: **"Deploy from GitHub repo"**
5. Choose: **pmpk-website**
6. Wait for deploy (~2 min)

### Step 4: Add Database (30 seconds)

1. In Railway project, click: **"New"**
2. Select: **"Database"** → **"PostgreSQL"**
3. Done! DATABASE_URL auto-added

### Step 5: Seed Database (1 minute)

1. Click service **"..."** menu
2. Select: **"Run a Command"**
3. Enter: `npm run db:seed`
4. Click: **"Run"**

✅ **Backend is live!**

---

## 🔗 Connect to Netlify (2 minutes)

### Step 6: Get Railway URL

1. Railway → **"Settings"** → **"Domains"**
2. Click **"Generate Domain"**
3. Copy URL (e.g., `pmpk-backend.up.railway.app`)

### Step 7: Update netlify.toml

Edit line 9-15 in `netlify.toml`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-RAILWAY-URL.up.railway.app/api/:splat"
  status = 200
  force = true
```

### Step 8: Deploy to Netlify

```bash
git add netlify.toml
git commit -m "Connect to Railway"
git push origin main
```

Netlify auto-deploys in ~2 minutes.

---

## ✅ Test It Works

### Test 1: Backend Health

Open: `https://YOUR-RAILWAY-URL.up.railway.app/health`

Should see:
```json
{"status":"ok","timestamp":"...","environment":"production"}
```

### Test 2: Login on Netlify

1. Go to: https://pmpkedu.netlify.app/admin
2. Login: `admin` / `Aa123456`
3. Should redirect to admin panel

### Test 3: Create News

1. In admin panel, create a news article
2. Refresh page
3. ✅ News should persist (saves to Railway PostgreSQL!)

---

## 🆘 Troubleshooting

### "pg package install fails"

On Mac:
```bash
brew install postgresql@16
npm install pg @types/pg
```

### "Railway deploy fails"

Check Railway logs:
- Click service → "Logs" tab
- Look for error message
- Usually missing dependency or typo

### "Can't seed database"

Check PostgreSQL is running:
- Railway dashboard → Should see PostgreSQL service active
- DATABASE_URL should be in service variables

### "Netlify can't connect"

Verify:
- Railway URL is correct in netlify.toml
- No typos in URL
- Railway service is "Active"

---

## 💡 Pro Tips

### Auto-Redeploy

Every time you push to GitHub:
- Railway auto-rebuilds backend
- Netlify auto-rebuilds frontend
- Zero manual deploys!

### View Logs Live

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# View logs
railway logs --follow
```

### Custom Domain

Add your domain:
- Railway: `api.pmpk.kz`
- Netlify: `www.pmpk.kz`

---

## ✨ Done!

Your backend is live with:
- ✅ PostgreSQL database
- ✅ Full API functionality
- ✅ Auto-scaling
- ✅ HTTPS enabled
- ✅ 99.9% uptime guaranteed

**Total time**: ~10 minutes
**Monthly cost**: ~$5-10

---

**Follow the 8 steps above and you're done!** 🎉

**Need detailed help?** See `DEPLOY_TO_RAILWAY.md`



