import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { hashPassword, verifyPassword } from '../utils/password';

export const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  
  login: publicProcedure
    .input(z.object({ 
      email: z.string().min(1, 'Email is required'), 
      password: z.string().min(1, 'Password is required') 
    }))
    .mutation(async ({ input, ctx }) => {
      // Find user by email (or username)
      const user = await db.select().from(users).where(eq(users.email, input.email)).get();
      
      if (!user) {
        // Use same error message for both cases to prevent user enumeration
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }
      
      // Verify password using bcrypt (constant-time comparison)
      const isValidPassword = await verifyPassword(input.password, user.password || '');
      
      if (!isValidPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }
      
      return { 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          role: user.role, 
          clientId: user.clientId 
        } 
      };
    }),
    
  logout: publicProcedure.mutation(async () => {
    return { success: true };
  }),
  
  // Change password endpoint
  changePassword: publicProcedure
    .input(z.object({
      userId: z.string(),
      currentPassword: z.string(),
      newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    }))
    .mutation(async ({ input }) => {
      const user = await db.select().from(users).where(eq(users.id, input.userId)).get();
      
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }
      
      // Verify current password
      const isValid = await verifyPassword(input.currentPassword, user.password || '');
      if (!isValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Current password is incorrect',
        });
      }
      
      // Hash and save new password
      const hashedPassword = await hashPassword(input.newPassword);
      await db.update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, input.userId));
      
      return { success: true };
    }),
});
