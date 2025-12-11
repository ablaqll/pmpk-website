import { defineType, defineField } from 'sanity';

export const vacancy = defineType({
  name: 'vacancy',
  title: 'Vacancy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: 'Russian',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        },
        {
          name: 'kz',
          title: 'Kazakh',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'qualificationRequirements',
      title: 'Qualification Requirements',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: 'Russian',
          type: 'text',
        },
        {
          name: 'kz',
          title: 'Kazakh',
          type: 'text',
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'enbekLink',
      title: 'Link to enbek.kz',
      type: 'url',
      description: 'Link to the vacancy on enbek.kz portal',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title.ru',
      active: 'active',
    },
    prepare({ title, active }) {
      return {
        title: title || 'Untitled',
        subtitle: active ? 'Active' : 'Inactive',
      };
    },
  },
});
