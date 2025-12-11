import { defineType, defineField } from 'sanity';

export const stateGovernance = defineType({
  name: 'stateGovernance',
  title: 'State Governance (Гос. Управление)',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Budget', value: 'budget' },
          { title: 'Procurement', value: 'procurement' },
          { title: 'Anti-Corruption', value: 'anti_corruption' },
          { title: 'Public Services', value: 'public_services' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
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
      name: 'content',
      title: 'Content',
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
            {
              type: 'image',
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
    // Budget section
    defineField({
      name: 'budgetPlan',
      title: 'Budget Plan (Annual)',
      type: 'file',
      options: {
        accept: '.pdf,.xlsx,.xls',
      },
      hidden: ({ document }) => document?.section !== 'budget',
    }),
    defineField({
      name: 'budgetReport',
      title: 'Budget Report',
      type: 'file',
      options: {
        accept: '.pdf,.xlsx,.xls',
      },
      hidden: ({ document }) => document?.section !== 'budget',
    }),
    // Procurement section
    defineField({
      name: 'procurementLink',
      title: 'Link to goszakup.gov.kz',
      type: 'url',
      hidden: ({ document }) => document?.section !== 'procurement',
    }),
    // Anti-corruption section
    defineField({
      name: 'codeOfHonor',
      title: 'Code of Honor',
      type: 'text',
      hidden: ({ document }) => document?.section !== 'anti_corruption',
    }),
    defineField({
      name: 'hotline',
      title: 'Hotline (Телефон доверия)',
      type: 'string',
      hidden: ({ document }) => document?.section !== 'anti_corruption',
    }),
    defineField({
      name: 'antiCorruptionFile',
      title: 'Anti-Corruption Document',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      hidden: ({ document }) => document?.section !== 'anti_corruption',
    }),
    // Public services section
    defineField({
      name: 'admissionRules',
      title: 'Admission Rules',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      hidden: ({ document }) => document?.section !== 'public_services',
    }),
    defineField({
      name: 'requiredDocuments',
      title: 'Required Documents List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Document Name',
              type: 'string',
            },
            {
              name: 'file',
              title: 'Document File',
              type: 'file',
            },
          ],
        },
      ],
      hidden: ({ document }) => document?.section !== 'public_services',
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
      section: 'section',
    },
    prepare({ title, section }) {
      const sectionLabels: Record<string, string> = {
        budget: 'Budget',
        procurement: 'Procurement',
        anti_corruption: 'Anti-Corruption',
        public_services: 'Public Services',
      };
      return {
        title: title || 'Untitled',
        subtitle: sectionLabels[section as string] || section,
      };
    },
  },
});
