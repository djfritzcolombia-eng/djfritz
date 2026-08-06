import { useEffect, useState } from 'react'
import type { ShowMedia } from '../data/site'
import { MediaImage } from './MediaImage'
import './AlbumPreview.css'

type Props = {
  photos: ShowMedia[]
  intervalMs?: number
}

/** Vista previa que rota sola las fotos de una carpeta */
export function AlbumPreview({ photos, intervalMs = 2200 }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [photos])

  useEffect(() => {
    if (photos.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % photos.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [photos, intervalMs])

  if (!photos.length) {
    return <div className="album-preview album-preview--empty" />
  }

  return (
    <div className="album-preview" aria-hidden>
      {photos.map((photo, i) => (
        <div key={photo.id} className={`album-preview__slide ${i === index ? 'is-active' : ''}`}>
          <MediaImage src={photo.src} alt="" />
        </div>
      ))}
      {photos.length > 1 && (
        <div className="album-preview__dots">
          {photos.map((photo, i) => (
            <span key={photo.id} className={i === index ? 'is-active' : ''} />
          ))}
        </div>
      )}
    </div>
  )
}
