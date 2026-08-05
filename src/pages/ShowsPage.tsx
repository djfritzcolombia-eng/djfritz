import { useMemo, useState } from 'react'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { MediaImage } from '../components/MediaImage'
import { useContent } from '../content/content-context'
import { isIdbSrc } from '../media/mediaDb'
import { getMediaBlob, idbKeyFromSrc } from '../media/mediaDb'
import { useEffect } from 'react'

type Tab = 'fotos' | 'videos'

export function ShowsPage() {
  const { content } = useContent()
  const [tab, setTab] = useState<Tab>('fotos')
  const [active, setActive] = useState<string | null>(null)
  const [lightboxUrl, setLightboxUrl] = useState('')

  const photos = useMemo(() => content.shows.filter((s) => s.type === 'photo'), [content.shows])
  const videos = useMemo(() => content.shows.filter((s) => s.type === 'youtube'), [content.shows])
  const activeItem = content.shows.find((s) => s.id === active)

  useEffect(() => {
    let objectUrl = ''
    let cancelled = false

    async function resolve() {
      if (!activeItem || activeItem.type !== 'photo') {
        setLightboxUrl('')
        return
      }
      if (!isIdbSrc(activeItem.src)) {
        setLightboxUrl(activeItem.src)
        return
      }
      const blob = await getMediaBlob(idbKeyFromSrc(activeItem.src))
      if (cancelled) return
      if (!blob) {
        setLightboxUrl('')
        return
      }
      objectUrl = URL.createObjectURL(blob)
      setLightboxUrl(objectUrl)
    }

    resolve()
    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [activeItem])

  return (
    <div className="page">
      <p className="page__eyebrow">Live</p>
      <h1 className="page__title">Shows</h1>
      <p className="page__lead">Fotos y videos de la pista. Navega por tipo de media.</p>

      <div className="tabs" role="tablist">
        <button type="button" className={tab === 'fotos' ? 'is-active' : ''} onClick={() => setTab('fotos')}>
          Fotos
        </button>
        <button type="button" className={tab === 'videos' ? 'is-active' : ''} onClick={() => setTab('videos')}>
          Videos
        </button>
      </div>

      {tab === 'fotos' && (
        <div className="media-grid">
          {photos.map((item) => (
            <button
              key={item.id}
              type="button"
              className="media-card"
              style={{ textAlign: 'left', cursor: 'zoom-in', width: '100%', padding: 0, border: 0, background: 'transparent' }}
              onClick={() => setActive(item.id)}
            >
              <MediaImage src={item.src} alt={item.title} />
              <div className="media-card__body">
                <strong>{item.title}</strong>
                <span>{[item.venue, item.date].filter(Boolean).join(' · ')}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === 'videos' && (
        <div className="stack">
          {videos.length === 0 && (
            <p style={{ color: 'var(--muted)' }}>Aún no hay videos. Agrégalos en Admin (YouTube ID).</p>
          )}
          {videos.map((item) => (
            <div key={item.id}>
              <p style={{ marginBottom: '0.5rem', color: 'var(--muted)' }}>
                {item.title}
                {item.venue ? ` · ${item.venue}` : ''}
              </p>
              <YoutubeEmbed youtubeId={item.src} title={item.title} />
            </div>
          ))}
        </div>
      )}

      {activeItem?.type === 'photo' && lightboxUrl && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 70,
            background: 'rgba(0,0,0,0.9)',
            display: 'grid',
            placeItems: 'center',
            padding: '1.5rem',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightboxUrl}
            alt={activeItem.title}
            style={{ maxWidth: 'min(1100px, 100%)', maxHeight: '85vh', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  )
}
