import { router } from '../trpc';
import { authRouter } from './auth';
import { clientsRouter } from './clients';
import { newsRouter } from './news';
import { staffRouter } from './staff';
import { vacanciesRouter } from './vacancies';
import { documentsRouter } from './documents';
import { feedbackRouter } from './feedback';

export const appRouter = router({
  auth: authRouter,
  clients: clientsRouter,
  news: newsRouter,
  staff: staffRouter,
  vacancies: vacanciesRouter,
  documents: documentsRouter,
  feedback: feedbackRouter,
});

export type AppRouter = typeof appRouter;

