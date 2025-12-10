import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { documents } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const documentsRouter = router({
  // Public: List published documents
  listPublished: publicProcedure
    .input(z.object({ 
      clientId: z.string(),
      category: z.enum(['charter', 'law', 'code', 'order', 'resolution', 'methodological_guideline', 'budget_plan', 'budget_report', 'anti_corruption', 'public_service', 'other']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [
        eq(documents.clientId, input.clientId),
        eq(documents.published, true)
      ];
      
      if (input.category) {
        conditions.push(eq(documents.category, input.category));
      }
      
      return await db.select()
        .from(documents)
        .where(and(...conditions))
        .orderBy(desc(documents.createdAt));
    }),

  // Public: Get single document
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(documents).where(eq(documents.id, input.id))
      );
      return result || null;
    }),

  // Admin: List all documents
  list: protectedProcedure
    .input(z.object({ 
      clientId: z.string(),
      category: z.enum(['charter', 'law', 'code', 'order', 'resolution', 'methodological_guideline', 'budget_plan', 'budget_report', 'anti_corruption', 'public_service', 'other']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [eq(documents.clientId, input.clientId)];
      
      if (input.category) {
        conditions.push(eq(documents.category, input.category));
      }
      
      return await db.select()
        .from(documents)
        .where(and(...conditions))
        .orderBy(desc(documents.createdAt));
    }),

  // Admin: Create document
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      category: z.enum(['charter', 'law', 'code', 'order', 'resolution', 'methodological_guideline', 'budget_plan', 'budget_report', 'anti_corruption', 'public_service', 'other']),
      titleRu: z.string(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      fileUrl: z.string().optional(),
      externalUrl: z.string().optional(),
      fileSize: z.number().optional(),
      published: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(documents).values({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update document
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      category: z.enum(['charter', 'law', 'code', 'order', 'resolution', 'methodological_guideline', 'budget_plan', 'budget_report', 'anti_corruption', 'public_service', 'other']).optional(),
      titleRu: z.string().optional(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      fileUrl: z.string().optional(),
      externalUrl: z.string().optional(),
      fileSize: z.number().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      
      await db.update(documents)
        .set({ ...data, updatedAt: new Date() })
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
