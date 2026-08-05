import { useEffect, useRef, useState } from 'react'
import './AudioPlayer.css'

type Props = {
  src?: string
  title: string
  subtitle?: string
  cover?: string
}

export function AudioPlayer({ src, title, subtitle, cover }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
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
  }, [src])

  const toggle = async () => {
    const el = audioRef.current
    if (!el || !src) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      await el.play()
      setPlaying(true)
    }
  }

  return (
    <div className={`audio-player ${!src ? 'is-empty' : ''}`}>
      {cover && <img className="audio-player__cover" src={cover} alt="" />}
      <div className="audio-player__meta">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
        <div className="audio-player__bar" aria-hidden>
          <i style={{ width: `${progress}%` }} />
        </div>
        {!src && <em className="audio-player__hint">Sube el MP3 en /media/audio y enlázalo en Admin</em>}
      </div>
      <button type="button" className="audio-player__btn" onClick={toggle} disabled={!src}>
        {playing ? 'Pausa' : 'Play'}
      </button>
      {src ? <audio ref={audioRef} src={src} preload="metadata" /> : null}
    </div>
  )
}
