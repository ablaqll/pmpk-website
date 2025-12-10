import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { db, queryFirst } from '../db';
import { leaderBlog } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export const leaderBlogRouter = router({
  // Public: List published blog posts
  listPublished: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db.select()
        .from(leaderBlog)
        .where(and(
          eq(leaderBlog.clientId, input.clientId),
          eq(leaderBlog.published, true)
        ))
        .orderBy(desc(leaderBlog.publishedAt || leaderBlog.createdAt));
    }),

  // Public: Get single blog post
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await queryFirst(
        db.select().from(leaderBlog).where(eq(leaderBlog.id, input.id))
      );
      return result || null;
    }),

  // Admin: List all blog posts
  list: protectedProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db.select()
        .from(leaderBlog)
        .where(eq(leaderBlog.clientId, input.clientId))
        .orderBy(desc(leaderBlog.createdAt));
    }),

  // Admin: Create blog post
  create: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      titleRu: z.string(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      contentRu: z.string(),
      contentKz: z.string().optional(),
      contentEn: z.string().optional(),
      imageUrl: z.string().optional(),
      published: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const id = uuidv4();
      const now = new Date();
      
      await db.insert(leaderBlog).values({
        id,
        ...input,
        publishedAt: input.published ? now : null,
        createdAt: now,
        updatedAt: now,
      });
      
      return { id };
    }),

  // Admin: Update blog post
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      titleRu: z.string().optional(),
      titleKz: z.string().optional(),
      titleEn: z.string().optional(),
      contentRu: z.string().optional(),
      contentKz: z.string().optional(),
      contentEn: z.string().optional(),
      imageUrl: z.string().optional(),
      published: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const updateData: any = { ...data, updatedAt: new Date() };
      
      // If publishing for first time, set publishedAt
      if (input.published === true) {
        const existing = await queryFirst(
          db.select().from(leaderBlog).where(eq(leaderBlog.id, id))
        );
        if (existing && !existing.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
      
      await db.update(leaderBlog)
        .set(updateData)
        .where(eq(leaderBlog.id, id));
      
      return { success: true };
    }),

  // Admin: Delete blog post
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await db.delete(leaderBlog).where(eq(leaderBlog.id, input.id));
      return { success: true };
    }),
});
