import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || import.meta.env.VITE_SANITY_PROJECT_ID || '10jnk8h0',
  dataset: process.env.VITE_SANITY_DATASET || import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Set to false if statically generating pages, using ISR or using the on-demand revalidation API
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) to target the latest API version
});
