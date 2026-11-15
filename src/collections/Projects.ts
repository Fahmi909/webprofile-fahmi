import { CodeBlock, BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

const codeBlockFeature = BlocksFeature({
  blocks: [
    CodeBlock({
      defaultLanguage: 'python',
      languages: {
        python: 'Python',
        sql: 'SQL',
      },
    }),
  ],
})

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = data.title
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'businessSummary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'techStack',
      type: 'select',
      hasMany: true,
      options: [
        'Python',
        'Pandas',
        'SQL',
        'Power BI',
        'Excel',
        'RapidMiner',
        'Flutter',
        'Matplotlib',
        'Seaborn',
      ],
    },
    {
      name: 'githubUrl',
      type: 'text',
      label: 'GitHub Repository URL',
    },
    {
      name: 'projectFileUrl',
      type: 'text',
      label: 'Project File / External Resource URL',
      admin: {
        description: 'Masukkan link Google Drive (.pbix / .xlsx), Kaggle, Google Colab, atau repository eksternal lainnya',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'caseStudyContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, codeBlockFeature],
      }),
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
