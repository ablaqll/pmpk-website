import groq from 'groq';
import { client } from '../client';

// Type definitions
export interface MultilingualText {
  ru?: string;
  kz?: string;
  en?: string;
}

export interface MultilingualRichText {
  ru?: any[];
  kz?: any[];
  en?: any[];
}

export interface Settings {
  _id: string;
  _type: 'settings';
  organizationName: MultilingualText;
  address?: string;
  phones?: string[];
  email?: string;
  hotline?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  stateSymbols?: {
    flagUrl?: string;
    emblemUrl?: string;
    anthemText?: MultilingualText;
    anthemAudioUrl?: string;
  };
}

export interface DirectorBlog {
  _id: string;
  _type: 'directorBlog';
  title: MultilingualText;
  slug: { current: string };
  publishDate: string;
  content: MultilingualRichText;
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  published?: boolean;
}

export interface News {
  _id: string;
  _type: 'news';
  title: MultilingualText;
  slug: { current: string };
  type: 'news' | 'press_release' | 'announcement';
  date: string;
  content: MultilingualRichText;
  mainImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  published?: boolean;
}

export interface LegalAct {
  _id: string;
  _type: 'legalAct';
  title: MultilingualText;
  category?: 'law' | 'code' | 'order' | 'resolution' | 'methodological_guideline';
  externalLink?: string;
  file?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  published?: boolean;
}

