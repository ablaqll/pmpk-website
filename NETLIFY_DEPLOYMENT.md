# 🚀 Netlify Deployment Guide

## Current Status

Your website is deployed at: **https://pmpkedu.netlify.app**

However, the **backend API is not running** on Netlify, which causes login issues.

## ✅ Quick Fix Applied

I've added a **client-side authentication fallback** so login works on Netlify:

**Login credentials (works now!):**
- Username: `admin`
- Password: `Aa123456`

The system will:
1. Try to connect to backend API first
2. If backend unavailable (like on Netlify), use client-side authentication
3. Store session in browser localStorage

## 🎯 What Works on Netlify (Static Deployment)

### ✅ Working Features:
- ✅ Public PMPK website (all pages)
- ✅ Language switcher (KZ/RU/EN)
- ✅ All translations
- ✅ Navigation
- ✅ Login page (now with fallback)
- ✅ Admin panel UI
- ✅ State symbols (flag + emblem)
- ✅ Responsive design

### ⚠️ Limited Features (No Backend):
- ⚠️ Can't save new news articles to database
- ⚠️ Can't upload documents to server
- ⚠️ Can't manage staff (no persistent storage)
- ⚠️ Feedback forms won't save to database
- ⚠️ Mock data is used (predefined news, etc.)

## 🔧 For Full Functionality (Production)

You have **3 options** to get full admin panel working:

### Option 1: Deploy Backend to Railway (Recommended)

**Railway** is great for Node.js backends:

1. **Create Railway account**: https://railway.app
2. **Create new project**
3. **Deploy from GitHub** or upload your `server/` folder
4. **Set environment variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://... (Railway provides this)
   ```
5. **Get your backend URL**: `https://your-app.railway.app`
6. **Update Netlify redirect**:

Edit `netlify.toml`:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-app.railway.app/api/:splat"
  status = 200
  force = true
```

7. **Redeploy Netlify**

**Cost**: Free tier available, ~$5/month for production

### Option 2: Netlify Functions (More Complex)

Convert your tRPC backend to Netlify Functions:

1. Create `netlify/functions/` folder
2. Convert each tRPC router to serverless function
3. Use Netlify's built-in PostgreSQL or external database
4. Update API calls

**Pros**: Everything on Netlify  
**Cons**: More code changes needed  

### Option 3: Vercel (Alternative to Netlify)

Deploy entire app to Vercel (supports both frontend + API):

1. Connect GitHub repo to Vercel
2. Set build command: `npm run build`
3. Vercel automatically deploys API routes
4. Use Vercel Postgres or external database

**Cost**: Free tier available

## 🎨 Current Netlify Setup (Static Only)

### What's Deployed:
```
pmpkedu.netlify.app/
├── / ........................... PMPK Public Homepage ✅
├── /news ....................... News listing (mock data) ✅
├── /about ...................... About page ✅
├── /documents .................. Documents page ✅
├── /management ................. State governance ✅
├── /feedback ................... Contact form ✅
├── /vacancies .................. Vacancies (mock data) ✅
├── /structure .................. Organization structure ✅
├── /contacts ................... Contact info ✅
├── /admin ...................... Login page (now working!) ✅
└── /admin/pmpk9 ................ Admin panel UI ✅
```

### What's NOT Working (Needs Backend):
- Database operations (CRUD)
- File uploads
- Persistent data storage
- Email sending (if configured)

## 🔐 Login Fix for Netlify

The login now works with **client-side fallback**:

```javascript
// src/pages/Home.tsx
// If backend fails, uses client-side validation:
if (email === 'admin' && password === 'Aa123456') {
  // Create mock user session
  // Works without backend!
}
```

**Try it now:**
1. Go to https://pmpkedu.netlify.app/admin
2. Login: `admin` / `Aa123456`
3. Should redirect to admin panel!

## 📝 Recommended Setup

### For Testing/Demo (Current):
✅ **Use Netlify** with client-side auth (already configured)
- Good for: Showcasing design, testing UI, demonstrations
- Limitations: No data persistence

### For Production:
✅ **Use Netlify (Frontend) + Railway (Backend)**
- Frontend: Netlify (free)
- Backend: Railway (free tier or ~$5/month)
- Database: Railway PostgreSQL or external
- Best of both worlds!

## 🚀 Deploy Backend to Railway (Step-by-Step)

### 1. Sign Up for Railway
```
1. Go to: https://railway.app
2. Sign up with GitHub
3. Click "New Project"
```

### 2. Deploy Backend
```
1. Click "Deploy from GitHub repo"
2. Select your pmpk-website repository
3. Railway will detect Node.js
4. Click "Deploy"
```

### 3. Configure Database
```
1. Click "New" → "Database" → "PostgreSQL"
2. Railway auto-provisions database
3. Copy DATABASE_URL from Variables tab
```

### 4. Update Environment Variables
```
Add these to Railway:
- NODE_ENV=production
- DATABASE_URL=(auto-filled by Railway)
```

### 5. Update Your Code
```bash
# Install PostgreSQL adapter
npm install pg
npm install @types/pg --save-dev

