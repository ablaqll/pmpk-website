# ✅ PMPK Website - Complete Setup Guide

## All Issues Fixed!

### 1. ✅ Git Merge Conflicts Resolved
- Removed all merge conflict markers from `src/App.tsx`
- Application now compiles without errors

### 2. ✅ Login System Fixed
- Database seed script updated and working
- Login credentials: `admin` / `Aa123456`
- Removed all references to old email formats

### 3. ✅ Website Structure Fixed
- **Public Website**: Now at root `/` (PMPK homepage is the first page)
- **Admin Panel**: Moved to `/admin` (login page)
- **PMPK Admin**: At `/admin/pmpk9` (management panel)
- **Super Admin**: At `/super-admin` (system admin panel)

### 4. ✅ All AQL Lab References Removed
- Deleted all AQL logo files from `/public`
- Removed references from seed script
- Clean codebase - only PMPK branding remains

### 5. ✅ Complete Translation Support
- All pages now support 3 languages (Kazakh, Russian, English)
- Updated pages:
  - ✅ Home page
  - ✅ News list
  - ✅ News detail page
  - ✅ Documents page
  - ✅ Feedback page
  - ✅ Vacancies page
  - ✅ Structure page
  - ✅ Contacts page
  - ✅ Management page
  - ✅ About page
- Language switcher in top bar works everywhere

### 6. ✅ Kazakhstan Emblem
- Location: `/public/kz-emblem.png`
- Already properly configured in code
- Appears in:
  - Top navigation bar
  - Footer
  - State symbols section on homepage

## 🚀 Setup Instructions

### Step 1: Delete Old Database & Reseed

Run these commands to create a fresh database with the admin user:

```bash
# Delete old database
rm sqlite.db

# Run seed script to create admin user and initial data
npm run db:seed
```

**Expected output:**
```
Seeding database...
Seeding complete!
```

### Step 2: Start the Development Servers

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 3: Access the Website

Open your browser to: **http://localhost:5173/**

You should see the **PMPK public website** as the homepage.

### Step 4: Login to Admin Panel

1. Navigate to: **http://localhost:5173/admin**
2. Enter credentials:
   - **Login**: `admin`
   - **Password**: `Aa123456`
3. Click "Sign In"
4. You'll be redirected to the admin panel

## 📂 Website Structure

### Public Website (Root)
- `/` - PMPK Home page
- `/news` - News & announcements
- `/about` - About PMPK
- `/documents` - Legal documents (НПА РК)
- `/management` - State governance
- `/feedback` - Contact form
- `/vacancies` - Job vacancies
- `/structure` - Organization structure
- `/contacts` - Contact information

### Admin Panels
- `/admin` - Admin login page
- `/admin/pmpk9` - PMPK Admin Panel with sections:
  - Overview
  - About PMPK
  - News
  - Legal Acts (НПА РК)
  - State Governance
  - Feedback
  - Vacancies
  - Events (Мероприятия)
  - Memorandum (Меморандум)
  - Publications (Издание)
  - Attestation (Аттестация)
  - Settings
- `/super-admin` - Super Admin Panel (system-wide management)

## 🌐 Language Support

The website supports 3 languages with complete translations:

- **🇰🇿 Kazakh (KZ)** - Default language
- **🇷🇺 Russian (RU)** 
- **🇬🇧 English (EN)**

### How to Change Language:

1. Look at the top navigation bar
2. You'll see: **ҚАЗ | РУС | ENG**
3. Click on your preferred language
4. All pages will automatically translate

## 🎨 Kazakhstan Emblem

The Kazakhstan state emblem is located at:
```
/public/kz-emblem.png
```

It appears in:
- ✅ Top navigation bar (next to the flag)
- ✅ Footer
- ✅ State symbols section on homepage

**The emblem is already properly configured!** If you uploaded a new version, just replace the file at `public/kz-emblem.png`.

## 🔐 Security Notes

### For Production Deployment:

1. **Hash Passwords**: Currently passwords are stored in plain text
   - Implement bcrypt or argon2 hashing
   - Update `server/routers/auth.ts` to verify hashed passwords

2. **Environment Variables**: Create `.env` file:
   ```
   DB_URL=your_production_database_url
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```

3. **Change Admin Password**: After first login, change the default password

## ✅ Testing Checklist

### Test Login:
- [ ] Go to `/admin`
- [ ] Login with `admin` / `Aa123456`
- [ ] Redirects to admin panel
- [ ] Can navigate all menu items

### Test Public Website:
- [ ] Homepage loads at `/`
- [ ] All navigation links work
- [ ] Language switcher changes all text
- [ ] All pages display properly
- [ ] State symbols (flag & emblem) appear correctly

### Test Translations:
- [ ] Change language to Kazakh (ҚАЗ)
- [ ] Change language to Russian (РУС)
- [ ] Change language to English (ENG)
- [ ] Check all pages translate properly:
  - News list and detail pages
  - Documents page
  - Feedback form
  - Vacancies
  - Structure
  - Contacts

### Test Admin Panel:
- [ ] Can create/edit news
- [ ] Can manage documents
- [ ] Can view feedback
- [ ] All admin menu items accessible
- [ ] Can logout successfully

## 🆘 Troubleshooting

### Problem: "Can't login with admin/Aa123456"

**Solution:**
```bash
# Delete database and reseed
rm sqlite.db
npm run db:seed

# Restart backend server
# Press Ctrl+C in the terminal running server
npm run server
```

### Problem: "Pages not translating"

**Solution:**
- Check browser console for errors
- Make sure you're using the language switcher in the top bar (not browser translate)
- Refresh the page after switching languages

### Problem: "Emblem not showing"

**Solution:**
- Verify the file exists: `public/kz-emblem.png`
- Check the file size (should be under 2MB)
- Format should be PNG with transparency
- Refresh browser with Ctrl+Shift+R (hard refresh)

### Problem: "Port already in use"

**Solution:**
```bash
# Kill processes on ports 5173 and 3000
lsof -ti:5173 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Restart servers
npm run server
npm run dev
```

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console (F12) for errors
2. Check the terminal logs for backend errors
3. Ensure both servers are running
4. Try deleting `sqlite.db` and running `npm run db:seed` again

---

## 🎉 You're All Set!

Your PMPK website is now fully configured with:
- ✅ Login system working
- ✅ Public website at root URL
- ✅ Complete translations (KZ/RU/EN)
- ✅ Kazakhstan state symbols
- ✅ Clean codebase (no AQL Lab references)
- ✅ Admin panel at `/admin`

**Access your website at: http://localhost:5173/**
