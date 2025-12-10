# 🚂 Railway Deployment Guide - Complete Backend Setup

## ✅ Your Backend is Now Railway-Ready!

I've configured everything you need to deploy a production-ready backend to Railway.

---

## 📦 What I've Prepared

### ✅ Updated Files:

1. **`server/db/index.ts`** - PostgreSQL + SQLite support
   - Automatically detects environment
   - Uses SQLite locally, PostgreSQL on Railway

2. **`server/db/schema.ts`** - Universal database schema
   - Works with both PostgreSQL and SQLite
   - Production-ready table definitions

3. **`drizzle.config.ts`** - Database config
   - Auto-switches between SQLite/PostgreSQL

4. **`server/index.ts`** - Production server
   - Health check endpoint: `/health`
   - Proper CORS configuration
   - Environment-based settings
   - Railway-compatible logging

5. **`package.json`** - Added scripts & dependencies
   - `npm run start` - Production start
   - `npm run db:push` - Push schema to database
   - `pg` package for PostgreSQL

### ✅ Created Files:

1. **`railway.json`** - Railway deployment config
2. **`nixpacks.toml`** - Build configuration
3. **`Procfile`** - Process definition
4. **`.env.example`** - Environment variable template
5. **`.env`** - Local development config
6. **`.gitignore`** - Updated for production files

---

## 🚀 Deploy to Railway (Step-by-Step)

### Step 1: Install PostgreSQL Package

```bash
cd /Users/abl/pmpk-website
npm install pg @types/pg
```

### Step 2: Sign Up for Railway

1. Go to: **https://railway.app**
2. Click **"Login"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub

### Step 3: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository (or create one first - see below)

#### If You Don't Have a GitHub Repo Yet:

```bash
cd /Users/abl/pmpk-website

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - PMPK website ready for Railway"

# Create GitHub repo (via GitHub CLI or web)
# Then add remote
git remote add origin https://github.com/YOUR-USERNAME/pmpk-website.git

# Push
git push -u origin main
```

### Step 4: Configure Railway Project

After selecting your repo in Railway:

1. **Service Name**: `pmpk-backend` (or any name you like)
2. **Root Directory**: Leave as `/` (root)
3. **Start Command**: `npm run start` (Railway auto-detects)

Railway will start deploying!

### Step 5: Add PostgreSQL Database

In your Railway project dashboard:

1. Click **"New"** button
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Railway provisions database instantly
5. **DATABASE_URL** is automatically added to your environment variables

### Step 6: Run Database Migration

After database is provisioned:

**Option A: Automatic (Recommended)**

Railway will run `npm run db:push` during build (configured in `railway.json`)

**Option B: Manual**

In Railway dashboard:
1. Go to your service
2. Click **"Settings"** → **"Deploy"**
3. Add custom start command:
   ```bash
   npm run db:push && npm run db:seed && npm run start
   ```

Or run seed manually in Railway console:
1. Click **"Settings"** → **"Variables"**
2. Add: `AUTO_SEED=true`

Then your seed script will run on first launch.

### Step 7: Configure Environment Variables

In Railway project → **"Variables"** tab:

Add these variables:

```
NODE_ENV=production
FRONTEND_URL=https://pmpkedu.netlify.app
ALLOWED_ORIGINS=https://pmpkedu.netlify.app,https://pmpkedu.netlify.app/
```

**Note**: Railway automatically provides:
- `DATABASE_URL` (PostgreSQL connection)
- `PORT` (assigned dynamically)
- `RAILWAY_PUBLIC_DOMAIN` (your app URL)

### Step 8: Get Your Backend URL

After deployment completes:

1. Go to **"Settings"** → **"Domains"**
2. You'll see a URL like: `pmpk-backend-production.up.railway.app`
3. Or click **"Generate Domain"** if not shown
4. **Copy this URL** - you'll need it for Netlify

### Step 9: Test Backend Health

Open in browser:
```
https://YOUR-RAILWAY-APP.up.railway.app/health
```

Should show:
```json
{
  "status": "ok",
  "timestamp": "2024-12-10T...",
  "environment": "production"
}
```

✅ **Backend is live!**

### Step 10: Connect Netlify to Railway

Update `netlify.toml` (line 9-12):

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-RAILWAY-APP.up.railway.app/api/:splat"
  status = 200
  force = true
```

Replace `YOUR-RAILWAY-APP.up.railway.app` with your actual Railway domain.

### Step 11: Redeploy Netlify

```bash
git add netlify.toml
git commit -m "Connect Netlify to Railway backend"
git push origin main
```

Netlify will auto-deploy in ~2 minutes.

### Step 12: Run Database Seed (First Time Only)

To create the admin user and sample data:

**Option A: Via Railway Dashboard**

1. Go to your service
2. Click **"..." menu** → **"Run a Command"**
3. Enter: `npm run db:seed`
4. Click **"Run"**

**Option B: Via Railway CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Run seed
railway run npm run db:seed
```

