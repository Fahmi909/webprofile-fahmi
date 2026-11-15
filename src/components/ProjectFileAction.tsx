function getActionLabel(value: string) {
  try {
    const hostname = new URL(value).hostname.toLowerCase()
    if (hostname === 'drive.google.com' || hostname.endsWith('.drive.google.com')) return 'Open in Google Drive ↗'
    if (hostname === 'kaggle.com' || hostname.endsWith('.kaggle.com')) return 'View on Kaggle ↗'
  } catch {
    // Use the generic label for an external URL that cannot be parsed.
  }
  return 'Access Project Files / Dataset ↗'
}

export default function ProjectFileAction({ url }: { url?: string | null }) {
  if (!url?.trim()) return null
  return <a className="button button--primary" href={url.trim()} rel="noreferrer" target="_blank"><svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16"><path d="M3.5 6.5h6l2 2h9v9.5a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-9.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /><path d="M3 6.5V5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>{getActionLabel(url)}</a>
}
