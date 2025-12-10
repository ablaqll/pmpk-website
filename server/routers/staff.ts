import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { staff } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const staffRouter = router({
  // Public: List active staff
  listActive: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db.select()
        .from(staff)
        .where(and(
          eq(staff.clientId, input.clientId),
          eq(staff.active, true)
        ))
        .orderBy(desc(staff.createdAt));
    }),

  // Admin: List all staff
  list: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db.select()
        .from(staff)
        .where(eq(staff.clientId, input.clientId))
        .orderBy(desc(staff.createdAt));
    }),

  // Admin: Get staff by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(staff).where(eq(staff.id, input.id))
      );
      return result || null;
    }),

  // Admin: Create staff
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      nameRu: z.string(),
      nameKz: z.string().optional(),
      nameEn: z.string().optional(),
      positionRu: z.string(),
      positionKz: z.string().optional(),
      positionEn: z.string().optional(),
      departmentRu: z.string().optional(),
      departmentKz: z.string().optional(),
      departmentEn: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      photoUrl: z.string().optional(),
      bioRu: z.string().optional(),
      bioKz: z.string().optional(),
      bioEn: z.string().optional(),
      active: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(staff).values({
        id,
        ...input,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update staff
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      nameRu: z.string().optional(),
      nameKz: z.string().optional(),
      nameEn: z.string().optional(),
      positionRu: z.string().optional(),
      positionKz: z.string().optional(),
      positionEn: z.string().optional(),
      departmentRu: z.string().optional(),
      departmentKz: z.string().optional(),
      departmentEn: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      photoUrl: z.string().optional(),
      bioRu: z.string().optional(),
      bioKz: z.string().optional(),
      bioEn: z.string().optional(),
      active: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      
      await db.update(staff)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(staff.id, id));
      
      return { success: true };
    }),

  // Admin: Delete staff
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(staff).where(eq(staff.id, input.id));
      return { success: true };
    }),
});
