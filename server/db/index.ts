import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Support both PostgreSQL (production) and SQLite (development)
const isDevelopment = process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL;

let db: ReturnType<typeof drizzle>;

try {
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
      console.error('❌ ERROR: DATABASE_URL environment variable is required for production!');
      console.error('📋 Please add a PostgreSQL database to your Railway project:');
      console.error('   1. Go to your Railway project');
      console.error('   2. Click "New" -> "Database" -> "Add PostgreSQL"');
      console.error('   3. Railway will automatically set DATABASE_URL');
      throw new Error('DATABASE_URL environment variable is required for production');
    }

    console.log('🔌 Attempting to connect to PostgreSQL...');
    const pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false // Railway/Render use SSL
      } : undefined
    });

    // Test the connection
    await pool.query('SELECT 1');
    
    db = drizzle(pool, { schema });
    console.log('✅ Using PostgreSQL database (production mode)');
    console.log('✅ Database connection established successfully');
  }
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  console.error('⚠️  This error will prevent the server from starting.');
  console.error('💡 Make sure DATABASE_URL is set in Railway environment variables.');
  throw error;
}

export { db };
