import type { Project } from '@/payload-types'

export default function ProjectThumbnail({ project, detail = false }: { project: Project; detail?: boolean }) {
  const thumbnailUrl = typeof project.thumbnail === 'object' ? project.thumbnail?.url : undefined
  const thumbnailAlt = typeof project.thumbnail === 'object' ? project.thumbnail?.alt : undefined
  return <div className={`project-thumbnail ${detail ? 'project-thumbnail--detail' : ''}`}>
    {thumbnailUrl ? <img alt={thumbnailAlt || `${project.title} thumbnail`} src={thumbnailUrl} /> : <div className="project-thumbnail__fallback" aria-label={`${project.title} thumbnail placeholder`}><span>{project.title.slice(0, 2).toUpperCase()}</span><small>Data project</small></div>}
  </div>
}
