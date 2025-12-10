# PMPK Website - Setup & Configuration Instructions

## ✅ All Issues Fixed Successfully!

### 1. ✅ Git Merge Conflict Markers Removed
- **File**: `src/App.tsx` (lines 52-56)
- **Status**: ✅ **FIXED**
- **Changes**: Removed merge conflict markers and kept proper routing structure
- **Verification**: Application now compiles without errors

### 2. ✅ Hardcoded Credentials Removed
- **File**: `server/routers/auth.ts` (lines 16-28)
- **Status**: ✅ **FIXED**
- **Changes**: Removed hardcoded credentials from auth router. Now relies solely on database users.
- **Security**: Authentication now properly uses database for credential validation

### 3. ✅ Login Page Redirect Logic Improved
- **File**: `src/pages/Home.tsx` (lines 41-49)
- **Status**: ✅ **FIXED**
- **Changes**: 
  - Replaced `window.location.href` redirects with proper React Router navigation
  - Added "Already Logged In" page when user visits `/admin` while authenticated
  - Provides clear navigation options instead of forced redirects
- **UX Improvement**: No more redirect loops, users see a clear page with options

## Setup Instructions

### 1. Database Setup

Run the seed script to create the admin user:

```bash
npm run db:seed
```

This will create:
- Admin user with credentials: `admin` / `Aa123456`
- PMPK9 client organization
- Sample news articles

### 2. Replace Kazakhstan Emblem

The user uploaded a new Kazakhstan emblem image. To use it:

1. Save the attached emblem image (from the user's upload)
2. Replace the existing file at: `public/kz-emblem.png`
3. The emblem is already properly referenced in the code

### 3. Start Development Server

```bash
# Start backend
npm run server

# Start frontend (in another terminal)
npm run dev
```

### 4. Login Credentials

- **URL**: `http://localhost:5173/admin`
- **Username**: `admin`
- **Password**: `Aa123456`

## Website Structure

### Public Website (Root `/`)
The public PMPK website is now the default homepage:
- `/` - Home page
- `/news` - News & announcements
- `/about` - About PMPK
- `/documents` - Legal documents (НПА РК)
- `/management` - State governance info
- `/feedback` - Contact form
- `/vacancies` - Job openings
- `/structure` - Organization structure
- `/contacts` - Contact information

### Admin Panel (`/admin`)
- `/admin` - Login page (or "Already Logged In" page if authenticated)
- `/admin/pmpk9` - PMPK admin dashboard with sections:
  - Overview
  - About PMPK
  - News
  - Legal Acts (НПА РК)
  - State Governance
  - Feedback
  - Vacancies
  - Events
  - Memorandum
  - Publications
  - Attestation
  - Settings

### Super Admin Panel (`/super-admin`)
- `/super-admin` - Super admin dashboard
- `/super-admin/clients` - Manage clients
- `/super-admin/users` - Manage users

## Translation System

All public pages support 3 languages:
- **Kazakh (KZ)** - Default
- **Russian (RU)**
- **English (EN)**

Translations are comprehensive and cover:
- Navigation menus
- Page titles and descriptions
- Form labels and buttons
- Error messages
- Footer content

The language switcher is in the top bar of the public website.

## Security Notes

### ⚠️ Important for Production:

1. **Database Encryption**: Currently, passwords are stored in plain text. For production:
   - Implement password hashing (bcrypt/argon2)
   - Update `server/routers/auth.ts` to hash passwords during login check
   - Update `server/seed.ts` to hash passwords when creating users

2. **Environment Variables**: Store sensitive credentials in `.env`:
   ```
   DB_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

3. **Remove Seed Script**: Don't run the seed script in production or ensure it checks if admin user already exists.

## Testing the Fixes

### Test Login System:
1. Navigate to `http://localhost:5173/admin`
2. Enter credentials: `admin` / `Aa123456`
3. Should successfully log in and redirect to appropriate panel

### Test Already Logged In Page:
1. Log in as admin
2. Navigate back to `/admin`
3. Should see "Already Logged In" page with navigation options (not stuck in redirect loop)

### Test Public Website:
1. Navigate to `http://localhost:5173/`
2. Should see PMPK public website (not login page)
3. Test language switcher (KZ / RU / EN) in top bar
4. All pages should be properly translated

### Test Admin Panel:
1. Log in and navigate to `/admin/pmpk9`
2. All menu items should be translated based on selected language
3. Can navigate to all sections: News, Documents, Feedback, etc.

## Additional Notes

- The emblem appears in multiple places:
  - Top bar of public website
  - Footer of public website
  - State symbols section on homepage
  
- Make sure the new emblem image is properly formatted:
  - PNG format with transparency recommended
  - Resolution: at least 200x200px for quality
  - File size: optimized (< 100KB if possible)

## Troubleshooting

### If login doesn't work:
```bash
# Delete database and reseed
rm sqlite.db
npm run db:seed
```

### If pages aren't translated:
- Check browser console for warnings like "Translation missing for key: xxx"
- Update `src/contexts/LanguageContext.tsx` with missing translations

### If admin panel doesn't load:
- Check if user role is correct in database
- Check browser console for errors
- Verify TRPC connection is working
