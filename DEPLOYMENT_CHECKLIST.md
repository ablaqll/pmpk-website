# 🚀 PMPK Website - Deployment Checklist

## Pre-Deployment Checklist

### ✅ 1. Replace Kazakhstan Emblem
- [ ] Downloaded official emblem from chat
- [ ] Replaced `public/kz-emblem.png` with official version
- [ ] Verified emblem appears in top bar, footer, and homepage
- [ ] Checked on mobile devices

### ✅ 2. Database Setup
- [ ] Run: `npm run db:reset`
- [ ] Verified admin user created
- [ ] Tested login with `admin` / `Aa123456`
- [ ] Changed default admin password in production

### ✅ 3. Content Addition
- [ ] Added organization news
- [ ] Uploaded staff information
- [ ] Added documents (charter, regulations, etc.)
- [ ] Configured vacancies
- [ ] Set up director information
- [ ] Added contact details

### ✅ 4. Translation Verification
Test all pages in all 3 languages:

**Kazakh (ҚАЗ):**
- [ ] Homepage
- [ ] News list
- [ ] News detail
- [ ] About page
- [ ] Structure page
- [ ] Documents page
- [ ] State governance page
- [ ] Feedback form
- [ ] Vacancies page
- [ ] Contacts page

**Russian (РУС):**
- [ ] All pages listed above

**English (ENG):**
- [ ] All pages listed above

### ✅ 5. Admin Panel Testing
- [ ] Login works
- [ ] Can create news
- [ ] Can upload documents
- [ ] Can manage staff
- [ ] Can view feedback
- [ ] Settings save properly
- [ ] Logout works
- [ ] All menu items translated

### ✅ 6. Links & Integrations
- [ ] WhatsApp link works: https://wa.me/77776080065
- [ ] Instagram link works: @pmpk_9ast
- [ ] Email link works: pmpk9_ast@mail.ru
- [ ] Phone link works: +7 777 608 00 65
- [ ] 2GIS map loads correctly
- [ ] Government portal links work:
  - [ ] birge.astana.kz
  - [ ] egov.kz
  - [ ] adilet.zan.kz
  - [ ] goszakup.gov.kz
  - [ ] enbek.kz

### ✅ 7. Security Configuration

**Critical for Production:**

1. **Change Admin Password**
   ```bash
   # After first login, update password in admin panel
   # Or update in database seed script before deployment
   ```

2. **Environment Variables**
   Create `.env.production`:
   ```env
   NODE_ENV=production
   VITE_API_URL=https://your-api-domain.com
   DB_URL=your_production_database.db
   ```

3. **Enable Password Hashing**
   ```bash
   npm install bcrypt @types/bcrypt
   ```
   
   Update `server/routers/auth.ts`:
   ```typescript
   import bcrypt from 'bcrypt';
   
   // In login mutation:
   const isValid = await bcrypt.compare(input.password, user.password);
   if (!isValid) {
     throw new TRPCError({ code: 'UNAUTHORIZED' });
   }
   ```

4. **Secure Headers**
   Add to `server/index.ts`:
   ```typescript
   import helmet from '@fastify/helmet';
   await fastify.register(helmet);
   ```

### ✅ 8. Performance Optimization

- [ ] Optimize images (compress with TinyPNG or similar)
- [ ] Enable gzip compression
- [ ] Add CDN for static assets
- [ ] Configure caching headers
- [ ] Minify CSS/JS (automatic with Vite build)

### ✅ 9. SEO Setup

- [ ] Add meta descriptions to each page
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Configure Open Graph tags
- [ ] Set up Google Analytics (if needed)

### ✅ 10. Mobile Testing

Test on actual devices:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad/Tablet
- [ ] Different screen sizes

Check:
- [ ] Navigation menu works
- [ ] Forms are usable
- [ ] Images load properly
- [ ] Buttons are tappable
- [ ] Text is readable

## 🏗️ Build for Production

### 1. Build Frontend
```bash
npm run build
```

Output will be in `dist/` folder.

### 2. Test Production Build Locally
```bash
npm run preview
```

### 3. Deploy

**Option A: Netlify/Vercel (Recommended for Frontend)**

1. Connect your git repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables: Add your `.env` values

**Option B: Traditional Server**

1. Upload `dist/` folder to web server
2. Configure nginx or Apache
3. Set up SSL certificate (Let's Encrypt)
4. Configure domain DNS

### 4. Backend Deployment

**Option A: Same Server**
- Run backend with PM2 or similar process manager
- Configure reverse proxy (nginx)

**Option B: Separate API Server**
- Deploy backend to separate server
- Update `VITE_API_URL` in frontend `.env`
- Configure CORS properly

## 🧪 Post-Deployment Testing

After deployment, verify:

### Public Website
- [ ] https://your-domain.com/ loads
- [ ] All pages accessible
- [ ] Language switcher works
- [ ] External links work
- [ ] Contact form submits
- [ ] Images load (emblem, flag, logos)
- [ ] Mobile responsive

### Admin Panel
- [ ] https://your-domain.com/admin loads
- [ ] Can login
- [ ] All admin features work
- [ ] Can create/edit content
- [ ] Changes appear on public site
- [ ] Can logout

### Performance
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90
- [ ] Mobile speed score > 80
- [ ] No console errors

## 📊 Monitoring Setup

### After Deployment:

1. **Set up uptime monitoring**
   - UptimeRobot (free)
   - Pingdom
   - StatusCake

2. **Error tracking**
   - Sentry (recommended)
   - LogRocket
   - Rollbar

3. **Analytics**
   - Google Analytics
   - Yandex Metrica (popular in Kazakhstan)
   - Plausible (privacy-focused)

## 🔄 Content Update Workflow

### For Administrators:

1. Login to `/admin`
2. Navigate to relevant section
3. Create or edit content
4. Save and publish
5. View changes on public website

### Regular Tasks:
- **Daily**: Check feedback inbox
- **Weekly**: Add news updates
- **Monthly**: Update vacancies
- **Quarterly**: Review and update documents

## 🆘 Emergency Contacts

If something breaks in production:

### Quick Fixes:

**Site Down?**
```bash
# Check if servers are running
pm2 status  # if using PM2

# Restart servers
pm2 restart all
```

**Database Corrupted?**
```bash
# Restore from backup (set up backups!)
cp sqlite.db.backup sqlite.db
pm2 restart backend
```

**Cache Issues?**
- Clear CDN cache
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache

## 📝 Maintenance Schedule

### Daily
- Monitor site uptime
- Check feedback submissions
- Review error logs

### Weekly
- Update news section
- Respond to feedback
- Check broken links

### Monthly
- Review analytics
- Update vacancies
- Backup database
- Check for security updates

### Quarterly
- Review and update documents
- Update staff information
- Performance audit
- Security audit

## ✨ Success Metrics

Your PMPK website is successful when:

- ✅ Uptime > 99.9%
- ✅ Page load time < 2 seconds
- ✅ Mobile score > 90
- ✅ Zero accessibility errors
- ✅ Feedback responses < 24 hours
- ✅ Content updated weekly
- ✅ Translations accurate and complete

---

## 📞 Support Resources

- **Technical Documentation**: See `README.md`
- **Setup Guide**: See `START_HERE.md`
- **Emblem Guide**: See `REPLACE_EMBLEM_GUIDE.md`

---

**Ready to deploy? Start with Step 1 of Build for Production!** 🚀
