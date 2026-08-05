import { useRef, useState } from 'react'
import type { ShowMedia } from '../data/site'
import { useContent } from '../content/content-context'
import { MediaImage } from './MediaImage'
import {
  compressImageFile,
  deleteMediaBlob,
  isIdbSrc,
  idbKeyFromSrc,
  makeMediaId,
  saveMediaBlob,
} from '../media/mediaDb'
import './PhotoManager.css'

type Props = {
  defaultVenue?: string
}

export function PhotoManager({ defaultVenue = 'Selina Medellín' }: Props) {
  const { content, setContent } = useContent()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [venue, setVenue] = useState(defaultVenue)
  const [titlePrefix, setTitlePrefix] = useState('Selina Medellín')

  const photos = content.shows.filter((s) => s.type === 'photo')

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    setMsg('')
    try {
      const next: ShowMedia[] = [...content.shows]
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue
        const id = makeMediaId()
        const blob = await compressImageFile(file)
        await saveMediaBlob(id, blob)
        next.unshift({
          id,
          type: 'photo',
          title: titlePrefix || file.name.replace(/\.[^.]+$/, ''),
          src: `idb:${id}`,
          venue: venue || undefined,
          date: new Date().getFullYear().toString(),
        })
      }
      setContent({ ...content, shows: next })
      setMsg(`${files.length} foto(s) agregada(s). Ya se ven en Shows.`)
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Error al subir')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removePhoto = async (item: ShowMedia) => {
    const ok = window.confirm(`¿Quitar “${item.title}” de la galería?`)
    if (!ok) return
    if (isIdbSrc(item.src)) {
      await deleteMediaBlob(idbKeyFromSrc(item.src))
    }
    setContent({
      ...content,
      shows: content.shows.filter((s) => s.id !== item.id),
    })
    setMsg('Foto eliminada de la galería.')
  }

  const updateField = (id: string, patch: Partial<ShowMedia>) => {
    setContent({
      ...content,
      shows: content.shows.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    })
  }

  return (
    <section className="photo-manager">
      <header className="photo-manager__head">
        <div>
          <h2>Administrar fotos</h2>
          <p>
            Sube desde iCloud/Finder, edita título/venue y elimina las que no quieras. Las fotos nuevas
            quedan en este navegador; las de <code>/media/shows/</code> viven en el proyecto (deploy).
          </p>
        </div>
      </header>

      <div className="photo-manager__controls">
        <label>
          Venue
          <input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Selina Medellín" />
        </label>
        <label>
          Título base
          <input
            value={titlePrefix}
            onChange={(e) => setTitlePrefix(e.target.value)}
            placeholder="Selina Medellín"
          />
        </label>
        <button
          type="button"
          className="btn btn--accent"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? 'Subiendo…' : '+ Subir fotos'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {msg && <p className="photo-manager__msg">{msg}</p>}

      <div className="photo-manager__grid">
        {photos.map((item) => (
          <article key={item.id} className="photo-manager__card">
            <MediaImage src={item.src} alt={item.title} />
            <div className="photo-manager__fields">
              <label>
                Título
                <input
                  value={item.title}
                  onChange={(e) => updateField(item.id, { title: e.target.value })}
                />
              </label>
              <label>
                Venue
                <input
                  value={item.venue ?? ''}
                  onChange={(e) => updateField(item.id, { venue: e.target.value })}
                />
              </label>
              <p className="photo-manager__meta">
                {isIdbSrc(item.src) ? 'Subida local (este navegador)' : 'Archivo del proyecto'}
              </p>
              <button type="button" className="btn btn--ghost photo-manager__delete" onClick={() => removePhoto(item)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      {!photos.length && (
        <p className="photo-manager__empty">Aún no hay fotos. Sube las de Selina u otras desde el botón.</p>
      )}
    </section>
  )
}
