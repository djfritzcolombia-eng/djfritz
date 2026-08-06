import { useEffect, useState } from 'react'
import { getMediaBlob, idbKeyFromSrc, isIdbSrc } from '../media/mediaDb'

/** Resuelve /ruta o idb:clave a una URL usable en <audio>/<video>/<img> */
export function useResolvedSrc(src?: string) {
  const [url, setUrl] = useState(() => (src && !isIdbSrc(src) ? src : ''))

  useEffect(() => {
    let objectUrl = ''
    let cancelled = false

    if (!src) {
      setUrl('')
      return
    }
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

  return url
}
