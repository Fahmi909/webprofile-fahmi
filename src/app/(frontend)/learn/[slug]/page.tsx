import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import config from '@/payload.config'

export default async function LearningDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({ collection: 'learning-archive', where: { slug: { equals: (await params).slug }, status: { equals: 'published' } }, limit: 1 })
  const entry = docs[0]
  if (!entry) notFound()
  return <div className="site-shell"><Navbar /><main className="shell article-page"><Link className="back-link" href="/learn">← Learning archive</Link><div className="article-header"><span className="eyebrow">{entry.pillar}</span><h1>{entry.title}</h1><p className="article-lede">{entry.excerpt}</p><div className="tag-list">{entry.techStack?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="article-actions">{entry.githubDatasetUrl && <a className="button button--primary" href={entry.githubDatasetUrl} rel="noreferrer" target="_blank">Open notebook / dataset ↗</a>}</div></div><YouTubeEmbed url={entry.youtubeUrl} /><div className="article-layout"><aside className="article-toc"><span>In this note</span><a href="#references">Research references</a><a href="#breakdown">Code breakdown</a></aside><div className="article-body"><section className="article-section article-copy" id="references"><div className="section-label">Research References &amp; Theoretical Framework</div><RichTextRenderer content={entry.researchReferences} /></section><section className="article-section article-copy" id="breakdown"><div className="section-label">Full Script &amp; Line-by-Line Code Breakdown</div><RichTextRenderer content={entry.codeBreakdown} /></section></div></div></main><Footer /></div>
}
