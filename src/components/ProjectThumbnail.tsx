import type { Media, Project } from '@/payload-types'

function getThumbnail(thumbnail: Project['thumbnail']): Media | null {
  return thumbnail && typeof thumbnail === 'object' ? thumbnail : null
}

export default function ProjectThumbnail({ project, detail = false }: { project: Project; detail?: boolean }) {
  const thumbnail = getThumbnail(project.thumbnail)
  return <div className={`project-thumbnail ${detail ? 'project-thumbnail--detail' : ''}`}>
    {thumbnail?.url ? <img alt={thumbnail.alt || `${project.title} thumbnail`} src={thumbnail.url} /> : <div className="project-thumbnail__fallback" aria-label={`${project.title} thumbnail placeholder`}><span>{project.title.slice(0, 2).toUpperCase()}</span><small>Data project</small></div>}
  </div>
}
