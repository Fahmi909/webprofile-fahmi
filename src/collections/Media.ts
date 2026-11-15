import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    afterError: [
      ({ error }) => ({
        response: {
          errors: [
            {
              message: error.message || 'Media upload failed.',
            },
          ],
        },
      }),
    ],
  },
  upload: {
    mimeTypes: ['image/*'],
  },
}
