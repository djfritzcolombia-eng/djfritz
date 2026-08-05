type Props = {
  youtubeId: string
  title: string
}

export function YoutubeEmbed({ youtubeId, title }: Props) {
  return (
    <div className="yt-embed">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
