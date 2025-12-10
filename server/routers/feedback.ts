import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { feedback } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const feedbackRouter = router({
  // Public: Submit feedback
  create: publicProcedure
    .input(z.object({
      clientId: z.string(),
      name: z.string(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      message: z.string(),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      await db.insert(feedback).values({
        id,
        ...input,
        status: 'pending',
      });
      return { success: true, id };
    }),

  // Admin: List all feedback
  list: protectedProcedure
    .input(z.object({ 
      clientId: z.string(),
      status: z.enum(['pending', 'answered', 'archived']).optional(),
    }))
    .query(async ({ input }) => {
      const conditions = [eq(feedback.clientId, input.clientId)];
      
      if (input.status) {
        conditions.push(eq(feedback.status, input.status));
      }

      const result = await db
        .select()
        .from(feedback)
        .where(and(...conditions))
        .orderBy(desc(feedback.createdAt));
      return result;
    }),

  // Admin: Get feedback by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await db
        .select()
        .from(feedback)
        .where(eq(feedback.id, input.id))
        .get();
      return result || null;
    }),

  // Admin: Update feedback status
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['pending', 'answered', 'archived']),
    }))
    .mutation(async ({ input }) => {
      await db.update(feedback)
        .set({ status: input.status })
        .where(eq(feedback.id, input.id));
      return { success: true };
    }),

  // Admin: Delete feedback
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(feedback).where(eq(feedback.id, input.id));
      return { success: true };
    }),
});


