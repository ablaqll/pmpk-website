import { defineConfig } from "drizzle-kit";

// Use PostgreSQL in production, SQLite in development
const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL;

export default defineConfig({
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  dialect: isProduction ? 'postgresql' : 'sqlite',
  dbCredentials: isProduction 
    ? {
        url: process.env.DATABASE_URL!,
      }
    : {
        url: 'sqlite.db',
      },
});
