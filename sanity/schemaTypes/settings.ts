import { defineType, defineField } from 'sanity';

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  __experimental_formPreviewTitle: false,
  fields: [
    // Footer/Contact Information
    defineField({
      name: 'organizationName',
      title: 'Organization Name',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: 'Russian',
          type: 'string',
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
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phones',
      title: 'Phone Numbers',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'hotline',
      title: 'Hotline (Телефон доверия)',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
      ],
    }),
    
    // Main Page Settings
    defineField({
      name: 'stateSymbols',
      title: 'State Symbols (Mandatory)',
      type: 'object',
      fields: [
        {
          name: 'flagUrl',
          title: 'Flag Image URL',
          type: 'string',
        },
        {
          name: 'emblemUrl',
          title: 'Emblem Image URL',
          type: 'string',
        },
        {
          name: 'anthemText',
          title: 'Anthem Text',
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
        },
        {
          name: 'anthemAudioUrl',
          title: 'Anthem Audio URL',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'organizationName.ru',
    },
    prepare({ title }) {
      return {
        title: title || 'Settings',
      };
    },
  },
});
