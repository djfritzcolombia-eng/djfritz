import { useRef, useState } from 'react'
import type { BeatProduct } from '../data/site'
import { formatPrice } from '../data/site'
import { useContent } from '../content/content-context'
import { MediaImage } from './MediaImage'
import {
  compressImageFile,
  deleteMediaBlob,
  idbKeyFromSrc,
  isIdbSrc,
  makeMediaId,
  saveMediaBlob,
} from '../media/mediaDb'
import './PhotoManager.css'

function parseHashtags(raw: string) {
  return raw
    .split(/[\s,]+/)
    .map((t) => t.replace(/^#/, '').trim().toLowerCase())
    .filter(Boolean)
}

function tagsToInput(tags?: string[]) {
  return (tags ?? []).map((t) => `#${t}`).join(' ')
}

export function BeatManager() {
  const { content, setContent } = useContent()
  const audioRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [price, setPrice] = useState('250000')
  const [bpm, setBpm] = useState('140')
  const [key, setKey] = useState('Am')
  const [hashtags, setHashtags] = useState('#trap')
  const [inStock, setInStock] = useState(true)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)

  const resetForm = () => {
    setTitle('')
    setSubtitle('')
    setPrice('250000')
    setBpm('140')
    setKey('Am')
    setHashtags('#trap')
    setInStock(true)
    setAudioFile(null)
    setCoverFile(null)
    if (audioRef.current) audioRef.current.value = ''
    if (coverRef.current) coverRef.current.value = ''
  }

  const addBeat = async () => {
    if (!title.trim()) {
      setMsg('Escribe el título del beat.')
      return
    }
    setBusy(true)
    setMsg('')
    try {
      const id = makeMediaId()
      let src = ''
      let cover = '/media/covers/beat.svg'

      if (audioFile) {
        const audioId = `${id}_audio`
        await saveMediaBlob(audioId, audioFile)
        src = `idb:${audioId}`
      }

      if (coverFile) {
        const coverId = `${id}_cover`
        const blob = await compressImageFile(coverFile, 800, 0.85)
        await saveMediaBlob(coverId, blob)
        cover = `idb:${coverId}`
      }

      const beat: BeatProduct = {
        id,
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        src,
        cover,
        price: Number(price) || 0,
        bpm: Number(bpm) || undefined,
        key: key.trim() || undefined,
        tags: parseHashtags(hashtags),
        inStock,
      }

      setContent({ ...content, beats: [beat, ...content.beats] })
      resetForm()
      setMsg(`Beat “${beat.title}” agregado.`)
    } catch (err) {
      console.error(err)
      setMsg('No se pudo subir. Revisa el audio/portada e intenta de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  const updateBeat = (id: string, patch: Partial<BeatProduct>) => {
    setContent({
      ...content,
      beats: content.beats.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    })
  }

  const replaceAudio = async (beat: BeatProduct, file: File | null) => {
    if (!file) return
    setBusy(true)
    try {
      if (isIdbSrc(beat.src)) await deleteMediaBlob(idbKeyFromSrc(beat.src))
      const audioId = `${beat.id}_audio_${Date.now().toString(36)}`
      await saveMediaBlob(audioId, file)
      updateBeat(beat.id, { src: `idb:${audioId}` })
      setMsg(`Audio actualizado en “${beat.title}”.`)
    } finally {
      setBusy(false)
    }
  }

  const replaceCover = async (beat: BeatProduct, file: File | null) => {
    if (!file) return
    setBusy(true)
    try {
      if (beat.cover && isIdbSrc(beat.cover)) await deleteMediaBlob(idbKeyFromSrc(beat.cover))
      const coverId = `${beat.id}_cover_${Date.now().toString(36)}`
      const blob = await compressImageFile(file, 800, 0.85)
      await saveMediaBlob(coverId, blob)
      updateBeat(beat.id, { cover: `idb:${coverId}` })
      setMsg(`Portada actualizada en “${beat.title}”.`)
    } finally {
      setBusy(false)
    }
  }

  const removeBeat = async (beat: BeatProduct) => {
    if (!window.confirm(`¿Eliminar “${beat.title}”?`)) return
    if (isIdbSrc(beat.src)) await deleteMediaBlob(idbKeyFromSrc(beat.src))
    if (beat.cover && isIdbSrc(beat.cover)) await deleteMediaBlob(idbKeyFromSrc(beat.cover))
    setContent({ ...content, beats: content.beats.filter((b) => b.id !== beat.id) })
  }

  return (
    <section className="photo-manager">
      <header className="photo-manager__head">
        <div>
          <h2>Beats en venta</h2>
          <p>
            Sube el MP3 desde tu PC, portada, BPM, escala y hashtags (#drake) para mejorar
            búsqueda web.
          </p>
        </div>
      </header>

      <div className="photo-manager__controls" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        <label>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Midnight Drive" />
        </label>
        <label>
          Estilo / subtítulo
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Trap / Dark" />
        </label>
        <label>
          Precio (COP)
          <input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="numeric" />
        </label>
        <label>
          BPM
          <input value={bpm} onChange={(e) => setBpm(e.target.value)} inputMode="numeric" />
        </label>
        <label>
          Escala / key
          <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="Am, Fm..." />
        </label>
        <label>
          Hashtags SEO
          <input
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="#drake #trap #medellin"
          />
        </label>
        <label>
          Audio (MP3 / WAV)
          <input
            ref={audioRef}
            type="file"
            accept="audio/*,.mp3,.wav,.m4a"
            onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <label>
          Portada
          <input
            ref={coverRef}
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
        Disponible / en stock
      </label>

      <button type="button" className="btn btn--accent" disabled={busy} onClick={addBeat} style={{ width: 'fit-content' }}>
        {busy ? 'Subiendo…' : '+ Agregar beat'}
      </button>
      {msg && <p className="photo-manager__msg">{msg}</p>}
      {(audioFile || coverFile) && (
        <p className="photo-manager__msg">
          {audioFile ? `Audio: ${audioFile.name}` : ''}
          {audioFile && coverFile ? ' · ' : ''}
          {coverFile ? `Portada: ${coverFile.name}` : ''}
        </p>
      )}

      <div className="stack" style={{ gap: '1rem', marginTop: '1rem' }}>
        {content.beats.map((beat) => (
          <article key={beat.id} className="photo-manager__card" style={{ padding: '1rem', display: 'grid', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: '0.75rem' }}>
              {beat.cover ? <MediaImage src={beat.cover} alt="" className="audio-player__cover" /> : <div />}
              <div>
                <strong>{beat.title}</strong>
                <p className="photo-manager__meta">
                  {beat.subtitle ?? '—'} · {formatPrice(beat.price ?? 0)} · {beat.bpm ?? '—'} BPM ·{' '}
                  {beat.key ?? '—'} · {beat.inStock ? 'En stock' : 'Agotado'}
                </p>
                <p className="photo-manager__meta">
                  {(beat.tags ?? []).map((t) => `#${t}`).join(' ') || 'Sin hashtags'}
                </p>
                <p className="photo-manager__meta">
                  Audio: {beat.src ? (isIdbSrc(beat.src) ? 'Subido en este navegador' : beat.src) : 'Sin archivo'}
                </p>
              </div>
            </div>

            <div className="photo-manager__controls" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              <label>
                Título
                <input
                  value={beat.title}
                  onChange={(e) => updateBeat(beat.id, { title: e.target.value })}
                />
              </label>
              <label>
                Estilo
                <input
                  value={beat.subtitle ?? ''}
                  onChange={(e) => updateBeat(beat.id, { subtitle: e.target.value })}
                />
              </label>
              <label>
                Precio
                <input
                  value={String(beat.price ?? 0)}
                  onChange={(e) => updateBeat(beat.id, { price: Number(e.target.value) || 0 })}
                />
              </label>
              <label>
                BPM
                <input
                  value={String(beat.bpm ?? '')}
                  onChange={(e) => updateBeat(beat.id, { bpm: Number(e.target.value) || undefined })}
                />
              </label>
              <label>
                Escala
                <input
                  value={beat.key ?? ''}
                  onChange={(e) => updateBeat(beat.id, { key: e.target.value })}
                />
              </label>
              <label>
                Hashtags
                <input
                  value={tagsToInput(beat.tags)}
                  onChange={(e) => updateBeat(beat.id, { tags: parseHashtags(e.target.value) })}
                />
              </label>
              <label>
                Cambiar audio
                <input
                  type="file"
                  accept="audio/*,.mp3,.wav,.m4a"
                  onChange={(e) => replaceAudio(beat, e.target.files?.[0] ?? null)}
                />
              </label>
              <label>
                Cambiar portada
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => replaceCover(beat, e.target.files?.[0] ?? null)}
                />
              </label>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => updateBeat(beat.id, { inStock: !beat.inStock })}
              >
                {beat.inStock ? 'Marcar agotado' : 'Marcar en stock'}
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => removeBeat(beat)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
