import Link from 'next/link'
import { getPayload } from 'payload'
import Footer from '@/components/Footer'
import LearningGrid from '@/components/LearningGrid'
import Navbar from '@/components/Navbar'
import config from '@/payload.config'

export default async function LearningArchivePage() {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({ collection: 'learning-archive', limit: 100, sort: '-publishedDate', where: { status: { equals: 'published' } } })
  return <div className="site-shell"><Navbar /><main className="shell page-content"><div className="page-intro"><Link className="back-link" href="/">← Back home</Link><span className="eyebrow">Learning archive</span><h1>Notes for the curious analyst.</h1><p>Video scripts, research references, and line-by-line code breakdowns — captured so the next idea starts further ahead.</p></div><LearningGrid entries={docs} /></main><Footer /></div>
}
