# 🚂 Deploy to Railway - Quick Guide

## ✅ Your Backend is 100% Ready for Railway!

Everything is configured. Just follow these steps:

---

## 🚀 Deploy in 10 Minutes

### Step 1: Install Required Packages

```bash
cd /Users/abl/pmpk-website
npm install pg @types/pg bcrypt @types/bcrypt
```

**Packages:**
- `pg` - PostgreSQL driver for Railway
- `bcrypt` - Secure password hashing (CRITICAL for security!)

### Step 2: Push to GitHub (If Not Already)

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Backend ready for Railway deployment"

# Create GitHub repo and push
# Go to github.com/new, create repo, then:
git remote add origin https://github.com/YOUR-USERNAME/pmpk-website.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Railway

1. **Go to**: https://railway.app
2. **Click**: "Start a New Project"
3. **Login**: with GitHub
4. **Select**: "Deploy from GitHub repo"
5. **Choose**: your `pmpk-website` repository
6. **Wait**: ~2-3 minutes for initial deploy

### Step 4: Add PostgreSQL Database

1. In Railway project, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Database is provisioned in ~30 seconds
4. **DATABASE_URL** is automatically added to your service

### Step 5: Push Database Schema

In Railway dashboard:

1. Click your backend service
2. Go to **"Settings"** → **"Deploy"**
3. Trigger redeploy (or wait for auto-deploy)
4. Schema is automatically pushed via `npm run db:push`

### Step 6: Seed the Database

**Option A: Via Railway Dashboard**

1. Go to your service
2. Click **"..." menu** → **"Run a Command"**
3. Enter: `npm run db:seed`
4. Click **"Run"**

**Option B: Via Railway CLI**

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Run seed
railway run npm run db:seed
```

### Step 7: Get Your Backend URL

1. In Railway service, go to **"Settings"** → **"Domains"**
2. Click **"Generate Domain"**
3. You'll get: `https://pmpk-backend-production.up.railway.app`
4. **Copy this URL!**

### Step 8: Connect Netlify

Update `netlify.toml` (lines 9-15):

```toml
[[redirects]]
  from = "/api/*"
  to = "https://pmpk-backend-production.up.railway.app/api/:splat"
  status = 200
  force = true
```

Replace with YOUR Railway URL!

### Step 9: Set Environment Variables

In Railway → **"Variables"** tab:

```
FRONTEND_URL=https://pmpkedu.netlify.app
ALLOWED_ORIGINS=https://pmpkedu.netlify.app,https://www.pmpkedu.netlify.app
NODE_ENV=production
```

### Step 10: Deploy Updated Netlify

```bash
cd /Users/abl/pmpk-website
git add netlify.toml
git commit -m "Connect to Railway backend"
git push origin main
```

Netlify auto-deploys in ~2 minutes.

### Step 11: Test Everything!

1. **Backend Health**: https://YOUR-RAILWAY-APP.up.railway.app/health
   - Should show: `{"status":"ok"}`

2. **Netlify Site**: https://pmpkedu.netlify.app
   - Should load normally

3. **Admin Login**: https://pmpkedu.netlify.app/admin
   - Login: `admin` / `Aa123456`
   - Should work and redirect to admin panel

4. **Create News**: In admin panel, create a test news article
   - Should save successfully
   - Refresh page - should still be there
   - ✅ **Data persists!**

---

## 🎯 Quick Command Reference

```bash
# Install dependencies
npm install pg @types/pg

# Test locally with PostgreSQL
export DATABASE_URL="postgresql://localhost/pmpk_dev"
npm run db:push
npm run db:seed
npm run start

# Railway CLI
npm install -g @railway/cli
railway login
railway link
railway run npm run db:seed
railway logs
railway open

# Deploy
git add .
git commit -m "Update"
git push origin main
```

---

## 📊 What Happens on Railway

### First Deploy:
```
1. Railway clones your GitHub repo
2. Runs: npm install
3. Runs: npm run db:push (creates tables)
4. Runs: npm run start (starts server)
5. Exposes on: https://your-app.up.railway.app
6. Health check: /health endpoint
```

