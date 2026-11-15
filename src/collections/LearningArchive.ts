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

export const LearningArchive: CollectionConfig = {
  slug: 'learning-archive',
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
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: ['draft', 'published'],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pillar',
      type: 'select',
      required: true,
      options: ['End-to-End Project', 'Python Deep Dive', 'BI & Visualization', 'Data Career'],
    },
    {
      name: 'techStack',
      type: 'select',
      hasMany: true,
      options: ['Python', 'Pandas', 'SQL', 'Power BI', 'Excel', 'RapidMiner', 'Flutter'],
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube Video URL',
    },
    {
      name: 'githubDatasetUrl',
      type: 'text',
      label: 'GitHub Notebook / Dataset URL',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Short Summary / Meta Description',
    },
    {
      name: 'researchReferences',
      type: 'richText',
      label: 'Research Sources & Theoretical Framework',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, codeBlockFeature],
      }),
    },
    {
      name: 'codeBreakdown',
      type: 'richText',
      label: 'Full Script & Line-by-Line Code Breakdown',
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