### Step 13: Test Full System

1. **Backend Health**: https://YOUR-RAILWAY-APP.up.railway.app/health
2. **Netlify Site**: https://pmpkedu.netlify.app
3. **Admin Login**: https://pmpkedu.netlify.app/admin
   - Username: `admin`
   - Password: `Aa123456`
4. **Create News**: Should save to PostgreSQL!
5. **Refresh**: News should persist!

✅ **Full functionality unlocked!**

---

## 🔧 Maintenance Commands

### View Logs (Railway Dashboard):
1. Go to your service
2. Click **"Logs"** tab
3. See real-time server logs

### View Database (Railway):
1. Click on PostgreSQL service
2. Click **"Data"** tab
3. Query your database directly

### Redeploy:
```bash
git push origin main
# Railway auto-deploys
```

### Run Commands on Railway:
```bash
railway run <command>
```

Examples:
```bash
railway run npm run db:seed
railway run npm run db:push
railway run node -v
```

---

## 💰 Railway Pricing

### Free Tier:
- **$5 credit/month** (resets monthly)
- Good for: Testing, small projects
- Limits: 
  - 500 hours/month execution time
  - Shared CPU
  - 512MB RAM

### Hobby Plan (~$5-10/month):
- Pay as you go
- No execution hour limits
- Dedicated resources
- **Recommended for production**

### Costs Breakdown:
- **Compute**: ~$0.000231/minute (~$10/month)
- **PostgreSQL**: Included in compute
- **Network**: Included
- **Total**: ~$5-15/month depending on usage

**For PMPK site** (low-medium traffic): Expect ~$5-10/month

---

## 📊 Architecture Overview

### After Railway Setup:

```
┌─────────────────────────────────────────┐
│  USER                                   │
└────────────┬────────────────────────────┘
             │
             v
┌─────────────────────────────────────────┐
│  Netlify (Frontend)                     │
│  https://pmpkedu.netlify.app           │
│  - React app (static files)            │
│  - Serves public website               │
│  - Proxies /api/* to Railway           │
└────────────┬────────────────────────────┘
             │ API calls (/api/*)
             v
┌─────────────────────────────────────────┐
│  Railway (Backend)                      │
│  https://your-app.up.railway.app       │
│  - Fastify server                      │
│  - tRPC API                            │
│  - Business logic                      │
└────────────┬────────────────────────────┘
             │
             v
┌─────────────────────────────────────────┐
│  Railway PostgreSQL                     │
│  - User data                           │
│  - News, documents, staff              │
│  - Feedback, vacancies                 │
│  - Persistent storage                  │
└─────────────────────────────────────────┘
```

---

## 🧪 Testing Backend Locally (Before Railway)

Test the production setup on your local machine:

```bash
# Install PostgreSQL locally (Mac)
brew install postgresql@16
brew services start postgresql@16

# Create local database
createdb pmpk_dev

# Set environment variable
export DATABASE_URL="postgresql://localhost/pmpk_dev"

# Push schema
npm run db:push

# Seed database
npm run db:seed

# Start server
npm run start
```

Should work exactly like on Railway!

---

## 🔍 Troubleshooting Railway

### Issue: "Build Failed"

Check Railway build logs:
1. Click on your service
2. **"Deployments"** tab
3. Click failed deployment
4. Read error messages

Common fixes:
- Missing `pg` package: `npm install pg`
- Node version: Check `package.json` engines field
- Build command: Verify in `railway.json`

### Issue: "Service Crashed"

Check logs for errors:
1. **"Logs"** tab in Railway
2. Look for crash reason

Common fixes:
- Missing DATABASE_URL: Check PostgreSQL is attached
- Port binding: Railway provides PORT automatically
- Memory limit: Upgrade plan if needed

### Issue: "Database Connection Failed"

Check PostgreSQL connection:
1. PostgreSQL service should show "Active"
2. DATABASE_URL should be in service variables
3. Check connection string format

### Issue: "Can't Access from Netlify"

Check CORS configuration:
1. Verify FRONTEND_URL in Railway variables
2. Check netlify.toml proxy configuration
3. Test backend health endpoint directly

### Issue: "Seed Script Fails"

Run manually:
```bash
railway run npm run db:seed
```

Or check logs for specific error.

---

## 📈 Monitoring & Optimization

### Performance Monitoring:

Railway provides built-in metrics:
- **CPU usage**
- **Memory usage**
- **Request latency**
- **Network traffic**

Access via: **"Metrics"** tab

### Database Optimization:

