import { useEffect, useMemo, useState } from 'react'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { MediaImage } from '../components/MediaImage'
import { AlbumPreview } from '../components/AlbumPreview'
import { useContent } from '../content/content-context'
import { getMediaBlob, idbKeyFromSrc, isIdbSrc } from '../media/mediaDb'
import type { ShowFolder, ShowMedia } from '../data/site'
import './ShowsPage.css'

type Tab = 'fotos' | 'videos'

export function ShowsPage() {
  const { content } = useContent()
  const [tab, setTab] = useState<Tab>('fotos')
  const [openFolderId, setOpenFolderId] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [lightboxUrl, setLightboxUrl] = useState('')

  const photoFolders = useMemo(
    () => content.folders.filter((f) => f.kind === 'photos'),
    [content.folders],
  )
  const videoFolders = useMemo(
    () => content.folders.filter((f) => f.kind === 'videos'),
    [content.folders],
  )

  const photos = useMemo(() => content.shows.filter((s) => s.type === 'photo'), [content.shows])

  const mediaByFolder = useMemo(() => {
    const map = new Map<string, ShowMedia[]>()
    for (const item of content.shows) {
      const key = item.folderId
      const list = map.get(key) ?? []
      list.push(item)
      map.set(key, list)
    }
    return map
  }, [content.shows])

  const openFolder: ShowFolder | undefined = content.folders.find((f) => f.id === openFolderId)
  const folderItems = openFolderId ? (mediaByFolder.get(openFolderId) ?? []) : []
  const folderPhotos = folderItems.filter((i) => i.type === 'photo')
  const folderVideos = folderItems.filter((i) => i.type === 'youtube')

  const activeItem = photos.find((s) => s.id === active)

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

  const folders = tab === 'fotos' ? photoFolders : videoFolders

  return (
    <div className="page">
      <p className="page__eyebrow">Live</p>
      <h1 className="page__title">Shows</h1>
      <p className="page__lead">
        {openFolder
          ? `${openFolder.name} · ${openFolder.location}`
          : 'Carpetas por venue y ciudad. La preview rota sola las fotos.'}
      </p>

      <div className="tabs" role="tablist">
        <button
          type="button"
          className={tab === 'fotos' ? 'is-active' : ''}
          onClick={() => {
            setTab('fotos')
            setOpenFolderId(null)
          }}
        >
          Fotos
        </button>
        <button
          type="button"
          className={tab === 'videos' ? 'is-active' : ''}
          onClick={() => {
            setTab('videos')
            setOpenFolderId(null)
          }}
        >
          Videos
        </button>
      </div>

      {!openFolderId && (
        <div className="folder-grid">
          {folders.map((folder) => {
            const items = mediaByFolder.get(folder.id) ?? []
            const previewPhotos = items.filter((i) => i.type === 'photo')
            const count =
              folder.kind === 'photos'
                ? previewPhotos.length
                : items.filter((i) => i.type === 'youtube').length

            return (
              <button
                key={folder.id}
                type="button"
                className="folder-card"
                onClick={() => setOpenFolderId(folder.id)}
              >
                {folder.kind === 'photos' ? (
                  previewPhotos.length ? (
                    <AlbumPreview photos={previewPhotos} />
                  ) : (
                    <div className="folder-card__empty">
                      <span>Sin fotos aún</span>
                    </div>
                  )
                ) : (
                  <div className="folder-card__empty folder-card__empty--video">
                    <span>▶ Videos</span>
                  </div>
                )}
                <div className="folder-card__body">
                  <strong>{folder.name}</strong>
                  <span className="folder-card__location">{folder.location}</span>
                  <span>
                    {count} {folder.kind === 'photos' ? 'foto' : 'video'}
                    {count === 1 ? '' : 's'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {openFolder && openFolder.kind === 'photos' && (
        <div className="folder-view">
          <button type="button" className="btn btn--ghost folder-view__back" onClick={() => setOpenFolderId(null)}>
            ← Carpetas
          </button>
          <p className="folder-view__meta">
            {openFolder.name} · {openFolder.location} · {folderPhotos.length} fotos
          </p>
          {folderPhotos.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>Carpeta vacía. Sube fotos desde Admin.</p>
          ) : (
            <div className="media-grid">
              {folderPhotos.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="media-card"
                  style={{
                    textAlign: 'left',
                    cursor: 'zoom-in',
                    width: '100%',
                    padding: 0,
                    border: 0,
                    background: 'transparent',
                  }}
                  onClick={() => setActive(item.id)}
                >
                  <MediaImage src={item.src} alt={item.title} />
                  <div className="media-card__body">
                    <strong>{item.title}</strong>
                    <span>{openFolder.location}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {openFolder && openFolder.kind === 'videos' && (
        <div className="folder-view">
          <button type="button" className="btn btn--ghost folder-view__back" onClick={() => setOpenFolderId(null)}>
            ← Carpetas
          </button>
          <p className="folder-view__meta">
            {openFolder.name} · {openFolder.location} · {folderVideos.length} videos
          </p>
          {folderVideos.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>Sin videos aún. Agrégalos en Admin (YouTube ID).</p>
          ) : (
            <div className="stack">
              {folderVideos.map((item) => (
                <div key={item.id}>
                  <p style={{ marginBottom: '0.5rem', color: 'var(--muted)' }}>{item.title}</p>
                  <YoutubeEmbed youtubeId={item.src} title={item.title} />
                </div>
              ))}
            </div>
          )}
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
            background: 'rgba(0, 0, 0, 0.9)',
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
