function normalizeEmbedUrl(value: string) {
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) return null

    const driveFilePattern = /^\/file\/d\/([^/]+)\/(view|preview)\/?$/
    const match = url.hostname === 'drive.google.com' ? url.pathname.match(driveFilePattern) : null
    if (match) {
      url.pathname = `/file/d/${match[1]}/preview`
      return url.toString()
    }

    return url.toString()
  } catch {
    return null
  }
}

export default function PowerBiEmbed({ url }: { url?: string | null }) {
  const normalizedUrl = url?.trim() ? normalizeEmbedUrl(url.trim()) : null

  if (!normalizedUrl) {
    return <div className="embed-fallback"><p>This dashboard cannot be embedded here.</p>{url?.trim() ? <a className="button button--primary" href={url.trim()} rel="noreferrer" target="_blank">Open Dashboard in New Tab ↗</a> : <span className="button button--primary is-disabled">Open Dashboard in New Tab ↗</span>}</div>
  }

  return <div className="embed-frame embed-frame--powerbi"><iframe allowFullScreen src={normalizedUrl} title="Power BI interactive dashboard" /></div>
}
