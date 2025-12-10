# PMPK №9 Website

Official website for the Psychological-Medical-Pedagogical Consultation №9, Astana, Kazakhstan.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
npm run db:reset
```

This will:
- Delete any existing database
- Create a fresh database
- Seed with initial data including admin user

### 3. Start Development

**Option A: Run Both Servers Together**
```bash
npm run dev:all
```

**Option B: Run Separately**

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

### 4. Access the Website

- **Public Website**: http://localhost:5173/
- **Admin Login**: http://localhost:5173/admin
  - Username: `admin`
  - Password: `Aa123456`

## 📂 Project Structure

```
/
├── public/                  # Static assets
│   ├── kz-emblem.png       # Kazakhstan state emblem ⚠️ REPLACE THIS
│   ├── kz-flag.svg         # Kazakhstan flag
│   └── pmpk9-logo.png      # PMPK logo
├── src/
│   ├── pages/
│   │   ├── public/         # Public website pages
│   │   ├── client-admin/   # PMPK admin panel pages
│   │   ├── super-admin/    # Super admin pages
│   │   └── Home.tsx        # Login page
│   ├── components/         # Reusable components
│   ├── contexts/           # React contexts (Language, Theme)
│   └── hooks/              # Custom React hooks
├── server/                  # Backend API
│   ├── routers/            # tRPC routers
│   ├── db/                 # Database schema
│   └── seed.ts             # Database seeding
└── sqlite.db               # SQLite database file
```

## 🌐 Language Support

The website supports **3 languages**:
- 🇰🇿 **Kazakh** (Default)
- 🇷🇺 **Russian**
- 🇬🇧 **English**

All pages are fully translated. Change language using the switcher in the top bar: **ҚАЗ | РУС | ENG**

## 🎨 Replace Kazakhstan Emblem

**Important**: Replace the placeholder emblem with the official one:

1. Save the official Kazakhstan emblem as:
   ```
   public/kz-emblem.png
   ```

2. Recommended specs:
   - Format: PNG with transparency
   - Size: 200x200px or larger
   - File size: < 500KB

The emblem appears in:
- Top navigation bar
- Footer
- State symbols section on homepage

## 🔐 Admin Credentials

**Default Login:**
- Username: `admin`
- Password: `Aa123456`

⚠️ **Change this password in production!**

## 📱 Admin Panel Features

### PMPK Admin Panel (`/admin/pmpk9`)

Manage your website content:
- ✅ **Overview** - Dashboard with statistics
- ✅ **About PMPK** - Organization information
- ✅ **News** - Create and manage news articles
- ✅ **Legal Acts (НПА РК)** - Upload documents and regulations
- ✅ **State Governance** - Budget, procurement, anti-corruption info
- ✅ **Feedback** - View and respond to citizen requests
- ✅ **Vacancies** - Post job openings
- ✅ **Events** - Manage conferences, seminars, challenges
- ✅ **Memorandum** - Partnership agreements
- ✅ **Publications** - School newspapers, journals, collections
- ✅ **Attestation** - Documentation and protocols
- ✅ **Settings** - Configure site settings

### Super Admin Panel (`/super-admin`)

System-wide management:
- Manage multiple client organizations
- Manage users and permissions
- System statistics

## 🌍 Public Website Pages

All accessible from the root URL:

- `/` - Homepage
- `/news` - News & announcements
- `/about` - About PMPK
- `/structure` - Organization structure & staff
- `/documents` - Legal documents
- `/management` - State governance information
- `/feedback` - Contact form
- `/vacancies` - Job openings
- `/contacts` - Contact information

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start frontend only
npm run server           # Start backend only
npm run dev:all          # Start both frontend & backend

# Database
npm run db:seed          # Seed database
npm run db:reset         # Delete & reseed database

# Production
npm run build            # Build for production
npm run preview          # Preview production build
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui components
- **Routing**: Wouter
- **Backend**: Fastify, tRPC
- **Database**: SQLite with Drizzle ORM
- **State**: TanStack Query (React Query)

## 📝 Adding Content

### Add News Article

1. Login to admin panel
2. Navigate to "Новости" (News)
3. Click "Создать новость" (Create news)
4. Fill in the form and publish

### Add Staff Member

1. Navigate to "Структура" in admin
2. Click "Добавить сотрудника"
3. Upload photo and fill in details

### Upload Documents

1. Navigate to "НПА РК" 
2. Click "Загрузить документ"
3. Select category and upload file

## 🔒 Security Notes

### For Production Deployment:

1. **Change Admin Password**
   - Login and change the default password

2. **Use Environment Variables**
   Create `.env` file:
   ```env
   NODE_ENV=production
   DB_URL=your_production_database_url
   JWT_SECRET=your_secret_key
   ```

3. **Enable Password Hashing**
   - Install bcrypt: `npm install bcrypt`
   - Update `server/routers/auth.ts` to hash passwords
   - Update seed script to hash the admin password

4. **HTTPS Only**
   - Use HTTPS in production
   - Enable secure cookies

## 🐛 Troubleshooting

### Can't Login?

```bash
# Reset database and admin user
npm run db:reset

# Restart backend server
# Stop the server (Ctrl+C) and run:
npm run server
```

### Port Already in Use?

```bash
# Kill processes on default ports
lsof -ti:5173 | xargs kill -9  # Frontend
lsof -ti:3000 | xargs kill -9   # Backend
```

### Pages Not Translating?

- Clear browser cache (Ctrl+Shift+R)
- Check browser console for errors
- Make sure language switcher is in top bar

### Emblem Not Showing?

- Verify file exists: `public/kz-emblem.png`
- Check file format (should be PNG)
- Hard refresh browser (Ctrl+Shift+R)

## 📞 Support

For technical issues or questions, check:
- Browser console (F12 → Console tab)
- Terminal logs (backend and frontend)
- Network tab in DevTools

## 📄 License

© 2024 PMPK №9. All rights reserved.
