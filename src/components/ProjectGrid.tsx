'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { Project } from '@/payload-types'
import ProjectThumbnail from './ProjectThumbnail'

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All')
  const technologies = ['All', ...Array.from(new Set(projects.flatMap((project) => project.techStack ?? [])))]
  const visibleProjects = useMemo(
    () => filter === 'All' ? projects : projects.filter((project) => project.techStack?.includes(filter as never)),
    [filter, projects],
  )

  return (
    <>
      <div className="filter-row" aria-label="Filter projects by technology">
        {technologies.map((technology) => (
          <button className={`filter-chip ${filter === technology ? 'is-active' : ''}`} key={technology} onClick={() => setFilter(technology)} type="button">
            {technology}
          </button>
        ))}
      </div>
      <div className="card-grid">
        {visibleProjects.map((project) => (
          <article className="content-card" key={project.id}>
            <ProjectThumbnail project={project} />
            <div className="card-kicker"><span className="dot" /> Case study</div>
            <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
            <p>{project.businessSummary}</p>
            <div className="tag-list">{project.techStack?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            <Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span>↗</span></Link>
          </article>
        ))}
      </div>
      {visibleProjects.length === 0 && <div className="empty-state">No projects found for this technology yet.</div>}
    </>
  )
}
