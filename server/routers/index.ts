import { router } from '../trpc';
import { authRouter } from './auth';
import { clientsRouter } from './clients';
import { newsRouter } from './news';
import { staffRouter } from './staff';

export const appRouter = router({
  auth: authRouter,
  clients: clientsRouter,
  news: newsRouter,
  staff: staffRouter,
});

export type AppRouter = typeof appRouter;

