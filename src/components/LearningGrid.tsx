'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { LearningArchive } from '@/payload-types'

export default function LearningGrid({ entries }: { entries: LearningArchive[] }) {
  const [query, setQuery] = useState('')
  const [pillar, setPillar] = useState('All')
  const [technology, setTechnology] = useState('All')
  const pillars = ['All', ...Array.from(new Set(entries.map((entry) => entry.pillar)))]
  const technologies = ['All', ...Array.from(new Set(entries.flatMap((entry) => entry.techStack ?? [])))]
  const visibleEntries = useMemo(() => entries.filter((entry) => {
    const matchesQuery = entry.title.toLowerCase().includes(query.toLowerCase())
    const matchesPillar = pillar === 'All' || entry.pillar === pillar
    const matchesTechnology = technology === 'All' || entry.techStack?.includes(technology as never)
    return matchesQuery && matchesPillar && matchesTechnology
  }), [entries, pillar, query, technology])

  return (
    <>
      <div className="archive-controls">
        <label className="search-box"><span>⌕</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive..." type="search" value={query} /></label>
        <select aria-label="Filter by pillar" onChange={(event) => setPillar(event.target.value)} value={pillar}>{pillars.map((value) => <option key={value}>{value}</option>)}</select>
        <select aria-label="Filter by technology" onChange={(event) => setTechnology(event.target.value)} value={technology}>{technologies.map((value) => <option key={value}>{value}</option>)}</select>
      </div>
      <div className="archive-list">
        {visibleEntries.map((entry, index) => (
          <article className="archive-row" key={entry.id}>
            <span className="archive-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="archive-content"><span className="eyebrow">{entry.pillar}</span><h2><Link href={`/learn/${entry.slug}`}>{entry.title}</Link></h2><p>{entry.excerpt ?? 'A practical note from the learning archive.'}</p><div className="tag-list">{entry.techStack?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div>
            <Link aria-label={`Read ${entry.title}`} className="arrow-link" href={`/learn/${entry.slug}`}>↗</Link>
          </article>
        ))}
      </div>
      {visibleEntries.length === 0 && <div className="empty-state">No learning notes match your filters.</div>}
    </>
  )
}
