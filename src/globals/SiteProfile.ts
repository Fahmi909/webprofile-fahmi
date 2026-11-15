import type { GlobalConfig } from 'payload'

const iconOptions = [
  { label: 'Looker', value: 'looker' },
  { label: 'Power BI', value: 'powerbi' },
  { label: 'Pandas', value: 'pandas' },
  { label: 'Matplotlib', value: 'matplotlib' },
  { label: 'NumPy', value: 'numpy' },
  { label: 'Seaborn', value: 'seaborn' },
  { label: 'MySQL', value: 'mysql' },
  { label: 'GitHub', value: 'github' },
  { label: 'Git', value: 'git' },
  { label: 'Canva', value: 'canva' },
  { label: 'Figma', value: 'figma' },
  { label: 'CapCut', value: 'capcut' },
  { label: 'Excel', value: 'excel' },
  { label: 'Python', value: 'python' },
]

export const SiteProfile: GlobalConfig = {
  slug: 'site-profile',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'greetingBadge',
      type: 'text',
      defaultValue: 'Hello There! • Open for Data Analyst Internship',
    },
    {
      name: 'fullName',
      type: 'text',
      defaultValue: 'Fahmi Ibadrurochman',
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Data Analyst & Educational Content Creator',
    },
    {
      name: 'bioParagraph1',
      type: 'textarea',
      defaultValue:
        'I am an Information Systems undergraduate with a strong foundation in SQL database querying and data analytics, actively seeking an internship opportunity. I specialize in transforming raw datasets into actionable business insights through rigorous data cleaning and descriptive reporting.',
    },
    {
      name: 'bioParagraph2',
      type: 'textarea',
      defaultValue:
        'To complement my technical abilities, I bring over two years of experience simplifying complex concepts as a Robotics Instructor and managing organizational communications. I am eager to bring this collaborative, data-driven mindset to a dynamic team and contribute to real-world data initiatives.',
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or replace the profile photo shown on the public homepage.',
      },
    },
    {
      name: 'contacts',
      type: 'group',
      fields: [
        { name: 'linkedinUrl', type: 'text' },
        {
          name: 'whatsappNumber',
          type: 'text',
          admin: { description: 'Use international format, for example 628123456789.' },
        },
        { name: 'instagramUrl', type: 'text', defaultValue: 'https://instagram.com/artbyfahmi' },
        { name: 'youtubeUrl', type: 'text' },
        { name: 'tiktokUrl', type: 'text', defaultValue: 'https://tiktok.com/@fahmi.ibadruroch' },
        { name: 'githubUrl', type: 'text' },
        { name: 'email', type: 'text' },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        { name: 'period', type: 'text', defaultValue: '2024 - Now' },
        { name: 'institution', type: 'text', defaultValue: 'Universitas Bina Sarana Informatika (UBSI)' },
        { name: 'majorAndGpa', type: 'text', defaultValue: 'Information Systems • GPA 3.9' },
      ],
    },
    {
      name: 'skillCategories',
      type: 'array',
      fields: [
        { name: 'categoryName', type: 'text', required: true },
        {
          name: 'tools',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'iconKey', type: 'select', options: iconOptions },
            { name: 'customIcon', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}

