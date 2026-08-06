import { useEffect, useRef, useState } from 'react'
import { useResolvedSrc } from '../media/useResolvedSrc'
import { MediaImage } from './MediaImage'
import './AudioPlayer.css'

type Props = {
  src?: string
  title: string
  subtitle?: string
  cover?: string
  tags?: string[]
}

export function AudioPlayer({ src, title, subtitle, cover, tags }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const resolvedSrc = useResolvedSrc(src)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => {
      if (!el.duration) return
      setProgress((el.currentTime / el.duration) * 100)
    }
    const onEnd = () => setPlaying(false)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('ended', onEnd)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('ended', onEnd)
    }
  }, [resolvedSrc])

  useEffect(() => {
    setPlaying(false)
    setProgress(0)
  }, [resolvedSrc])

  const toggle = async () => {
    const el = audioRef.current
    if (!el || !resolvedSrc) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      await el.play()
      setPlaying(true)
    }
  }

  return (
    <div className={`audio-player ${!resolvedSrc ? 'is-empty' : ''}`}>
      {cover ? (
        <MediaImage className="audio-player__cover" src={cover} alt="" />
      ) : null}
      <div className="audio-player__meta">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
        {tags && tags.length > 0 && (
          <div className="audio-player__tags">
            {tags.map((tag) => (
              <a
                key={tag}
                href={`https://www.google.com/search?q=${encodeURIComponent(`#${tag}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                #{tag}
              </a>
            ))}
          </div>
        )}
        <div className="audio-player__bar" aria-hidden>
          <i style={{ width: `${progress}%` }} />
        </div>
        {!resolvedSrc && (
          <em className="audio-player__hint">Sin audio — súbelo desde Admin → Beats</em>
        )}
      </div>
      <button type="button" className="audio-player__btn" onClick={toggle} disabled={!resolvedSrc}>
        {playing ? 'Pausa' : 'Play'}
      </button>
      {resolvedSrc ? <audio ref={audioRef} src={resolvedSrc} preload="metadata" /> : null}
    </div>
  )
}
