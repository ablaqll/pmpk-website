import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { staff } from '../db/schema';
import { eq } from 'drizzle-orm';

export const staffRouter = router({
  listActive: publicProcedure
    .input(z.object({ clientId: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(staff)
        .where(eq(staff.clientId, input.clientId))
        .all();
    }),
});

