export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getPayload } from 'payload'
import { BrandIcon, type BrandIconName } from '@/components/BrandIcons'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProjectThumbnail from '@/components/ProjectThumbnail'
import type { LearningArchive, Media, Project, SiteProfile } from '@/payload-types'
import config from '@/payload.config'

const defaultProfile = {
  greetingBadge: 'Hello There! • Open for Data Analyst Internship',
  fullName: 'Fahmi Ibadrurochman',
  headline: 'Data Analyst & Educational Content Creator',
  bioParagraph1: 'I am an Information Systems undergraduate with a strong foundation in SQL database querying and data analytics, actively seeking an internship opportunity. I specialize in transforming raw datasets into actionable business insights through rigorous data cleaning and descriptive reporting.',
  bioParagraph2: 'To complement my technical abilities, I bring over two years of experience simplifying complex concepts as a Robotics Instructor and managing organizational communications. I am eager to bring this collaborative, data-driven mindset to a dynamic team and contribute to real-world data initiatives.',
}

const defaultEducation = [{ period: '2024 - Now', institution: 'Universitas Bina Sarana Informatika (UBSI)', majorAndGpa: 'Information Systems • GPA 3.9' }]
const defaultSkills = [
  { categoryName: 'Data Visualization', tools: [{ name: 'Looker', iconKey: 'looker' }, { name: 'Power BI', iconKey: 'powerbi' }] },
  { categoryName: 'Python Libraries', tools: [{ name: 'Pandas', iconKey: 'pandas' }, { name: 'Matplotlib', iconKey: 'matplotlib' }, { name: 'NumPy', iconKey: 'numpy' }, { name: 'Seaborn', iconKey: 'seaborn' }, { name: 'Python', iconKey: 'python' }] },
  { categoryName: 'Database & Query', tools: [{ name: 'MySQL', iconKey: 'mysql' }, { name: 'Excel', iconKey: 'excel' }] },
  { categoryName: 'Version Control', tools: [{ name: 'GitHub', iconKey: 'github' }, { name: 'Git', iconKey: 'git' }] },
  { categoryName: 'Creative Tools', tools: [{ name: 'Canva', iconKey: 'canva' }, { name: 'Figma', iconKey: 'figma' }, { name: 'CapCut', iconKey: 'capcut' }] },
]
const iconNames = new Set<BrandIconName>(['looker', 'powerbi', 'pandas', 'matplotlib', 'numpy', 'seaborn', 'mysql', 'github', 'git', 'canva', 'figma', 'capcut', 'excel', 'python'])

function mediaUrl(media: number | null | Media | undefined) {
  return typeof media === 'object' && media ? media.url || undefined : undefined
}

function whatsappUrl(number: string | null | undefined) {
  const digits = number?.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : undefined
}

function isBrandIconName(value: string | null | undefined): value is BrandIconName {
  return Boolean(value && iconNames.has(value as BrandIconName))
}

type SkillTool = {
  customIcon?: number | null | Media
  iconKey?: string | null
  name: string
}

