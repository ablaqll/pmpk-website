import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { events } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const eventsRouter = router({
  // Public: List published events
  listPublished: publicProcedure
    .input(z.object({ 
      clientId: z.string(),
      type: z.enum(['conference', 'seminar', 'challenge']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [
        eq(events.clientId, input.clientId),
        eq(events.published, true)
      ];
      
      if (input.type) {
        conditions.push(eq(events.type, input.type));
      }
      
      return await db.select()
        .from(events)
        .where(and(...conditions))
        .orderBy(desc(events.startDate || events.createdAt));
    }),

  // Public: Get single event
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(events).where(eq(events.id, input.id))
      );
      return result || null;
    }),

  // Admin: List all events
  list: protectedProcedure
    .input(z.object({ 
      clientId: z.string(),
      type: z.enum(['conference', 'seminar', 'challenge']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [eq(events.clientId, input.clientId)];
      
      if (input.type) {
        conditions.push(eq(events.type, input.type));
      }
      
      return await db.select()
        .from(events)
        .where(and(...conditions))
        .orderBy(desc(events.createdAt));
    }),

  // Admin: Create event
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      type: z.enum(['conference', 'seminar', 'challenge']),
      titleRu: z.string(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      programRu: z.string().optional(),
      programKz: z.string().optional(),
      programEn: z.string().optional(),
      schedule: z.any().optional(), // JSON
      participants: z.any().optional(), // JSON
      participationConditionsRu: z.string().optional(),
      participationConditionsKz: z.string().optional(),
      participationConditionsEn: z.string().optional(),
      photoReports: z.any().optional(), // JSON array
      videoReports: z.any().optional(), // JSON array
      winners: z.any().optional(), // JSON
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      published: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(events).values({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update event
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      type: z.enum(['conference', 'seminar', 'challenge']).optional(),
      titleRu: z.string().optional(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      descriptionRu: z.string().optional(),
      descriptionKz: z.string().optional(),
      descriptionEn: z.string().optional(),
      programRu: z.string().optional(),
      programKz: z.string().optional(),
      programEn: z.string().optional(),
      schedule: z.any().optional(),
      participants: z.any().optional(),
      participationConditionsRu: z.string().optional(),
      participationConditionsKz: z.string().optional(),
      participationConditionsEn: z.string().optional(),
      photoReports: z.any().optional(),
      videoReports: z.any().optional(),
      winners: z.any().optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      
      await db.update(events)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(events.id, id));
      
      return { success: true };
    }),

  // Admin: Delete event
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(events).where(eq(events.id, input.id));
      return { success: true };
    }),
});
