export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { getPayload } from 'payload'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProjectGrid from '@/components/ProjectGrid'
import config from '@/payload.config'

export default async function ProjectsPage() {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({ collection: 'projects', depth: 2, limit: 100, sort: '-publishedDate' })
  return <div className="site-shell"><Navbar /><main className="shell page-content"><div className="page-intro"><Link className="back-link" href="/">← Back home</Link><span className="eyebrow">Selected work</span><h1>Projects that make data useful.</h1><p>End-to-end analytics work, from business questions and messy data to clear dashboards and decisions.</p></div><ProjectGrid projects={docs} /></main><Footer /></div>
}
