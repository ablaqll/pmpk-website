# PMPK Website

Educational organization website built with React, Vite, and Sanity CMS.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SANITY_PROJECT_ID=10jnk8h0
VITE_SANITY_DATASET=production
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Run Sanity Studio (Content Management)

In a separate terminal:

```bash
npm run sanity
```

Studio will be available at `http://localhost:3333/studio`

### 5. Access Sanity Studio on Production

After deploying to Netlify, Sanity Studio will be available at:
- **https://pmpkedu.netlify.app/studio**

## 📁 Project Structure

```
├── sanity/              # Sanity CMS configuration
│   ├── client.ts       # Sanity client setup
│   ├── lib/
│   │   ├── queries.ts  # Typed query helpers
│   │   └── image.ts    # Image URL builder
│   └── schemaTypes/    # Content schemas
├── src/                # React application
│   ├── components/     # UI components
│   ├── pages/          # Page components
│   └── ...
└── sanity.config.ts    # Sanity Studio config
```

## 🎨 Content Types

- **Settings** (Singleton) - Footer, contacts, state symbols
- **Director Blog** - Blog posts
- **News** - News, press releases, announcements
- **Legal Acts** - Legal documents
- **State Governance** - Budget, procurement, anti-corruption
- **Vacancies** - Job openings
- **Pages** - Generic pages with page builder
- **Employees** - Staff directory
- **Feedback** - Q&A entries

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes Sanity Studio)
- `npm run preview` - Preview production build
- `npm run sanity` - Start Sanity Studio locally
- `npm run sanity:deploy` - Deploy Studio to sanity.io (alternative)

## 🚀 Deployment

The build process automatically:
1. Builds Sanity Studio to `studio-build/`
2. Builds the React app to `dist/`
3. Copies Studio files to `dist/studio/`

Sanity Studio will be available at `/studio` on your deployed Netlify site.

### CORS Configuration

After deploying, add your Netlify URL to Sanity CORS origins:
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project (`10jnk8h0`)
3. Go to **Settings** > **API** > **CORS Origins**
4. Add: `https://pmpkedu.netlify.app`
5. Check "Allow credentials"
6. Save

## 📚 Documentation

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
