import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { attestations } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const attestationsRouter = router({
  // Public: List all attestations
  list: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db.select()
        .from(attestations)
        .where(eq(attestations.clientId, input.clientId))
        .orderBy(desc(attestations.attestationDate || attestations.createdAt));
    }),

  // Public: Get single attestation
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(attestations).where(eq(attestations.id, input.id))
      );
      return result || null;
    }),

  // Admin: Create attestation
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      titleRu: z.string(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      documentUrl: z.string().optional(),
      protocolUrl: z.string().optional(),
      results: z.string().optional(),
      attestationDate: z.date().optional(),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(attestations).values({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update attestation
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      titleRu: z.string().optional(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      documentUrl: z.string().optional(),
      protocolUrl: z.string().optional(),
      results: z.string().optional(),
      attestationDate: z.date().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      
      await db.update(attestations)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(attestations.id, id));
      
      return { success: true };
    }),

  // Admin: Delete attestation
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(attestations).where(eq(attestations.id, input.id));
      return { success: true };
    }),
});