1. **Add Indexes** (in production after testing):
   ```sql
   CREATE INDEX idx_news_client_published ON news(client_id, published);
   CREATE INDEX idx_staff_client_active ON staff(client_id, active);
   ```

2. **Connection Pooling** (already configured):
   - `pg.Pool` handles connections efficiently

3. **Query Optimization**:
   - Use Drizzle's query builder
   - Avoid N+1 queries
   - Limit result sets

### Logging:

Railway automatically captures:
- ✅ Console.log statements
- ✅ Error messages
- ✅ Request logs (Fastify logger)

View in **"Logs"** tab with filtering.

---

## 🔐 Security Checklist

### Before Going Live:

- [ ] Change admin password from `Aa123456`
- [ ] Add environment variables validation
- [ ] Enable rate limiting
- [ ] Add request validation
- [ ] Use HTTPS only (Railway provides automatically)
- [ ] Configure proper CORS origins
- [ ] Enable Fastify helmet for security headers
- [ ] Implement password hashing (bcrypt)
- [ ] Add audit logging
- [ ] Set up error tracking (Sentry)

### Recommended Security Additions:

```bash
# Install security packages
npm install @fastify/helmet @fastify/rate-limit bcrypt

# See security guide for implementation
```

---

## 🎯 Post-Deployment Checklist

### After Railway Deployment:

- [ ] Backend health endpoint works
- [ ] Database connected and seeded
- [ ] Admin user created
- [ ] Netlify connected to Railway API
- [ ] Login works on Netlify site
- [ ] Can create news article
- [ ] News persists after refresh
- [ ] Can upload documents
- [ ] Feedback form saves to database
- [ ] All API endpoints working
- [ ] CORS properly configured
- [ ] No errors in Railway logs

---

## 📞 Support Resources

### Railway Documentation:
- Docs: https://docs.railway.app
- Discord: https://discord.gg/railway
- Status: https://status.railway.app

### Railway CLI:
```bash
npm install -g @railway/cli
railway login
railway link
railway logs
railway run <command>
railway open  # Opens dashboard
```

---

## 💡 Pro Tips

### Auto-Deploy on Push:

Railway automatically redeploys when you push to GitHub main branch. No manual deploys needed!

### Environment Variables:

Use Railway dashboard to manage variables safely. Never commit secrets to Git.

### Database Backups:

Railway doesn't auto-backup on free tier. For production:
1. Upgrade to Hobby plan
2. Or set up manual backups:
   ```bash
   railway run pg_dump > backup.sql
   ```

### Preview Environments:

Railway can create preview deployments for PRs:
1. Enable in **"Settings"** → **"Preview Environments"**
2. Each PR gets its own backend + database

### Custom Domain:

Add your own domain to Railway:
1. **"Settings"** → **"Domains"**
2. Add custom domain: `api.pmpk.kz`
3. Update DNS records
4. SSL automatically provisioned

---

## ✅ Success Checklist

Your Railway backend is successful when you can:

- [ ] Access health endpoint
- [ ] See logs in Railway dashboard
- [ ] Database has tables created
- [ ] Admin user exists in database
- [ ] Login from Netlify works
- [ ] Create content that persists
- [ ] No errors in logs
- [ ] Response time < 200ms
- [ ] Uptime > 99%

---

## 🔄 Workflow After Setup

### Daily Development:

```bash
# 1. Make code changes
# 2. Test locally:
npm run dev:all

# 3. Commit and push:
git add .
git commit -m "Feature: Added X"
git push origin main

# 4. Railway auto-deploys (2-3 minutes)
# 5. Check Railway logs
# 6. Test on Netlify site
```

### Emergency Rollback:

In Railway dashboard:
1. **"Deployments"** tab
2. Find last working deployment
3. Click **"..."** → **"Redeploy"**

---

## 📚 Next Steps After Railway Deploy

1. ✅ **Deploy backend to Railway** (follow steps above)
2. ✅ **Get Railway URL** (from dashboard)
3. ✅ **Update netlify.toml** (uncomment and add URL)
4. ✅ **Redeploy Netlify**
5. ✅ **Run db:seed** on Railway
6. ✅ **Test login** on Netlify site
7. ✅ **Add your content** via admin panel

---

## 🎉 You're Ready!

Your backend is **production-ready** and configured for Railway. All you need to do is:

1. **Install pg package**: `npm install pg @types/pg`
2. **Push to GitHub** (if not already)
3. **Deploy to Railway** (follow steps above)
4. **Connect Netlify** (update netlify.toml)

**Estimated time**: 15-20 minutes for first deployment

**Monthly cost**: ~$5-10 (Railway Hobby plan)

---

Need help with deployment? Check these files:
- `_URGENT_READ_FIRST.md` - Quick start
- `README.md` - Full documentation
- `.env.example` - Environment variables reference

**Ready to deploy? Start with Step 1 above!** 🚀


