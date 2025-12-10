import { sql } from 'drizzle-orm';

// Check if we're using PostgreSQL or SQLite
const isPostgres = process.env.DATABASE_URL || process.env.NODE_ENV === 'production';

// Import appropriate table creators
let pgTable: any, pgText: any, pgInteger: any, pgTimestamp: any, pgBoolean: any, pgJson: any;
let sqliteTable: any, sqliteText: any, sqliteInteger: any;

if (isPostgres) {
  const pg = await import('drizzle-orm/pg-core');
  pgTable = pg.pgTable;
  pgText = pg.text;
  pgInteger = pg.integer;
  pgTimestamp = pg.timestamp;
  pgBoolean = pg.boolean;
  pgJson = pg.jsonb;
} else {
  const sqlite = await import('drizzle-orm/sqlite-core');
  sqliteTable = sqlite.sqliteTable;
  sqliteText = sqlite.text;
  sqliteInteger = sqlite.integer;
}

// Helper to create tables that work with both databases
const Table = isPostgres ? pgTable : sqliteTable;
const Text = isPostgres ? pgText : sqliteText;
const Integer = isPostgres ? pgInteger : sqliteInteger;
const Timestamp = isPostgres ? pgTimestamp : sqliteInteger;
const Boolean = isPostgres ? pgBoolean : sqliteInteger;
const Json = isPostgres ? pgJson : sqliteText;

