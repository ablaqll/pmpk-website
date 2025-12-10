import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Support both PostgreSQL (production) and SQLite (development)
const isDevelopment = process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL;

let db: ReturnType<typeof drizzle>;

if (isDevelopment) {
  // Development: Use SQLite
  const { drizzle: drizzleSqlite } = await import('drizzle-orm/better-sqlite3');
  const Database = (await import('better-sqlite3')).default;
  const sqlite = new Database('sqlite.db');
  db = drizzleSqlite(sqlite, { schema }) as any;
  console.log('🔧 Using SQLite database (development mode)');
} else {
  // Production: Use PostgreSQL
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is required for production');
  }

  const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false // Railway/Render use SSL
    } : undefined
  });

  db = drizzle(pool, { schema });
  console.log('🚀 Using PostgreSQL database (production mode)');
}

export { db };
