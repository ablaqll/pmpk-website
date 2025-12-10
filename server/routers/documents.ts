import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { documents } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const documentsRouter = router({
  // Public: List all documents by client
  list: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(documents)
        .where(eq(documents.clientId, input.clientId))
        .orderBy(desc(documents.createdAt));
      return result;
    }),

  // Public: List by category
  listByCategory: publicProcedure
    .input(z.object({ 
      clientId: z.string(),
      category: z.string(),
    }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(documents)
        .where(and(
          eq(documents.clientId, input.clientId),
          eq(documents.category, input.category)
        ))
        .orderBy(desc(documents.createdAt));
      return result;
    }),

  // Public: Get document by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(documents).where(eq(documents.id, input.id))
      );
      return result || null;
    }),

  // Admin: Create document
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      title: z.string(),
      description: z.string().optional(),
      category: z.string(),
      fileUrl: z.string(),
      fileSize: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      await db.insert(documents).values({
        id,
        ...input,
      });
      return { id };
    }),

  // Admin: Update document
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      category: z.string().optional(),
      fileUrl: z.string().optional(),
      fileSize: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.update(documents)
        .set(data)
        .where(eq(documents.id, id));
      return { success: true };
    }),

  // Admin: Delete document
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(documents).where(eq(documents.id, input.id));
      return { success: true };
    }),
});



