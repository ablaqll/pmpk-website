import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { governmentManagement } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const governmentManagementRouter = router({
  // Public: List published government management content
  listPublished: publicProcedure
    .input(z.object({ 
      clientId: z.string(),
      section: z.enum(['budget', 'procurement', 'anti_corruption', 'public_services']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [
        eq(governmentManagement.clientId, input.clientId),
        eq(governmentManagement.published, true)
      ];
      
      if (input.section) {
        conditions.push(eq(governmentManagement.section, input.section));
      }
      
      return await db.select()
        .from(governmentManagement)
        .where(and(...conditions))
        .orderBy(desc(governmentManagement.createdAt));
    }),

  // Public: Get single government management content
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(governmentManagement).where(eq(governmentManagement.id, input.id))
      );
      return result || null;
    }),

  // Admin: List all government management content
  list: protectedProcedure
    .input(z.object({ 
      clientId: z.string(),
      section: z.enum(['budget', 'procurement', 'anti_corruption', 'public_services']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [eq(governmentManagement.clientId, input.clientId)];
      
      if (input.section) {
        conditions.push(eq(governmentManagement.section, input.section));
      }
      
      return await db.select()
        .from(governmentManagement)
        .where(and(...conditions))
        .orderBy(desc(governmentManagement.createdAt));
    }),

  // Admin: Create government management content
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      section: z.enum(['budget', 'procurement', 'anti_corruption', 'public_services']),
      titleRu: z.string(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      contentRu: z.string().optional(),
      contentKz: z.string().optional(),
      contentEn: z.string().optional(),
      documentUrl: z.string().optional(),
      externalUrl: z.string().optional(),
      hotline: z.string().optional(), // For anti-corruption section
      published: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(governmentManagement).values({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update government management content
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      section: z.enum(['budget', 'procurement', 'anti_corruption', 'public_services']).optional(),
      titleRu: z.string().optional(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      contentRu: z.string().optional(),
      contentKz: z.string().optional(),
      contentEn: z.string().optional(),
      documentUrl: z.string().optional(),
      externalUrl: z.string().optional(),
      hotline: z.string().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      
      await db.update(governmentManagement)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(governmentManagement.id, id));
      
      return { success: true };
    }),

  // Admin: Delete government management content
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(governmentManagement).where(eq(governmentManagement.id, input.id));
      return { success: true };
    }),
});