export default async function HomePage() {
  const payload = await getPayload({ config: await config })
  const [{ docs: projects }, { docs: learning }] = await Promise.all([
    payload.find({ collection: 'projects', depth: 2, limit: 3, sort: '-publishedDate' }),
    payload.find({ collection: 'learning-archive', limit: 3, sort: '-publishedDate', where: { status: { equals: 'published' } } }),
  ])

  let profile: Partial<SiteProfile> = {}
  try {
    profile = await payload.findGlobal({ slug: 'site-profile', depth: 2 })
  } catch (error) {
    console.error('Unable to load site-profile global. Rendering default profile data.', error)
  }

  const siteProfile = profile as SiteProfile
  const education = siteProfile.education?.length ? siteProfile.education : defaultEducation
  const skillCategories = siteProfile.skillCategories?.length ? siteProfile.skillCategories : defaultSkills
  const contacts = siteProfile.contacts || {}
  const profilePhotoUrl = mediaUrl(siteProfile.profilePhoto)
  const socialLinks: { label: string; href?: string; icon: BrandIconName }[] = [
    { label: 'LinkedIn', href: contacts.linkedinUrl || undefined, icon: 'linkedin' },
    { label: 'WhatsApp', href: whatsappUrl(contacts.whatsappNumber), icon: 'whatsapp' },
    { label: 'Instagram', href: contacts.instagramUrl || undefined, icon: 'instagram' },
    { label: 'YouTube', href: contacts.youtubeUrl || undefined, icon: 'youtube' },
    { label: 'TikTok', href: contacts.tiktokUrl || undefined, icon: 'tiktok' },
    { label: 'GitHub', href: contacts.githubUrl || undefined, icon: 'github' },
    { label: 'Email', href: contacts.email ? `mailto:${contacts.email}` : undefined, icon: 'email' },
  ]

  return <div className="site-shell"><Navbar /><main>
    <section className="profile-hero shell">
      <div className="profile-hero__copy">
        <span className="eyebrow hero-anim hero-anim--1">{siteProfile.greetingBadge || defaultProfile.greetingBadge}</span>
        <h1 className="profile-hero__name hero-anim hero-anim--2">{siteProfile.fullName || defaultProfile.fullName}</h1>
        <p className="profile-hero__headline hero-anim hero-anim--3">{siteProfile.headline || defaultProfile.headline}</p>
        <div className="profile-hero__bio hero-anim hero-anim--3"><p>{siteProfile.bioParagraph1 || defaultProfile.bioParagraph1}</p><p>{siteProfile.bioParagraph2 || defaultProfile.bioParagraph2}</p></div>
        <div className="hero-actions hero-anim hero-anim--4"><Link className="button button--primary" href="#projects">Explore my work <span>↗</span></Link><Link className="button button--outline" href="#contact">Let&apos;s connect <span>↓</span></Link></div>
        <div className="profile-socials hero-anim hero-anim--5" id="contact" aria-label="Social media and contact links">{socialLinks.map((social) => social.href ? <a className="profile-social" href={social.href} key={social.label} target={social.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={social.label} title={social.label}><BrandIcon name={social.icon} size={19} /></a> : null)}</div>
      </div>
      <div className="profile-hero__aside">
        <div className="profile-photo-frame">{profilePhotoUrl ? <img src={profilePhotoUrl} alt={typeof siteProfile.profilePhoto === 'object' && siteProfile.profilePhoto ? siteProfile.profilePhoto.alt || defaultProfile.fullName : defaultProfile.fullName} /> : <div className="profile-photo-placeholder"><span>FI</span><small>Profile photo<br />managed in Payload</small></div>}</div>
        <div className="education-card"><span className="section-label">Education</span>{education.slice(0, 2).map((item, index) => <div className="education-item" key={`${item.institution || 'education'}-${index}`}><span className="education-period">{item.period}</span><strong>{item.institution}</strong><span>{item.majorAndGpa}</span></div>)}</div>
      </div>
    </section>

    <section className="skills-section section shell" aria-labelledby="skills-title"><div className="section-heading"><div><span className="eyebrow">The tools behind the work</span><h2 id="skills-title">Skills &amp; Tools</h2></div><span className="skills-note">Always learning. Always building.</span></div><div className="skills-category-grid">{skillCategories.map((category, index) => <div className="skills-category" key={`${category.categoryName}-${index}`}><span className="section-label">{category.categoryName}</span><div className="skills-tool-list">{category.tools?.map((tool, toolIndex) => { const typedTool = tool as SkillTool; const customUrl = mediaUrl(typedTool.customIcon); const iconKey = isBrandIconName(typedTool.iconKey) ? typedTool.iconKey : undefined; return <div className="skill-tool" key={`${tool.name}-${toolIndex}`}>{customUrl ? <img src={customUrl} alt="" /> : iconKey ? <BrandIcon name={iconKey} size={23} /> : null}<span>{tool.name}</span></div> })}</div></div>)}</div></section>

    <section className="section shell" id="projects"><div className="section-heading"><div><span className="eyebrow">Selected work</span><h2>Featured Projects</h2></div><Link className="text-link" href="/projects">View all projects <span>↗</span></Link></div><div className="card-grid">{(projects as Project[]).map((project, index) => <article className="content-card" key={project.id}><ProjectThumbnail project={project} /><div className="card-kicker"><span className="project-index">0{index + 1}</span> Case study</div><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.businessSummary}</p><div className="tag-list">{project.techStack?.slice(0, 4).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span>↗</span></Link></article>)}</div>{projects.length === 0 && <p className="muted-copy">Projects will appear here once they are published.</p>}</section>
    <section className="section section--tinted"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Notes, references &amp; breakdowns</span><h2>Latest Learning Archive</h2></div><Link className="text-link" href="/learn">Explore the archive <span>↗</span></Link></div><div className="archive-list archive-list--home">{(learning as LearningArchive[]).map((entry, index) => <article className="archive-row" key={entry.id}><span className="archive-number">0{index + 1}</span><div className="archive-content"><span className="eyebrow">{entry.pillar}</span><h3><Link href={`/learn/${entry.slug}`}>{entry.title}</Link></h3><p>{entry.excerpt}</p></div><Link className="arrow-link" href={`/learn/${entry.slug}`}>↗</Link></article>)}</div>{learning.length === 0 && <p className="muted-copy">Published learning notes will appear here.</p>}</div></section>
  </main><Footer /></div>
}

