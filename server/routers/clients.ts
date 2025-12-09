import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { clients } from '../db/schema';
import { eq } from 'drizzle-orm';

export const clientsRouter = router({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const result = await db.select().from(clients).where(eq(clients.slug, input.slug)).get();
      return result || null;
    }),
  
  list: publicProcedure.query(async () => {
    return await db.select().from(clients).all();
  }),
});

