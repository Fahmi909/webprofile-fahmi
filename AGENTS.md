# Project Context: Personal Portfolio & Data Analytics Learning Archive

## 1. Identity & Project Purpose
- **Owner:** Fahmi Ibadrurochman (Information Systems Student & Data Analyst).
- **Goal:** Build a personal portfolio website integrated with a self-hosted Learning Archive repository for YouTube data analytics content, research references, and line-by-line code breakdowns.
- **Core Stack:** Next.js (App Router), Payload CMS v3.93.0 (Embedded Backend), PostgreSQL (Supabase), Tailwind CSS, Lucide Icons, TypeScript.
- **Package Manager:** npm (always use `npm` commands, not yarn or pnpm).
- **Supabase S3 Storage:** Configure `S3_BUCKET`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` for persistent media storage in Vercel deployments.

## 2. Architecture & Codebase Rules
- **Directory Structure:** Keep Payload collections inside `src/collections/`, shared components in `src/components/`, and frontend routes in `src/app/(frontend)/` (or existing Payload route group structure).
- **Database & Types:** After modifying any Payload collection schema, always run `npm run generate:types` (or `npx payload generate:types`) so TypeScript interfaces in `src/payload-types.ts` stay synced.
- **Slug Generation:** Implement a `beforeValidate` hook on collections with a `slug` field to auto-generate URL-friendly slugs from the `title` field if `slug` is left empty.
- **Access Control:** Set `read: () => true` on `Projects`, `LearningArchive`, and `Media` collections so the public Next.js frontend can fetch published content without authentication errors, while restricting `create`, `update`, and `delete` to authenticated admin users (`({ req: { user } }) => Boolean(user)`).

## 3. Payload CMS Collections Specification

### A. `Projects` (`src/collections/Projects.ts`)
Used for showcasing end-to-end data analytics projects and interactive BI dashboards.
- `title` (text, required)
- `slug` (text, required, unique, admin.position: 'sidebar')
- `featured` (checkbox, defaultValue: false, admin.position: 'sidebar')
- `businessSummary` (textarea, required)
- `techStack` (select, hasMany: true, options: `Python`, `Pandas`, `SQL`, `Power BI`, `Excel`, `RapidMiner`, `Flutter`, `Matplotlib`, `Seaborn`)
- `githubUrl` (text, label: 'GitHub Repository URL')
- `projectFileUrl` (text, label: 'Project File / External Resource URL', admin.description: 'Masukkan link Google Drive (.pbix / .xlsx), Kaggle, Google Colab, atau repository eksternal lainnya')
- `thumbnail` (upload, relationTo: 'media')
- `caseStudyContent` (richText — Lexical editor with CodeBlock support)
- `publishedDate` (date, admin.position: 'sidebar')

### B. `LearningArchive` (`src/collections/LearningArchive.ts`)
Used for archiving YouTube video scripts, academic/business research sources, and detailed line-by-line code explanations.
- `title` (text, required)
- `slug` (text, required, unique, admin.position: 'sidebar')
- `status` (select, defaultValue: 'draft', options: `draft`, `published`, admin.position: 'sidebar')
- `pillar` (select, required, options: `End-to-End Project`, `Python Deep Dive`, `BI & Visualization`, `Data Career`)
- `techStack` (select, hasMany: true, options: `Python`, `Pandas`, `SQL`, `Power BI`, `Excel`, `RapidMiner`, `Flutter`)
- `youtubeUrl` (text, label: 'YouTube Video URL')
- `githubDatasetUrl` (text, label: 'GitHub Notebook / Dataset URL')
- `excerpt` (textarea, label: 'Short Summary / Meta Description')
- `researchReferences` (richText, label: 'Research Sources & Theoretical Framework')
- `codeBreakdown` (richText, label: 'Full Script & Line-by-Line Code Breakdown')
- `publishedDate` (date, admin.position: 'sidebar')

## 4. Lexical Rich Text & UI Guidelines
- **Code Blocks:** Configure Payload's `lexicalEditor` to support code blocks (`BlocksFeature` or built-in code block node) for languages: `python`, `sql`, `javascript`, `typescript`, `bash`, `json`.
- **Frontend Styling:** Clean, high-readability technical documentation layout, dark/light mode support, responsive YouTube iframe wrapper (`aspect-video`), responsive Power BI iframe embed, and a mandatory **Copy** button with language badge on every rendered code block.
