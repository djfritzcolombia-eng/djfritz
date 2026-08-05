import { useEffect, useState } from 'react'
import { getMediaBlob, isIdbSrc, idbKeyFromSrc } from '../media/mediaDb'

type Props = {
  src: string
  alt: string
  className?: string
}

/** Resuelve rutas públicas y fotos subidas (idb:...) */
export function MediaImage({ src, alt, className }: Props) {
  const [url, setUrl] = useState(() => (isIdbSrc(src) ? '' : src))

  useEffect(() => {
    let objectUrl = ''
    let cancelled = false

    if (!isIdbSrc(src)) {
      setUrl(src)
      return
    }

    getMediaBlob(idbKeyFromSrc(src)).then((blob) => {
      if (cancelled) return
      if (!blob) {
        setUrl('')
        return
      }
      objectUrl = URL.createObjectURL(blob)
      setUrl(objectUrl)
    })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [src])

  if (!url) {
    return <div className={className} style={{ background: '#1a1a1a', minHeight: 120 }} aria-label={alt} />
  }

  return <img className={className} src={url} alt={alt} loading="lazy" />
}
