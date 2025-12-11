# PMPK Website

Educational organization website built with React, Vite, and Sanity CMS.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root (not in Sanity):

```env
VITE_SANITY_PROJECT_ID=10jnk8h0
VITE_SANITY_DATASET=production
```

**Note:** The `.env` file should be in the **project root** (same directory as `package.json`), not in Sanity. Sanity Studio will read these variables automatically.

### 3. Run Development Server

```bash
npm run dev
```

### 4. Run Sanity Studio (Content Management)

In a separate terminal:

```bash
npm run sanity
```

Studio will be available at `http://localhost:3333`

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
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run sanity` - Start Sanity Studio
- `npm run sanity:deploy` - Deploy Sanity Studio

## 📚 Documentation

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
