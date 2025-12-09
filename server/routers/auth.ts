import { router, publicProcedure } from '../trpc';

export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  logout: publicProcedure.mutation(async () => {
    return { success: true };
  }),
});

