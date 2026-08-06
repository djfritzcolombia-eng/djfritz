import { useEffect, useRef } from 'react'
import { useResolvedSrc } from '../media/useResolvedSrc'

type Props = {
  src: string
  title: string
}

export function LocalVideo({ src, title }: Props) {
  const resolved = useResolvedSrc(src)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.load()
  }, [resolved])

  if (!resolved) {
    return (
      <div
        style={{
          aspectRatio: '16 / 9',
          background: '#1a1a1a',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--muted)',
        }}
      >
        Video no disponible
      </div>
    )
  }

  return (
    <video
      ref={ref}
      src={resolved}
      controls
      playsInline
      preload="metadata"
      title={title}
      style={{ width: '100%', aspectRatio: '16 / 9', background: '#000' }}
    />
  )
}
