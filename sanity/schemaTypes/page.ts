import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: 'Russian',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'kz',
          title: 'Kazakh',
          type: 'string',
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.ru',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'About PMPK', value: 'about' },
          { title: 'Structure', value: 'structure' },
          { title: 'Charter (Устав)', value: 'charter' },
          { title: 'Attestation', value: 'attestation' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hero',
          title: 'Hero Section',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'object',
              fields: [
                { name: 'ru', type: 'string', title: 'Russian' },
                { name: 'kz', type: 'string', title: 'Kazakh' },
                { name: 'en', type: 'string', title: 'English' },
              ],
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'object',
              fields: [
                { name: 'ru', type: 'text', title: 'Russian' },
                { name: 'kz', type: 'text', title: 'Kazakh' },
                { name: 'en', type: 'text', title: 'English' },
              ],
            },
            {
              name: 'image',
              title: 'Hero Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: {
              title: 'title.ru',
            },
            prepare({ title }) {
              return {
                title: title || 'Hero Section',
                media: '🎯',
              };
            },
          },
        },
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text Block',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'object',
              fields: [
                {
                  name: 'ru',
                  title: 'Russian',
                  type: 'array',
                  of: [{ type: 'block' }],
                },
                {
                  name: 'kz',
                  title: 'Kazakh',
                  type: 'array',
                  of: [{ type: 'block' }],
                },
                {
                  name: 'en',
                  title: 'English',
                  type: 'array',
                  of: [{ type: 'block' }],
                },
              ],
            },
          ],
          preview: {
            select: {
              content: 'content.ru',
            },
            prepare({ content }) {
              const text = content?.[0]?.children?.[0]?.text || 'Text Block';
              return {
                title: text.substring(0, 50),
                media: '📝',
              };
            },
          },
        },
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image Block',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'object',
              fields: [
                { name: 'ru', type: 'string', title: 'Russian' },
                { name: 'kz', type: 'string', title: 'Kazakh' },
                { name: 'en', type: 'string', title: 'English' },
              ],
            },
          ],
          preview: {
            select: {
              media: 'image',
              caption: 'caption.ru',
            },
            prepare({ media, caption }) {
              return {
                title: caption || 'Image Block',
                media,
              };
            },
          },
        },
        {
          type: 'object',
          name: 'fileDownload',
          title: 'File Download',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'object',
              fields: [
                { name: 'ru', type: 'string', title: 'Russian' },
                { name: 'kz', type: 'string', title: 'Kazakh' },
                { name: 'en', type: 'string', title: 'English' },
              ],
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'ru', type: 'text', title: 'Russian' },
                { name: 'kz', type: 'text', title: 'Kazakh' },
                { name: 'en', type: 'text', title: 'English' },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title.ru',
            },
            prepare({ title }) {
              return {
                title: title || 'File Download',
                media: '📄',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title.ru',
      pageType: 'pageType',
      published: 'published',
    },
    prepare({ title, pageType, published }) {
      return {
        title: title || 'Untitled',
        subtitle: `${pageType || 'page'} • ${published ? 'Published' : 'Draft'}`,
      };
    },
  },
});
