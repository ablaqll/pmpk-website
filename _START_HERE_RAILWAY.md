# 🚂 START HERE - Railway Deployment

## ✅ Your Backend is Complete & Ready!

Everything is configured for Railway. Just follow these steps.

---

## 🎯 Quick Deploy (Copy-Paste)

### Step 1: Install Required Packages (30 seconds)

```bash
cd /Users/abl/pmpk-website
npm install pg @types/pg bcrypt @types/bcrypt
```

**Note**: bcrypt is required for secure password hashing!

### Step 2: Commit Changes (1 minute)

```bash
git add .
git commit -m "Backend ready for Railway deployment"
git push origin main
```

If you don't have Git setup yet:
```bash
git init
git add .
git commit -m "Initial commit"
# Then create GitHub repo and push
```

### Step 3: Deploy to Railway (3 minutes)

1. **Go to**: https://railway.app
2. **Click**: "Login with GitHub"
3. **Click**: "New Project"
4. **Select**: "Deploy from GitHub repo"
5. **Choose**: pmpk-website
6. **Wait**: ~2 minutes (auto-builds)

### Step 4: Add PostgreSQL (30 seconds)

1. **Click**: "New" button in your project
2. **Select**: "Database" → "PostgreSQL"
3. **Done**: DATABASE_URL auto-added

### Step 5: Seed Database (1 minute)

1. Click your backend service
2. **Click**: "..." menu → "Run a Command"
3. **Enter**: `npm run db:seed`
4. **Click**: "Run"
5. Wait for: "Seeding complete!"

### Step 6: Get Backend URL (30 seconds)

1. **Go to**: "Settings" → "Domains"
2. **Click**: "Generate Domain"
3. **Copy URL**: e.g., `pmpk-backend.up.railway.app`

### Step 7: Connect Netlify (2 minutes)

Edit `netlify.toml` (line 9-15):

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-RAILWAY-URL.up.railway.app/api/:splat"
  status = 200
  force = true
```

### Step 8: Deploy Netlify (1 minute)

```bash
git add netlify.toml
git commit -m "Connect to Railway backend"
git push origin main
```

---

## ✅ Test It Works (2 minutes)

### Test 1: Backend Health

Open: `https://YOUR-RAILWAY-URL.up.railway.app/health`

Should show:
```json
{
  "status": "ok",
  "timestamp": "2024-12-10T...",
  "environment": "production"
}
```

### Test 2: Admin Login on Netlify

1. Go to: https://pmpkedu.netlify.app/admin
2. Login: `admin` / `Aa123456`
3. Should redirect to admin panel
4. **No more "Demo Mode" message!**

### Test 3: Create & Save Content

1. In admin panel, click "Новости" (News)
2. Create a test news article
3. Save
4. Refresh page
5. ✅ **News is still there!** (saved to PostgreSQL!)

---

## 🎉 Success!

You now have:
- ✅ Netlify (Frontend) - Free
- ✅ Railway (Backend) - ~$5-10/month
- ✅ PostgreSQL (Database) - Included
- ✅ Full admin panel functionality
- ✅ Data persistence
- ✅ Production-ready system

**Total time**: ~10-15 minutes  
**Monthly cost**: ~$5-10

---

## 📚 Helpful Resources

**Need more details?**
- Railway deployment: `DEPLOY_TO_RAILWAY.md`
- Backend info: `BACKEND_COMPLETE_SUMMARY.md`
- Troubleshooting: `README.md`

**Railway Dashboard**: https://railway.app/dashboard
**Railway Docs**: https://docs.railway.app

---

## 🆘 Quick Troubleshooting

### Issue: npm install pg fails

```bash
# Mac: Install PostgreSQL client first
brew install postgresql@16

# Then install pg package
npm install pg @types/pg
```

### Issue: Railway build fails

- Check Railway "Logs" tab for errors
- Usually: missing dependency
- Fix and push again - auto-redeploys

### Issue: Can't seed database

Railway → Service → "..." → "Run a Command" → `npm run db:seed`

### Issue: Netlify can't connect

- Verify Railway URL in netlify.toml
- Make sure Railway service is "Active"
- Check CORS settings in Railway variables

---

## ✨ You're 8 Steps Away!

The 8 steps above take ~10-15 minutes total.

**Start with Step 1** ☝️

**Your backend is ready for Railway!** 🚂🎉