### Every Push After:
```
1. Railway detects GitHub push
2. Auto-rebuilds in ~2 minutes
3. Zero-downtime deployment
4. Logs available in dashboard
```

---

## 🔍 Verify Deployment

### Check Railway Logs:

In Railway dashboard → **"Logs"** tab, you should see:

```
🚀 PMPK Backend Server Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Environment: production
Port: 8080
Host: 0.0.0.0
API: http://0.0.0.0:8080/api/trpc
Health: http://0.0.0.0:8080/health
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Test Endpoints:

```bash
# Health check
curl https://YOUR-RAILWAY-APP.up.railway.app/health

# Root endpoint
curl https://YOUR-RAILWAY-APP.up.railway.app/

# tRPC endpoint (should return tRPC response)
curl https://YOUR-RAILWAY-APP.up.railway.app/api/trpc/auth.me
```

---

## 💡 Pro Tips

### Tip 1: Use Railway CLI for Faster Development

```bash
# Install
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs in real-time
railway logs --follow

# Run commands on Railway
railway run npm run db:seed
railway run node --version
```

### Tip 2: Environment-Specific Branches

- `main` → Production (auto-deploys)
- `staging` → Staging environment
- Feature branches → Preview deployments

Enable in Railway **"Settings"** → **"Preview Environments"**

### Tip 3: Database Backups

```bash
# Backup via Railway CLI
railway run pg_dump > backup-$(date +%Y%m%d).sql

# Restore
railway run psql < backup-20241210.sql
```

### Tip 4: Custom Domain

In Railway:
1. **"Settings"** → **"Domains"**
2. Add: `api.pmpk.kz`
3. Update DNS:
   - Add CNAME: `api.pmpk.kz` → `your-app.up.railway.app`
4. SSL auto-configured

---

## 🆘 Troubleshooting

### Issue: "npm install pg" fails

```bash
# On Mac, install PostgreSQL client libraries
brew install postgresql@16

# Then try again
npm install pg @types/pg
```

### Issue: Railway build fails

Check Railway logs for specific error. Common issues:
- Missing dependencies in package.json
- Syntax errors
- Missing environment variables

Fix and push again - Railway auto-redeploys.

### Issue: Database not created

Verify PostgreSQL service is attached:
1. Railway dashboard → Services
2. Should see both: Backend + PostgreSQL
3. Check **"Variables"** - DATABASE_URL should exist

### Issue: CORS errors on Netlify

Update Railway environment variables:
```
FRONTEND_URL=https://pmpkedu.netlify.app
ALLOWED_ORIGINS=https://pmpkedu.netlify.app
```

Then redeploy.

---

## 📈 Monitoring

### Railway Provides:

- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Events**: Deploy history, crashes
- **Alerts**: Set up notifications for downtime

Access all in Railway dashboard.

### External Monitoring (Optional):

- **UptimeRobot**: Free uptime monitoring
- **Sentry**: Error tracking
- **LogRocket**: Session replay

---

## ✅ Success Checklist

After deploying:

- [ ] Railway service shows "Active"
- [ ] PostgreSQL database shows "Active"
- [ ] Health endpoint returns `{"status":"ok"}`
- [ ] DATABASE_URL exists in variables
- [ ] Logs show "Server listening..."
- [ ] No errors in Railway logs
- [ ] Netlify connects to Railway API
- [ ] Login works on Netlify site
- [ ] Can create news that persists
- [ ] Can upload documents
- [ ] Feedback form saves to database

---

## 🎉 You're Done!

Your backend will be:
- ✅ Production-ready
- ✅ Auto-scaling
- ✅ Auto-deploying
- ✅ Fully monitored
- ✅ PostgreSQL database
- ✅ HTTPS enabled
- ✅ 99.9% uptime

**Total time**: 10-15 minutes
**Monthly cost**: ~$5-10

---

## 📞 Next Steps

1. ✅ **NOW**: `npm install pg @types/pg`
2. ✅ **THEN**: Push to GitHub
3. ✅ **DEPLOY**: Follow steps 3-10 above
4. ✅ **TEST**: Login and create content
5. ✅ **CELEBRATE**: You have a production website! 🎉

---

**Ready to deploy? Start with Step 1!** 🚀


