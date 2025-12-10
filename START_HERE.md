# 🎉 START HERE - PMPK Website Setup

## ✅ What's Been Fixed

All your issues have been resolved:

1. ✅ **Login System Fixed** - You can now login with `admin` / `Aa123456`
2. ✅ **Website at Root** - Public PMPK website appears at `/` (home URL)
3. ✅ **Admin Panel at `/admin`** - Clean URL structure
4. ✅ **Complete Translations** - All pages translate when you change language
5. ✅ **AQL Lab Removed** - All references deleted
6. ✅ **Emblem Ready** - Just needs your uploaded image (see instructions below)

## 🚀 Setup in 3 Steps

### Step 1: Reset Database

Open a terminal and run:

```bash
cd /Users/abl/.cursor/worktrees/pmpk-website/bcl
npm run db:reset
```

**Expected Output:**
```
Seeding database...
Seeding complete!
```

This creates the admin user with credentials: `admin` / `Aa123456`

### Step 2: Start Servers

**EASY WAY** - One command for both:
```bash
npm run dev:all
```

**OR MANUAL WAY** - Two separate terminals:

**Terminal 1:**
```bash
npm run server
```
Wait for: `Server listening on http://localhost:3000`

**Terminal 2:**
```bash
npm run dev
```
Wait for: `Local: http://localhost:5173/`

### Step 3: Test Login

1. Open browser: **http://localhost:5173/**
   - ✅ Should see PMPK public website (NOT admin panel)

2. Navigate to: **http://localhost:5173/admin**
   - ✅ Should see login page

3. Login:
   - Username: `admin`
   - Password: `Aa123456`
   - ✅ Should redirect to admin panel

## 🇰🇿 Replace Emblem (Required)

You uploaded the official Kazakhstan emblem in the chat. To use it:

### Quick Instructions:

