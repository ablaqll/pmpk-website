import { initTRPC, TRPCError } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  // In a real app, parse auth header here
  // const token = req.headers.authorization;
  // const user = verifyToken(token);
  
  // For demo, we'll fake a logged-in user if a specific header is present, or just leave null
  return {
    req,
    res,
    user: null as { id: string; role: string } | null, 
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  // if (!ctx.user) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }
  return next({
    ctx: {
      // ...ctx,
      // user: ctx.user,
    },
  });
});

