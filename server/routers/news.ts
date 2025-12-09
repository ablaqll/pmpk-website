import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { news } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

export const newsRouter = router({
  listPublished: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(news)
        .where(eq(news.clientId, input.clientId))
        .orderBy(desc(news.createdAt))
        .all();
    }),
});

