import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { feedback } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const feedbackRouter = router({
  // Public: Submit feedback
  create: publicProcedure
    .input(z.object({
      clientId: z.string(),
      type: z.enum(['question', 'suggestion', 'complaint', 'general']).default('general'),
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      subjectRu: z.string().optional(),
      subjectKz: z.string().optional(),
      subjectEn: z.string().optional(),
      messageRu: z.string(),
      messageKz: z.string().optional(),
      messageEn: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(feedback).values({
        id,
        ...input,
        status: 'new',
        createdAt: now,
        updatedAt: now,
      });
      
      return { id, success: true };
    }),

  // Admin: List all feedback
  list: protectedProcedure
    .input(z.object({ 
      clientId: z.string(),
      status: z.enum(['new', 'in_progress', 'answered', 'closed']).optional()
    }))
    .query(async ({ input }) => {
      const conditions: any[] = [eq(feedback.clientId, input.clientId)];
      
      if (input.status) {
        conditions.push(eq(feedback.status, input.status));
      }
      
      return await db.select()
        .from(feedback)
        .where(and(...conditions))
        .orderBy(desc(feedback.createdAt));
    }),

  // Admin: Get feedback by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(feedback).where(eq(feedback.id, input.id))
      );
      return result || null;
    }),

  // Admin: Update feedback status and answer
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(['new', 'in_progress', 'answered', 'closed']).optional(),
      answerRu: z.string().optional(),
      answerKz: z.string().optional(),
      answerEn: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      const updateData: any = { ...data, updatedAt: new Date() };
      
      // If answering, set answeredAt and answeredBy
      if (input.status === 'answered' || (input.answerRu || input.answerKz || input.answerEn)) {
        updateData.status = input.status || 'answered';
        updateData.answeredAt = new Date();
        updateData.answeredBy = ctx.user?.id;
      }
      
      await db.update(feedback)
        .set(updateData)
        .where(eq(feedback.id, id));
      
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
