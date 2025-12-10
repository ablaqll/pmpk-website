import { router } from '../trpc';
import { authRouter } from './auth';
import { clientsRouter } from './clients';
import { newsRouter } from './news';
import { staffRouter } from './staff';
import { eventsRouter } from './events';
import { memorandumsRouter } from './memorandums';
import { publicationsRouter } from './publications';
import { attestationsRouter } from './attestations';
import { documentsRouter } from './documents';
import { vacanciesRouter } from './vacancies';
import { feedbackRouter } from './feedback';
import { leaderBlogRouter } from './leaderBlog';
import { receptionScheduleRouter } from './receptionSchedule';
import { governmentManagementRouter } from './governmentManagement';

export const appRouter = router({
  auth: authRouter,
  clients: clientsRouter,
  news: newsRouter,
  staff: staffRouter,
  events: eventsRouter,
  memorandums: memorandumsRouter,
  publications: publicationsRouter,
  attestations: attestationsRouter,
  documents: documentsRouter,
  vacancies: vacanciesRouter,
  feedback: feedbackRouter,
  leaderBlog: leaderBlogRouter,
  receptionSchedule: receptionScheduleRouter,
  governmentManagement: governmentManagementRouter,
});

export type AppRouter = typeof appRouter;
