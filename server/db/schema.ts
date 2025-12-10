import { sql } from 'drizzle-orm';

// Check if we're using PostgreSQL or SQLite
const isPostgres = process.env.DATABASE_URL || process.env.NODE_ENV === 'production';

// Import appropriate table creators
let pgTable: any, pgText: any, pgInteger: any, pgTimestamp: any, pgBoolean: any;
let sqliteTable: any, sqliteText: any, sqliteInteger: any;

if (isPostgres) {
  const pg = await import('drizzle-orm/pg-core');
  pgTable = pg.pgTable;
  pgText = pg.text;
  pgInteger = pg.integer;
  pgTimestamp = pg.timestamp;
  pgBoolean = pg.boolean;
} else {
  const sqlite = await import('drizzle-orm/sqlite-core');
  sqliteTable = sqlite.sqliteTable;
  sqliteText = sqlite.text;
  sqliteInteger = sqlite.integer;
}

// Define tables that work with both databases
export const users = isPostgres 
  ? pgTable('users', {
      id: pgText('id').primaryKey(),
      email: pgText('email').notNull().unique(),
      name: pgText('name'),
      role: pgText('role').$type<'super_admin' | 'admin' | 'user'>().default('user'),
      clientId: pgText('client_id'),
      password: pgText('password'),
      createdAt: pgTimestamp('created_at').defaultNow(),
    })
  : sqliteTable('users', {
      id: sqliteText('id').primaryKey(),
      email: sqliteText('email').notNull().unique(),
      name: sqliteText('name'),
      role: sqliteText('role', { enum: ['super_admin', 'admin', 'user'] }).default('user'),
      clientId: sqliteText('client_id'),
      password: sqliteText('password'),
      createdAt: sqliteInteger('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    });

export const clients = isPostgres
  ? pgTable('clients', {
      id: pgText('id').primaryKey(),
      slug: pgText('slug').notNull().unique(),
      name: pgText('name').notNull(),
      description: pgText('description'),
      logo: pgText('logo'),
      phone: pgText('phone'),
      email: pgText('email'),
      address: pgText('address'),
      directorName: pgText('director_name'),
      directorBio: pgText('director_bio'),
      directorPhoto: pgText('director_photo'),
      theme: pgText('theme').default('light'),
      createdAt: pgTimestamp('created_at').defaultNow(),
    })
  : sqliteTable('clients', {
      id: sqliteText('id').primaryKey(),
      slug: sqliteText('slug').notNull().unique(),
      name: sqliteText('name').notNull(),
      description: sqliteText('description'),
      logo: sqliteText('logo'),
      phone: sqliteText('phone'),
      email: sqliteText('email'),
      address: sqliteText('address'),
      directorName: sqliteText('director_name'),
      directorBio: sqliteText('director_bio'),
      directorPhoto: sqliteText('director_photo'),
      theme: sqliteText('theme').default('light'),
      createdAt: sqliteInteger('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    });

export const news = isPostgres
  ? pgTable('news', {
      id: pgText('id').primaryKey(),
      clientId: pgText('client_id').references(() => clients.id),
      title: pgText('title').notNull(),
      content: pgText('content').notNull(),
      imageUrl: pgText('image_url'),
      category: pgText('category').default('news'),
      published: pgBoolean('published').default(false),
      createdAt: pgTimestamp('created_at').defaultNow(),
    })
  : sqliteTable('news', {
      id: sqliteText('id').primaryKey(),
      clientId: sqliteText('client_id').references(() => clients.id),
      title: sqliteText('title').notNull(),
      content: sqliteText('content').notNull(),
      imageUrl: sqliteText('image_url'),
      category: sqliteText('category').default('news'),
      published: sqliteInteger('published', { mode: 'boolean' }).default(false),
      createdAt: sqliteInteger('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    });

export const staff = isPostgres
  ? pgTable('staff', {
      id: pgText('id').primaryKey(),
      clientId: pgText('client_id').references(() => clients.id),
      name: pgText('name').notNull(),
      position: pgText('position'),
      department: pgText('department'),
      email: pgText('email'),
      phone: pgText('phone'),
      photoUrl: pgText('photo_url'),
      active: pgBoolean('active').default(true),
      createdAt: pgTimestamp('created_at').defaultNow(),
    })
  : sqliteTable('staff', {
      id: sqliteText('id').primaryKey(),
      clientId: sqliteText('client_id').references(() => clients.id),
      name: sqliteText('name').notNull(),
      position: sqliteText('position'),
      department: sqliteText('department'),
      email: sqliteText('email'),
      phone: sqliteText('phone'),
      photoUrl: sqliteText('photo_url'),
      active: sqliteInteger('active', { mode: 'boolean' }).default(true),
      createdAt: sqliteInteger('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    });

// Vacancies table
export const vacancies = isPostgres
  ? pgTable('vacancies', {
      id: pgText('id').primaryKey(),
      clientId: pgText('client_id').references(() => clients.id),
      title: pgText('title').notNull(),
      description: pgText('description'),
      requirements: pgText('requirements'),
      salary: pgText('salary'),
      active: pgBoolean('active').default(true),
      createdAt: pgTimestamp('created_at').defaultNow(),
    })
  : sqliteTable('vacancies', {
      id: sqliteText('id').primaryKey(),
      clientId: sqliteText('client_id').references(() => clients.id),
      title: sqliteText('title').notNull(),
      description: sqliteText('description'),
      requirements: sqliteText('requirements'),
      salary: sqliteText('salary'),
      active: sqliteInteger('active', { mode: 'boolean' }).default(true),
      createdAt: sqliteInteger('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    });

// Feedback/Contact requests table
export const feedback = isPostgres
  ? pgTable('feedback', {
      id: pgText('id').primaryKey(),
      clientId: pgText('client_id').references(() => clients.id),
      name: pgText('name').notNull(),
      email: pgText('email'),
      phone: pgText('phone'),
      message: pgText('message').notNull(),
      status: pgText('status').default('pending'), // pending, answered, archived
      createdAt: pgTimestamp('created_at').defaultNow(),
    })
  : sqliteTable('feedback', {
      id: sqliteText('id').primaryKey(),
      clientId: sqliteText('client_id').references(() => clients.id),
      name: sqliteText('name').notNull(),
      email: sqliteText('email'),
      phone: sqliteText('phone'),
      message: sqliteText('message').notNull(),
      status: sqliteText('status').default('pending'),
      createdAt: sqliteInteger('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    });

// Documents table
export const documents = isPostgres
  ? pgTable('documents', {
      id: pgText('id').primaryKey(),
      clientId: pgText('client_id').references(() => clients.id),
      title: pgText('title').notNull(),
      description: pgText('description'),
      category: pgText('category').default('other'), // charter, attestation, budget, report, order, other
      fileUrl: pgText('file_url').notNull(),
      fileSize: pgInteger('file_size'),
      createdAt: pgTimestamp('created_at').defaultNow(),
    })
  : sqliteTable('documents', {
      id: sqliteText('id').primaryKey(),
      clientId: sqliteText('client_id').references(() => clients.id),
      title: sqliteText('title').notNull(),
      description: sqliteText('description'),
      category: sqliteText('category').default('other'),
      fileUrl: sqliteText('file_url').notNull(),
      fileSize: sqliteInteger('file_size'),
      createdAt: sqliteInteger('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
    });

// Types
export type User = typeof users.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type News = typeof news.$inferSelect;
export type Staff = typeof staff.$inferSelect;
export type Vacancy = typeof vacancies.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;
export type Document = typeof documents.$inferSelect;