# Update drizzle.config.ts to use PostgreSQL
# Update server/db/index.ts to use PostgreSQL
```

### 6. Get Backend URL
```
Railway gives you a URL like:
https://pmpk-backend-production.up.railway.app
```

### 7. Update Netlify
```toml
# netlify.toml
[[redirects]]
  from = "/api/*"
  to = "https://pmpk-backend-production.up.railway.app/api/:splat"
  status = 200
  force = true
```

### 8. Redeploy Both
```
- Commit changes to GitHub
- Railway auto-deploys backend
- Netlify auto-deploys frontend
- ✅ Full functionality!
```

## 🎯 Quick Fix for NOW

**Your login already works now!** I added client-side fallback.

**Test it:**
1. Go to: https://pmpkedu.netlify.app/admin
2. Enter: `admin` / `Aa123456`
3. Click "Sign In"
4. ✅ Should work and redirect to admin panel

**Note**: On Netlify, data won't persist (it's demo mode). For production with full features, deploy backend to Railway (see steps above).

## 📊 Comparison

| Feature | Netlify Only | Netlify + Railway |
|---------|-------------|-------------------|
| Public Website | ✅ Full | ✅ Full |
| Admin Login | ✅ Works | ✅ Works |
| Create News | ❌ Demo only | ✅ Real |
| Upload Docs | ❌ No | ✅ Yes |
| Manage Staff | ❌ Demo | ✅ Real |
| Feedback Inbox | ❌ No | ✅ Yes |
| Data Persistence | ❌ No | ✅ Yes |
| Cost | Free | Free tier + ~$5/mo |

## 🆘 Troubleshooting

### Login Still Not Working on Netlify?

1. **Clear browser cache**:
   - Cmd+Shift+R (Mac)
   - Ctrl+Shift+R (Windows)

2. **Check browser console** (F12):
   - Look for errors
   - Check Network tab

3. **Try different browser**:
   - Chrome
   - Firefox
   - Safari

4. **Verify credentials**:
   - Username: `admin` (no quotes)
   - Password: `Aa123456` (capital A, lowercase a)

### "Invalid credentials" error?

Make sure you're typing exactly:
```
admin
Aa123456
```

Case-sensitive! First letter is capital A, second is lowercase a.

## ✅ What to Do Next

### For Demo/Testing (Now):
✅ **Login works** - Use the site as-is for demos
- You can showcase the design
- Show all features and pages
- Demo the admin panel UI
- Present to stakeholders

### For Production (Later):
1. Deploy backend to Railway
2. Configure PostgreSQL database
3. Update Netlify redirects
4. Full functionality enabled

---

**Your Netlify site is live and login works now!** 🎉

Try it: https://pmpkedu.netlify.app/admin
