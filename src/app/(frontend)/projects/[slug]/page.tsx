import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProjectFileAction from '@/components/ProjectFileAction'
import ProjectThumbnail from '@/components/ProjectThumbnail'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import config from '@/payload.config'

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({ collection: 'projects', depth: 2, where: { slug: { equals: (await params).slug } }, limit: 1 })
  const project = docs[0]
  if (!project) notFound()
  return <div className="site-shell"><Navbar /><main className="shell article-page"><Link className="back-link" href="/projects">← All projects</Link><div className="article-header"><ProjectThumbnail detail project={project} /><span className="eyebrow">Case study</span><h1>{project.title}</h1><p className="article-lede">{project.businessSummary}</p><div className="tag-list">{project.techStack?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="article-actions">{project.githubUrl && <a className="button button--outline" href={project.githubUrl} rel="noreferrer" target="_blank">Source Code (GitHub) ↗</a>}<ProjectFileAction url={project.projectFileUrl} /></div></div><section className="article-section article-copy"><div className="section-label">The approach</div><RichTextRenderer content={project.caseStudyContent} /></section></main><Footer /></div>
}
