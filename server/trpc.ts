import { initTRPC, TRPCError } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import superjson from 'superjson';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export const createContext = async ({ req, res }: CreateFastifyContextOptions) => {
  const userId = req.headers['x-user-id'] as string;
  let user = null;

  if (userId) {
    try {
      const dbUser = await db.select().from(users).where(eq(users.id, userId)).get();
      if (dbUser) {
        user = {
          id: dbUser.id,
          role: dbUser.role,
          name: dbUser.name,
          email: dbUser.email,
          clientId: dbUser.clientId
        };
      }
    } catch (e) {
      console.error('Auth error', e);
    }
  }
  
  return {
    req,
    res,
    user, 
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC with superjson transformer (must match client)
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
   if (!ctx.user) {
     throw new TRPCError({ code: 'UNAUTHORIZED' });
   }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});
