import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table (Super Admin & Client Admins)
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: text('role', { enum: ['super_admin', 'admin', 'user'] }).default('user'),
  clientId: text('client_id'), // Link to client if role is admin
  password: text('password'), // In real app, this should be hashed
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Clients table (e.g. PMPK9)
export const clients = sqliteTable('clients', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(), // e.g. "pmpk9"
  name: text('name').notNull(),
  description: text('description'),
  logo: text('logo'),
  phone: text('phone'),
  email: text('email'),
  address: text('address'),
  directorName: text('director_name'),
  directorBio: text('director_bio'),
  directorPhoto: text('director_photo'),
  theme: text('theme').default('light'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// News table
export const news = sqliteTable('news', {
  id: text('id').primaryKey(),
  clientId: text('client_id').references(() => clients.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  imageUrl: text('image_url'),
  published: integer('published', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

// Staff table
export const staff = sqliteTable('staff', {
  id: text('id').primaryKey(),
  clientId: text('client_id').references(() => clients.id),
  name: text('name').notNull(),
  position: text('position'),
  department: text('department'),
  photoUrl: text('photo_url'),
  active: integer('active', { mode: 'boolean' }).default(true),
});

// Types
export type User = typeof users.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type News = typeof news.$inferSelect;
export type Staff = typeof staff.$inferSelect;

