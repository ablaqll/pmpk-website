import { defineType, defineField } from 'sanity';

export const legalAct = defineType({
  name: 'legalAct',
  title: 'Legal Acts (НПА РК)',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Law', value: 'law' },
          { title: 'Code', value: 'code' },
          { title: 'Order', value: 'order' },
          { title: 'Resolution', value: 'resolution' },
          { title: 'Methodological Guideline', value: 'methodological_guideline' },
        ],
      },
    }),
    defineField({
      name: 'externalLink',
      title: 'Link to adilet.zan.kz',
      type: 'url',
      description: 'Link to the legal act on adilet.zan.kz',
    }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
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
      category: 'category',
    },
    prepare({ title, category }) {
      return {
        title: title || 'Untitled',
        subtitle: category || 'Legal Act',
      };
    },
  },
});