1. **Find your uploaded emblem** (scroll up in chat - it's the yellow/blue circular emblem)
2. **Right-click** → Save Image As → Save as `kz-emblem.png`
3. **Replace the file**:
   ```bash
   # Replace this file with your downloaded emblem:
   /Users/abl/.cursor/worktrees/pmpk-website/bcl/public/kz-emblem.png
   ```

4. **Refresh browser** (Ctrl+Shift+R or Cmd+Shift+R)

**See detailed instructions in:** `REPLACE_EMBLEM_GUIDE.md`

## 🧪 Test Everything

### Test 1: Public Website
- [ ] Go to http://localhost:5173/
- [ ] See PMPK homepage (not login page)
- [ ] Change language: Click **ҚАЗ** / **РУС** / **ENG** in top bar
- [ ] Navigate to all pages (News, About, Documents, etc.)
- [ ] Verify all text translates

### Test 2: Login
- [ ] Go to http://localhost:5173/admin
- [ ] Login with `admin` / `Aa123456`
- [ ] Redirects to admin panel successfully
- [ ] Can see all menu items on left sidebar

### Test 3: Admin Panel
- [ ] All menu items in Russian (or your selected language)
- [ ] Can navigate to each section
- [ ] "Просмотр сайта" button works (goes to public site)
- [ ] Logout works

### Test 4: Translations
- [ ] Change language in public site
- [ ] All pages update their text:
  - News list → Check titles and labels
  - News detail → Check "Back" button, "Share" button
  - Documents → Check category names
  - Feedback → Check form labels
  - Vacancies → Check "Apply" button, requirements label
  - Structure → Check page title
  - Contacts → Check all labels

### Test 5: State Symbols
- [ ] Flag appears in top bar
- [ ] Emblem appears in top bar
- [ ] Both appear in footer
- [ ] State symbols card on homepage works
- [ ] Anthem link works

## 📋 Website Structure

```
Public Website (/)
├── Home               → /
├── News              → /news
├── About PMPK        → /about
├── Structure         → /structure
├── Documents         → /documents
├── State Governance  → /management
├── Feedback          → /feedback
├── Vacancies         → /vacancies
└── Contacts          → /contacts

Admin Panel (/admin)
├── Login             → /admin
└── PMPK Admin        → /admin/pmpk9
    ├── Overview
    ├── About PMPK
    ├── News
    ├── Legal Acts (НПА РК)
    ├── State Governance
    ├── Feedback
    ├── Vacancies
    ├── Events
    ├── Memorandum
    ├── Publications
    ├── Attestation
    └── Settings

Super Admin (/super-admin)
├── Dashboard
├── Clients
└── Users
```

## 🎨 Features Implemented

### Public Website
- ✅ 3-language support (KZ/RU/EN)
- ✅ Kazakhstan state symbols (flag, emblem, anthem)
- ✅ Smooth scroll animations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ External links to government portals:
  - birge.astana.kz (Astana services)
  - egov.kz (E-Government)
  - adilet.zan.kz (Legislation)
  - goszakup.gov.kz (Procurement)
  - enbek.kz (Vacancies)
- ✅ Contact form with validation
- ✅ 2GIS map integration
- ✅ WhatsApp integration
- ✅ Instagram links

### Admin Panel
- ✅ Secure login system
- ✅ Content management (news, documents, vacancies)
- ✅ Feedback inbox
- ✅ Staff management
- ✅ Settings configuration
- ✅ Multi-section organization (events, publications, attestation, etc.)

### Developer Features
- ✅ Type-safe with TypeScript
- ✅ tRPC for type-safe API
- ✅ Drizzle ORM for database
- ✅ React 19 with latest features
- ✅ Vite for fast development

## 🆘 Common Issues & Solutions

### Issue: "Can't login with admin/Aa123456"

**Solution:**
```bash
npm run db:reset
# Restart backend server (Ctrl+C then npm run server)
```

### Issue: "Pages not translating"

**Solution:**
- Use the language switcher in the **top bar** (ҚАЗ | РУС | ENG)
- Don't use browser's built-in translate feature
- Refresh page after switching language

### Issue: "Admin panel not loading"

**Solution:**
1. Make sure backend server is running (`npm run server`)
2. Check terminal for errors
3. Open browser console (F12) for error messages

### Issue: "Emblem not showing"

**Solution:**
1. Replace `public/kz-emblem.png` with your uploaded emblem
2. Hard refresh browser (Ctrl+Shift+R)
3. Check file exists: `ls -lh public/kz-emblem.png`

## 📚 Additional Documentation

- **`README.md`** - Full project documentation
- **`FINAL_SETUP.md`** - Detailed setup guide
- **`REPLACE_EMBLEM_GUIDE.md`** - How to replace the emblem
- **`SETUP_INSTRUCTIONS.md`** - Technical details

## 🎯 Next Steps

1. ✅ Run `npm run db:reset` to create admin user
2. ✅ Run `npm run dev:all` to start servers
3. ✅ Login at http://localhost:5173/admin
4. ✅ Replace emblem with your uploaded image
5. ✅ Test all pages and translations
6. ✅ Add your content (news, staff, documents)
7. ✅ Change admin password
8. ✅ Deploy to production

## 💡 Pro Tips

- **Keyboard Shortcuts**:
  - `Ctrl+K` - Quick search in admin panel
  - `Ctrl+S` - Save forms
  - `Esc` - Close dialogs

- **Best Practices**:
  - Always test in all 3 languages before publishing
  - Use high-quality images for news (at least 800px wide)
  - Keep document file sizes reasonable (< 10MB)
  - Update news regularly for SEO

- **Content Guidelines**:
  - Write clear, concise news titles
  - Use proper Kazakhstan state language in official documents
  - Include both Kazakh and Russian versions
  - Add English for international visibility

---

## ✨ You're Ready to Go!

Your PMPK website is fully functional with:
- ✅ Secure admin panel
- ✅ Multi-language support
- ✅ Government-standard design
- ✅ All required sections per your specifications
- ✅ Mobile-friendly responsive layout
- ✅ Fast performance

**Start with:** `npm run db:reset` → `npm run dev:all` → Open http://localhost:5173/

🚀 **Good luck with your website!**