// Helper for default timestamps
const defaultTimestamp = () => {
  if (isPostgres) {
    return (pgTimestamp as any)('created_at').defaultNow();
  } else {
    return (sqliteInteger as any)('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`);
  }
};

// Users table - Admin authentication
export const users = Table('users', {
  id: Text('id').primaryKey(),
  email: Text('email').notNull().unique(),
  name: Text('name'),
  role: Text('role').$type<'admin' | 'editor'>().default('editor'),
  password: Text('password'),
  createdAt: Timestamp('created_at').defaultNow(),
});

// Clients/Organizations table
export const clients = Table('clients', {
  id: Text('id').primaryKey(),
  slug: Text('slug').notNull().unique(),
  nameRu: Text('name_ru'),
  nameKz: Text('name_kz'),
  nameEn: Text('name_en'),
  description: Text('description'),
  logo: Text('logo'),
  phone: Text('phone'),
  email: Text('email'),
  address: Text('address'),
  hotline: Text('hotline'),
  socialLinks: Json('social_links'),
  createdAt: Timestamp('created_at').defaultNow(),
});

// News table - News, press releases, announcements
export const news = Table('news', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  category: Text('category').$type<'news' | 'press_release' | 'announcement'>().notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  contentRu: Text('content_ru'),
  contentKz: Text('content_kz'),
  contentEn: Text('content_en'),
  imageUrl: Text('image_url'),
  published: Boolean('published').default(false),
  publishedAt: Timestamp('published_at'),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Staff table - Employee directory
export const staff = Table('staff', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  nameRu: Text('name_ru').notNull(),
  nameKz: Text('name_kz'),
  nameEn: Text('name_en'),
  positionRu: Text('position_ru'),
  positionKz: Text('position_kz'),
  positionEn: Text('position_en'),
  departmentRu: Text('department_ru'),
  departmentKz: Text('department_kz'),
  departmentEn: Text('department_en'),
  email: Text('email'),
  phone: Text('phone'),
  photoUrl: Text('photo_url'),
  bioRu: Text('bio_ru'),
  bioKz: Text('bio_kz'),
  bioEn: Text('bio_en'),
  active: Boolean('active').default(true),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Events table - Conferences, Seminars, Challenges
export const events = Table('events', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  type: Text('type').$type<'conference' | 'seminar' | 'challenge'>().notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  descriptionRu: Text('description_ru'),
  descriptionKz: Text('description_kz'),
  descriptionEn: Text('description_en'),
  programRu: Text('program_ru'), // JSON or text for conference/seminar program
  programKz: Text('program_kz'),
  programEn: Text('program_en'),
  schedule: Json('schedule'), // JSON for event schedule
  participants: Json('participants'), // Array of participants with presentation topics
  participationConditionsRu: Text('participation_conditions_ru'), // For challenges
  participationConditionsKz: Text('participation_conditions_kz'),
  participationConditionsEn: Text('participation_conditions_en'),
  photoReports: Json('photo_reports'), // Array of photo URLs
  videoReports: Json('video_reports'), // Array of video URLs
  winners: Json('winners'), // Array of winners and awards
  startDate: Timestamp('start_date'),
  endDate: Timestamp('end_date'),
  published: Boolean('published').default(false),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Memorandums table - Cooperation agreements
export const memorandums = Table('memorandums', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  descriptionRu: Text('description_ru'),
  descriptionKz: Text('description_kz'),
  descriptionEn: Text('description_en'),
  goalsRu: Text('goals_ru'), // Goals and directions of cooperation
  goalsKz: Text('goals_kz'),
  goalsEn: Text('goals_en'),
  participants: Json('participants'), // Array of participant organizations
  signatories: Json('signatories'), // Array of signatories
  jointActivitiesResults: Text('joint_activities_results'), // Results of joint activities
  signedDate: Timestamp('signed_date'),
  documentUrl: Text('document_url'), // Link to memorandum document
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Publications table - Newspapers, journals, collections
export const publications = Table('publications', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  type: Text('type').$type<'newspaper' | 'journal' | 'collection' | 'methodological' | 'electronic' | 'article'>().notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  descriptionRu: Text('description_ru'),
  descriptionKz: Text('description_kz'),
  descriptionEn: Text('description_en'),
  contentRu: Text('content_ru'),
  contentKz: Text('content_kz'),
  contentEn: Text('content_en'),
  fileUrl: Text('file_url'),
  imageUrl: Text('image_url'),
  issueNumber: Text('issue_number'),
  publishedDate: Timestamp('published_date'),
  published: Boolean('published').default(false),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Attestation table - Attestation documentation
export const attestations = Table('attestations', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  descriptionRu: Text('description_ru'),
  descriptionKz: Text('description_kz'),
  descriptionEn: Text('description_en'),
  documentUrl: Text('document_url'),
  protocolUrl: Text('protocol_url'),
  results: Text('results'), // Attestation results
  attestationDate: Timestamp('attestation_date'),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Documents table - Charter, legal acts, etc.
export const documents = Table('documents', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  category: Text('category').$type<'charter' | 'law' | 'code' | 'order' | 'resolution' | 'methodological_guideline' | 'budget_plan' | 'budget_report' | 'anti_corruption' | 'public_service' | 'other'>().notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  descriptionRu: Text('description_ru'),
  descriptionKz: Text('description_kz'),
  descriptionEn: Text('description_en'),
  fileUrl: Text('file_url'),
  externalUrl: Text('external_url'), // For links to adilet.zan.kz, etc.
  fileSize: Integer('file_size'),
  published: Boolean('published').default(false),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Vacancies table - Job postings
export const vacancies = Table('vacancies', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  descriptionRu: Text('description_ru'),
  descriptionKz: Text('description_kz'),
  descriptionEn: Text('description_en'),
  requirementsRu: Text('requirements_ru'),
  requirementsKz: Text('requirements_kz'),
  requirementsEn: Text('requirements_en'),
  enbekUrl: Text('enbek_url'), // Link to enbek.kz
  active: Boolean('active').default(true),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Feedback table - Q&A and general feedback
export const feedback = Table('feedback', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  type: Text('type').$type<'question' | 'suggestion' | 'complaint' | 'general'>().default('general'),
  name: Text('name'),
  email: Text('email'),
  phone: Text('phone'),
  subjectRu: Text('subject_ru'),
  subjectKz: Text('subject_kz'),
  subjectEn: Text('subject_en'),
  messageRu: Text('message_ru').notNull(),
  messageKz: Text('message_kz'),
  messageEn: Text('message_en'),
  answerRu: Text('answer_ru'),
  answerKz: Text('answer_kz'),
  answerEn: Text('answer_en'),
  status: Text('status').$type<'new' | 'in_progress' | 'answered' | 'closed'>().default('new'),
  answeredAt: Timestamp('answered_at'),
  answeredBy: Text('answered_by'), // User ID who answered
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Reception schedule table - Personal reception schedule
export const receptionSchedule = Table('reception_schedule', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  personRu: Text('person_ru').notNull(), // Leader or deputy name
  personKz: Text('person_kz'),
  personEn: Text('person_en'),
  positionRu: Text('position_ru'),
  positionKz: Text('position_kz'),
  positionEn: Text('position_en'),
  scheduleRu: Text('schedule_ru'), // Reception schedule description
  scheduleKz: Text('schedule_kz'),
  scheduleEn: Text('schedule_en'),
  dayOfWeek: Integer('day_of_week'), // 0-6 (Sunday-Saturday)
  startTime: Text('start_time'), // HH:mm format
  endTime: Text('end_time'), // HH:mm format
  locationRu: Text('location_ru'),
  locationKz: Text('location_kz'),
  locationEn: Text('location_en'),
  active: Boolean('active').default(true),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Leader's blog table
export const leaderBlog = Table('leader_blog', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  contentRu: Text('content_ru').notNull(),
  contentKz: Text('content_kz'),
  contentEn: Text('content_en'),
  imageUrl: Text('image_url'),
  published: Boolean('published').default(false),
  publishedAt: Timestamp('published_at'),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// State symbols table
export const stateSymbols = Table('state_symbols', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  flagUrl: Text('flag_url'),
  emblemUrl: Text('emblem_url'),
  anthemTextRu: Text('anthem_text_ru'),
  anthemTextKz: Text('anthem_text_kz'),
  anthemTextEn: Text('anthem_text_en'),
  anthemAudioUrl: Text('anthem_audio_url'),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

// Government management content table
export const governmentManagement = Table('government_management', {
  id: Text('id').primaryKey(),
  clientId: Text('client_id').notNull(),
  section: Text('section').$type<'budget' | 'procurement' | 'anti_corruption' | 'public_services'>().notNull(),
  titleRu: Text('title_ru').notNull(),
  titleKz: Text('title_kz'),
  titleEn: Text('title_en'),
  contentRu: Text('content_ru'),
  contentKz: Text('content_kz'),
  contentEn: Text('content_en'),
  documentUrl: Text('document_url'), // For budget plans/reports, anti-corruption code, etc.
  externalUrl: Text('external_url'), // For goszakup.gov.kz link, etc.
  hotline: Text('hotline'), // For anti-corruption section
  published: Boolean('published').default(false),
  createdAt: Timestamp('created_at').defaultNow(),
  updatedAt: Timestamp('updated_at').defaultNow(),
});

export const schema = {
  users,
  clients,
  news,
  staff,
  events,
  memorandums,
  publications,
  attestations,
  documents,
  vacancies,
  feedback,
  receptionSchedule,
  leaderBlog,
  stateSymbols,
  governmentManagement,
};
