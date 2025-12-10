import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Find user by email (or username if we used 'admin' as email)
      const user = await db.select().from(users).where(eq(users.email, input.email)).get();
      
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }
      
      if (user.password !== input.password) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }
      
      return { 
        success: true, 
        user: { id: user.id, email: user.email, name: user.name, role: user.role, clientId: user.clientId } 
      };
    }),
  logout: publicProcedure.mutation(async () => {
    return { success: true };
  }),
});
