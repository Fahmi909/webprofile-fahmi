function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1).split('/')[0]
    if (parsed.hostname.endsWith('youtube.com')) {
      if (parsed.pathname === '/watch') return parsed.searchParams.get('v')
      if (parsed.pathname.startsWith('/shorts/')) return parsed.pathname.split('/')[2]
      if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/')[2]
    }
  } catch {
    return null
  }
  return null
}

export default function YouTubeEmbed({ url }: { url?: string | null }) {
  const videoId = url ? getYouTubeId(url) : null
  if (!videoId) return null

  return (
    <div className="embed-frame embed-frame--video">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
      />
    </div>
  )
}
