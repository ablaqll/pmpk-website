import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { receptionSchedule } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const receptionScheduleRouter = router({
  // Public: List active reception schedules
  listActive: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db.select()
        .from(receptionSchedule)
        .where(and(
          eq(receptionSchedule.clientId, input.clientId),
          eq(receptionSchedule.active, true)
        ))
        .orderBy(desc(receptionSchedule.createdAt));
    }),

  // Admin: List all reception schedules
  list: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db.select()
        .from(receptionSchedule)
        .where(eq(receptionSchedule.clientId, input.clientId))
        .orderBy(desc(receptionSchedule.createdAt));
    }),

  // Admin: Get reception schedule by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(receptionSchedule).where(eq(receptionSchedule.id, input.id))
      );
      return result || null;
    }),

  // Admin: Create reception schedule
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      personRu: z.string(),
      personKz: z.string().optional(),
      personEn: z.string().optional(),
      positionRu: z.string().optional(),
      positionKz: z.string().optional(),
      positionEn: z.string().optional(),
      scheduleRu: z.string().optional(),
      scheduleKz: z.string().optional(),
      scheduleEn: z.string().optional(),
      dayOfWeek: z.number().min(0).max(6).optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      locationRu: z.string().optional(),
      locationKz: z.string().optional(),
      locationEn: z.string().optional(),
      active: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(receptionSchedule).values({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update reception schedule
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      personRu: z.string().optional(),
      personKz: z.string().optional(),
      personEn: z.string().optional(),
      positionRu: z.string().optional(),
      positionKz: z.string().optional(),
      positionEn: z.string().optional(),
      scheduleRu: z.string().optional(),
      scheduleKz: z.string().optional(),
      scheduleEn: z.string().optional(),
      dayOfWeek: z.number().min(0).max(6).optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      locationRu: z.string().optional(),
      locationKz: z.string().optional(),
      locationEn: z.string().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      
      await db.update(receptionSchedule)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(receptionSchedule.id, id));
      
      return { success: true };
    }),

  // Admin: Delete reception schedule
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(receptionSchedule).where(eq(receptionSchedule.id, input.id));
      return { success: true };
    }),
});
