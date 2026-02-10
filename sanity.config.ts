import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'pmpk-website',
  title: 'PMPK Website CMS',

  projectId: process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || '10jnk8h0',
  dataset: process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production',

  basePath: '/studio', // Studio will be available at /studio

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton for settings
            S.listItem()
              .title('Settings')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
              ),
            // Singleton for Director Profile
            S.listItem()
              .title('Director Profile')
              .id('director')
              .child(
                S.document()
                  .schemaType('director')
                  .documentId('director')
              ),
            S.divider(),
            // Regular document types
            ...S.documentTypeListItems().filter(
              (listItem) => !['settings', 'director'].includes(listItem.getId() || '')
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
