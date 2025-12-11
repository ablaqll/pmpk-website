import { defineType, defineField } from 'sanity';

export const feedback = defineType({
  name: 'feedback',
  title: 'Feedback (Q&A)',
  type: 'document',
  description: 'For manual Q&A entries. For user submissions, use birge.astana.kz or Google Forms.',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'object',
      fields: [
        {
          name: 'ru',
          title: 'Russian',
          type: 'text',
          validation: (Rule) => Rule.required(),
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
      name: 'answer',
      title: 'Answer',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Admission', value: 'admission' },
          { title: 'Services', value: 'services' },
          { title: 'Other', value: 'other' },
        ],
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
      question: 'question.ru',
      category: 'category',
      published: 'published',
    },
    prepare({ question, category, published }) {
      const q = question || 'Untitled Question';
      return {
        title: q.length > 60 ? q.substring(0, 60) + '...' : q,
        subtitle: `${category || 'general'} • ${published ? 'Published' : 'Draft'}`,
      };
    },
  },
});
