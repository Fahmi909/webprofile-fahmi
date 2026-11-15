export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getPayload } from 'payload'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProjectThumbnail from '@/components/ProjectThumbnail'
import type { LearningArchive, Project } from '@/payload-types'
import config from '@/payload.config'

const heroTools = ['Python', 'Pandas', 'SQL', 'Power BI', 'Excel', 'VS Code']

export default async function HomePage() {
  const payload = await getPayload({ config: await config })
  const [{ docs: projects }, { docs: learning }] = await Promise.all([
    payload.find({ collection: 'projects', depth: 2, limit: 3, sort: '-publishedDate' }),
    payload.find({ collection: 'learning-archive', limit: 3, sort: '-publishedDate', where: { status: { equals: 'published' } } }),
  ])

  return <div className="site-shell"><Navbar /><main>
    <section className="hero shell"><div className="hero-copy"><span className="eyebrow hero-anim hero-anim--1">INFORMATION SYSTEMS STUDENT <i>•</i> DATA ANALYST</span><h1 className="hero-anim hero-anim--2">Fahmi <span>Ibadrurochman</span></h1><p className="hero-lede hero-anim hero-anim--3">Turning messy data into clear decisions. I build practical end-to-end analytics projects and document the thinking behind every line of code.</p><div className="hero-actions hero-anim hero-anim--4"><Link className="button button--primary" href="/projects">Explore projects <span>↗</span></Link><Link className="button button--outline" href="/learn">Browse the archive <span>→</span></Link></div><div className="hero-tools hero-anim hero-anim--5" aria-label="Technology stack">{heroTools.map((tool) => <span className="tool-badge" key={tool}><b>{tool === 'VS Code' ? '⌘' : tool.slice(0, 1)}</b>{tool}</span>)}</div></div><div className="hero-aside"><div className="hero-grid-orbit"><span className="orbit-dot" /><span className="orbit-cross">+</span><div className="monogram">FI<span>.</span></div></div><p>Curious by nature.<br />Precise by practice.</p></div></section>
    <section className="skill-strip"><div className="shell skill-inner"><span className="muted-label">A practical archive of</span><div className="skills"><span>analysis</span><span>visualisation</span><span>documentation</span><span>learning</span></div></div></section>
    <section className="section shell"><div className="section-heading"><div><span className="eyebrow">Selected work</span><h2>Featured Projects</h2></div><Link className="text-link" href="/projects">View all projects <span>↗</span></Link></div><div className="card-grid">{(projects as Project[]).map((project, index) => <article className="content-card" key={project.id}><ProjectThumbnail project={project} /><div className="card-kicker"><span className="project-index">0{index + 1}</span> Case study</div><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.businessSummary}</p><div className="tag-list">{project.techStack?.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span>↗</span></Link></article>)}</div>{projects.length === 0 && <p className="muted-copy">Projects will appear here once they are published.</p>}</section>
    <section className="section section--tinted"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Notes, references &amp; breakdowns</span><h2>Latest Learning Archive</h2></div><Link className="text-link" href="/learn">Explore the archive <span>↗</span></Link></div><div className="archive-list archive-list--home">{(learning as LearningArchive[]).map((entry, index) => <article className="archive-row" key={entry.id}><span className="archive-number">0{index + 1}</span><div className="archive-content"><span className="eyebrow">{entry.pillar}</span><h3><Link href={`/learn/${entry.slug}`}>{entry.title}</Link></h3><p>{entry.excerpt}</p></div><Link className="arrow-link" href={`/learn/${entry.slug}`}>↗</Link></article>)}</div>{learning.length === 0 && <p className="muted-copy">Published learning notes will appear here.</p>}</div></section>
  </main><Footer /></div>
}
