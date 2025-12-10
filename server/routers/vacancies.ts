import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { vacancies } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const vacanciesRouter = router({
  // Public: List active vacancies
  listActive: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(vacancies)
        .where(and(
          eq(vacancies.clientId, input.clientId),
          eq(vacancies.active, true)
        ))
        .orderBy(desc(vacancies.createdAt));
      return result;
    }),

  // Admin: List all vacancies
  list: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(vacancies)
        .where(eq(vacancies.clientId, input.clientId))
        .orderBy(desc(vacancies.createdAt));
      return result;
    }),

  // Admin: Get vacancy by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(vacancies)
        .where(eq(vacancies.id, input.id))
        .get();
      return result || null;
    }),

  // Admin: Create vacancy
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      title: z.string(),
      description: z.string().optional(),
      requirements: z.string().optional(),
      salary: z.string().optional(),
      active: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      await db.insert(vacancies).values({
        id,
        ...input,
      });
      return { id };
    }),

  // Admin: Update vacancy
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      requirements: z.string().optional(),
      salary: z.string().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await db.update(vacancies)
        .set(data)
        .where(eq(vacancies.id, id));
      return { success: true };
    }),

  // Admin: Delete vacancy
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(vacancies).where(eq(vacancies.id, input.id));
      return { success: true };
    }),
});


