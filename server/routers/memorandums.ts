import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { memorandums } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const memorandumsRouter = router({
  // Public: List all memorandums
  list: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db.select()
        .from(memorandums)
        .where(eq(memorandums.clientId, input.clientId))
        .orderBy(desc(memorandums.signedDate || memorandums.createdAt));
    }),

  // Public: Get single memorandum
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(memorandums).where(eq(memorandums.id, input.id))
      );
      return result || null;
    }),

  // Admin: Create memorandum
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      titleRu: z.string(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      goalsRu: z.string().optional(),
      goalsKz: z.string().optional(),
      goalsEn: z.string().optional(),
      participants: z.any().optional(), // JSON
      signatories: z.any().optional(), // JSON
      jointActivitiesResults: z.string().optional(),
      signedDate: z.date().optional(),
      documentUrl: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(memorandums).values({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update memorandum
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      titleRu: z.string().optional(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      goalsRu: z.string().optional(),
      goalsKz: z.string().optional(),
      goalsEn: z.string().optional(),
      participants: z.any().optional(),
      signatories: z.any().optional(),
      jointActivitiesResults: z.string().optional(),
      signedDate: z.date().optional(),
      documentUrl: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      
      await db.update(memorandums)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(memorandums.id, id));
      
      return { success: true };
    }),

  // Admin: Delete memorandum
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(memorandums).where(eq(memorandums.id, input.id));
      return { success: true };
    }),
});
