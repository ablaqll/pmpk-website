# 🇰🇿 How to Replace Kazakhstan Emblem

## Current Status

The website currently has a **placeholder emblem** at:
```
public/kz-emblem.png
```

You uploaded the **official Kazakhstan emblem** in the chat. Follow these steps to use it:

## Step 1: Save the Emblem Image

1. Look at the image you attached in the chat (yellow/blue Kazakhstan emblem)
2. Right-click on it and choose "Save Image As..."
3. Save it as: **`kz-emblem.png`**

## Step 2: Replace the File

Copy the saved emblem to your project:

```bash
# From your Downloads folder (or wherever you saved it)
cp ~/Downloads/kz-emblem.png /Users/abl/.cursor/worktrees/pmpk-website/bcl/public/kz-emblem.png
```

Or manually:
1. Navigate to your project folder: `/Users/abl/.cursor/worktrees/pmpk-website/bcl/public/`
2. Delete the existing `kz-emblem.png`
3. Copy your downloaded emblem file there
4. Rename it to `kz-emblem.png` if needed

## Step 3: Verify

1. Restart your development server (if running)
2. Open http://localhost:5173/
3. Check the top navigation bar - you should see the official emblem next to the flag
4. Scroll to the footer - emblem should appear there too
5. Check the "State Symbols" section on the homepage

## Where the Emblem Appears

The Kazakhstan state emblem is displayed in **3 locations**:

### 1. Top Navigation Bar
```
[FLAG] [EMBLEM] Қазақстан Республикасы
```

### 2. Footer
```
[FLAG]    [EMBLEM]
State Symbols Section
```

### 3. Homepage - State Symbols Card
```
In the sidebar, there's a dedicated "State Symbols" card
showing both the flag and emblem
```

## Technical Specs

### Recommended:
- **Format**: PNG with transparency
- **Dimensions**: 200x200px or larger (maintains quality when scaled)
- **File Size**: < 500KB (for fast loading)
- **Color**: Full color (yellow/blue official colors)

### Current Code References:

The emblem is referenced in these files:
- `src/components/SiteLayout.tsx` - Line 150: `<img src={KZ_EMBLEM_URL} .../>`
- `src/components/SiteLayout.tsx` - Line 259: Footer emblem
- `src/pages/public/SiteHome.tsx` - State symbols card

**Variable**: `KZ_EMBLEM_URL = "/kz-emblem.png"`

## Alternative: Use Online CDN

If you prefer to use an online version:

1. Open `src/components/SiteLayout.tsx`
2. Find line 13: `const KZ_EMBLEM_URL = "/kz-emblem.png";`
3. Change to: `const KZ_EMBLEM_URL = "https://your-cdn-url/emblem.png";`

## Troubleshooting

### Emblem Not Showing After Replace?

1. **Hard Refresh Browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Vite Cache**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Check File Path**
   ```bash
   # Verify file exists
   ls -lh public/kz-emblem.png
   
   # Should show the file size
   ```

4. **Check Browser Console**
   - Press F12
   - Check Console tab for 404 errors
   - Check Network tab to see if emblem is loading

### Emblem Too Large/Small?

The CSS automatically scales it. Current sizes:
- Top bar: `h-5 sm:h-6` (20-24px)
- Footer: `h-10 sm:h-16` (40-64px)

To adjust, edit:
- `src/components/SiteLayout.tsx`
- Look for `<img src={KZ_EMBLEM_URL}`
- Modify the `className` sizes

## ✅ Verification Checklist

After replacing the emblem, verify:

- [ ] Top navigation bar shows correct emblem
- [ ] Footer shows correct emblem
- [ ] State symbols card on homepage shows emblem
- [ ] Emblem scales properly on mobile devices
- [ ] No 404 errors in browser console
- [ ] Image is sharp and clear (not pixelated)

---

## Need the Emblem?

If you lost the emblem file, you can:

1. **Download from official sources**:
   - Government of Kazakhstan website
   - Wikipedia (high-res version)

2. **Use the one you uploaded**:
   - Scroll up in this chat
   - Find the yellow/blue emblem image
   - Right-click → Save Image

---

**Once replaced, your website will have the official Kazakhstan state emblem!** 🇰🇿
