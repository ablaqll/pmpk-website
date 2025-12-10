import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { publications } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const publicationsRouter = router({
  // Public: List published publications
  listPublished: publicProcedure
    .input(z.object({ 
      clientId: z.string(),
      type: z.enum(['newspaper', 'journal', 'collection', 'methodological', 'electronic', 'article']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [
        eq(publications.clientId, input.clientId),
        eq(publications.published, true)
      ];
      
      if (input.type) {
        conditions.push(eq(publications.type, input.type));
      }
      
      return await db.select()
        .from(publications)
        .where(and(...conditions))
        .orderBy(desc(publications.publishedDate || publications.createdAt));
    }),

  // Public: Get single publication
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(publications).where(eq(publications.id, input.id))
      );
      return result || null;
    }),

  // Admin: List all publications
  list: protectedProcedure
    .input(z.object({ 
      clientId: z.string(),
      type: z.enum(['newspaper', 'journal', 'collection', 'methodological', 'electronic', 'article']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [eq(publications.clientId, input.clientId)];
      
      if (input.type) {
        conditions.push(eq(publications.type, input.type));
      }
      
      return await db.select()
        .from(publications)
        .where(and(...conditions))
        .orderBy(desc(publications.createdAt));
    }),

  // Admin: Create publication
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      type: z.enum(['newspaper', 'journal', 'collection', 'methodological', 'electronic', 'article']),
      titleRu: z.string(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      contentRu: z.string().optional(),
      contentKz: z.string().optional(),
      contentEn: z.string().optional(),
      fileUrl: z.string().optional(),
      imageUrl: z.string().optional(),
      issueNumber: z.string().optional(),
      publishedDate: z.date().optional(),
      published: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(publications).values({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update publication
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      type: z.enum(['newspaper', 'journal', 'collection', 'methodological', 'electronic', 'article']).optional(),
      titleRu: z.string().optional(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      contentRu: z.string().optional(),
      contentKz: z.string().optional(),
      contentEn: z.string().optional(),
      fileUrl: z.string().optional(),
      imageUrl: z.string().optional(),
      issueNumber: z.string().optional(),
      publishedDate: z.date().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      
      await db.update(publications)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(publications.id, id));
      
      return { success: true };
    }),

  // Admin: Delete publication
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(publications).where(eq(publications.id, input.id));
      return { success: true };
    }),
});