export interface StateGovernance {
  _id: string;
  _type: 'stateGovernance';
  section: 'budget' | 'procurement' | 'anti_corruption' | 'public_services';
  title: MultilingualText;
  content?: MultilingualRichText;
  budgetPlan?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  budgetReport?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  procurementLink?: string;
  codeOfHonor?: string;
  hotline?: string;
  antiCorruptionFile?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  admissionRules?: any[];
  requiredDocuments?: Array<{
    name: string;
    file?: {
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  }>;
  published?: boolean;
}

export interface Vacancy {
  _id: string;
  _type: 'vacancy';
  title: MultilingualText;
  slug: { current: string };
  description?: MultilingualRichText;
  qualificationRequirements?: MultilingualText;
  enbekLink?: string;
  active?: boolean;
}

export interface Page {
  _id: string;
  _type: 'page';
  title: MultilingualText;
  slug: { current: string };
  pageType: 'about' | 'structure' | 'charter' | 'attestation' | 'other';
  content?: any[];
  published?: boolean;
}

export interface Employee {
  _id: string;
  _type: 'employee';
  name: MultilingualText;
  photo?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  position: MultilingualText;
  department?: MultilingualText;
  bio?: MultilingualText;
  email?: string;
  phone?: string;
  active?: boolean;
  order?: number;
}

export interface Feedback {
  _id: string;
  _type: 'feedback';
  question: MultilingualText;
  answer?: MultilingualRichText;
  category?: 'general' | 'admission' | 'services' | 'other';
  published?: boolean;
}

// Query functions
export async function getSettings(): Promise<Settings | null> {
  const query = groq`*[_type == "settings"][0]`;
  return await client.fetch<Settings>(query);
}

export async function getDirectorBlogPosts(published: boolean = true): Promise<DirectorBlog[]> {
  const query = groq`*[_type == "directorBlog" ${published ? '&& published == true' : ''}] | order(publishDate desc) {
    _id,
    _type,
    title,
    slug,
    publishDate,
    content,
    mainImage,
    published
  }`;
  return await client.fetch<DirectorBlog[]>(query);
}

export async function getDirectorBlogPost(slug: string): Promise<DirectorBlog | null> {
  const query = groq`*[_type == "directorBlog" && slug.current == $slug && published == true][0] {
    _id,
    _type,
    title,
    slug,
    publishDate,
    content,
    mainImage,
    published
  }`;
  return await client.fetch<DirectorBlog | null>(query, { slug });
}

export async function getNews(
  type?: 'news' | 'press_release' | 'announcement',
  published: boolean = true
): Promise<News[]> {
  const typeFilter = type ? `&& type == "${type}"` : '';
  const query = groq`*[_type == "news" ${typeFilter} ${published ? '&& published == true' : ''}] | order(date desc) {
    _id,
    _type,
    title,
    slug,
    type,
    date,
    content,
    mainImage,
    published
  }`;
  return await client.fetch<News[]>(query);
}

export async function getNewsPost(slug: string): Promise<News | null> {
  const query = groq`*[_type == "news" && slug.current == $slug && published == true][0] {
    _id,
    _type,
    title,
    slug,
    type,
    date,
    content,
    mainImage,
    published
  }`;
  return await client.fetch<News | null>(query, { slug });
}

export async function getLegalActs(published: boolean = true): Promise<LegalAct[]> {
  const query = groq`*[_type == "legalAct" ${published ? '&& published == true' : ''}] | order(_createdAt desc) {
    _id,
    _type,
    title,
    category,
    externalLink,
    file,
    published
  }`;
  return await client.fetch<LegalAct[]>(query);
}

export async function getStateGovernance(
  section?: 'budget' | 'procurement' | 'anti_corruption' | 'public_services',
  published: boolean = true
): Promise<StateGovernance[]> {
  const sectionFilter = section ? `&& section == "${section}"` : '';
  const query = groq`*[_type == "stateGovernance" ${sectionFilter} ${published ? '&& published == true' : ''}] | order(_createdAt desc) {
    _id,
    _type,
    section,
    title,
    content,
    budgetPlan,
    budgetReport,
    procurementLink,
    codeOfHonor,
    hotline,
    antiCorruptionFile,
    admissionRules,
    requiredDocuments,
    published
  }`;
  return await client.fetch<StateGovernance[]>(query);
}

export async function getVacancies(active: boolean = true): Promise<Vacancy[]> {
  const query = groq`*[_type == "vacancy" ${active ? '&& active == true' : ''}] | order(_createdAt desc) {
    _id,
    _type,
    title,
    slug,
    description,
    qualificationRequirements,
    enbekLink,
    active
  }`;
  return await client.fetch<Vacancy[]>(query);
}

export async function getVacancy(slug: string): Promise<Vacancy | null> {
  const query = groq`*[_type == "vacancy" && slug.current == $slug && active == true][0] {
    _id,
    _type,
    title,
    slug,
    description,
    qualificationRequirements,
    enbekLink,
    active
  }`;
  return await client.fetch<Vacancy | null>(query, { slug });
}

export async function getPages(
  pageType?: 'about' | 'structure' | 'charter' | 'attestation' | 'other',
  published: boolean = true
): Promise<Page[]> {
  const typeFilter = pageType ? `&& pageType == "${pageType}"` : '';
  const query = groq`*[_type == "page" ${typeFilter} ${published ? '&& published == true' : ''}] | order(_createdAt desc) {
    _id,
    _type,
    title,
    slug,
    pageType,
    content,
    published
  }`;
  return await client.fetch<Page[]>(query);
}

export async function getPage(slug: string): Promise<Page | null> {
  const query = groq`*[_type == "page" && slug.current == $slug && published == true][0] {
    _id,
    _type,
    title,
    slug,
    pageType,
    content,
    published
  }`;
  return await client.fetch<Page | null>(query, { slug });
}

export async function getEmployees(active: boolean = true): Promise<Employee[]> {
  const query = groq`*[_type == "employee" ${active ? '&& active == true' : ''}] | order(order asc, _createdAt asc) {
    _id,
    _type,
    name,
    photo,
    position,
    department,
    bio,
    email,
    phone,
    active,
    order
  }`;
  return await client.fetch<Employee[]>(query);
}

export async function getFeedback(published: boolean = true): Promise<Feedback[]> {
  const query = groq`*[_type == "feedback" ${published ? '&& published == true' : ''}] | order(_createdAt desc) {
    _id,
    _type,
    question,
    answer,
    category,
    published
  }`;
  return await client.fetch<Feedback[]>(query);
}
