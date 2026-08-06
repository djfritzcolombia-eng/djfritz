import { useMemo, useRef, useState } from 'react'
import type { ShowFolder, ShowMedia } from '../data/site'
import { slugifyFolder } from '../data/site'
import { useContent } from '../content/content-context'
import {
  deleteMediaBlob,
  idbKeyFromSrc,
  isIdbSrc,
  makeMediaId,
  saveMediaBlob,
} from '../media/mediaDb'
import './PhotoManager.css'

function extractYoutubeId(input: string) {
  const raw = input.trim()
  if (/^[\w-]{11}$/.test(raw)) return raw
  try {
    const url = new URL(raw)
    if (url.hostname.includes('youtu.be')) return url.pathname.slice(1).slice(0, 11)
    const v = url.searchParams.get('v')
    if (v) return v
  } catch {
    /* ignore */
  }
  return raw
}

export function VideoManager() {
  const { content, setContent } = useContent()
  const fileRef = useRef<HTMLInputElement>(null)
  const [folderId, setFolderId] = useState('vivanti-aqua-fest-1')
  const [mode, setMode] = useState<'youtube' | 'file'>('youtube')
  const [youtubeInput, setYoutubeInput] = useState('')
  const [title, setTitle] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')

  const videoFolders = useMemo(
    () => content.folders.filter((f) => f.kind === 'videos'),
    [content.folders],
  )

  const videos = content.shows.filter((s) => s.type === 'youtube' || s.type === 'video')

  const grouped = useMemo(() => {
    return videoFolders.map((folder) => ({
      folder,
      items: videos.filter((v) => v.folderId === folder.id),
    }))
  }, [videoFolders, videos])

  const createFolder = () => {
    const name = newName.trim()
    if (!name) return
    const id = slugifyFolder(name)
    if (content.folders.some((f) => f.id === id)) {
      setMsg('Esa carpeta de video ya existe.')
      return
    }
    const folder: ShowFolder = {
      id,
      name,
      location: newLocation.trim() || 'Por confirmar',
      kind: 'videos',
    }
    setContent({ ...content, folders: [...content.folders, folder] })
    setFolderId(id)
    setNewName('')
    setNewLocation('')
    setMsg(`Carpeta de video “${name}” creada.`)
  }

  const addYoutube = () => {
    const folder = content.folders.find((f) => f.id === folderId)
    if (!folder) return
    const yt = extractYoutubeId(youtubeInput)
    if (!yt || yt.length < 6) {
      setMsg('Pega un ID o URL de YouTube válida.')
      return
    }
    const item: ShowMedia = {
      id: makeMediaId(),
      type: 'youtube',
      title: title.trim() || folder.name,
      src: yt,
      folderId: folder.id,
      folder: folder.name,
      venue: folder.name,
      date: new Date().getFullYear().toString(),
    }
    setContent({ ...content, shows: [item, ...content.shows] })
    setYoutubeInput('')
    setTitle('')
    setMsg(`YouTube agregado a “${folder.name}”.`)
  }

  const addFile = async (files: FileList | null) => {
    if (!files?.length) return
    const folder = content.folders.find((f) => f.id === folderId)
    if (!folder) {
      setMsg('Elige una carpeta.')
      return
    }
    setBusy(true)
    setMsg('')
    try {
      const next: ShowMedia[] = [...content.shows]
      let n = 0
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('video/')) continue
        const id = makeMediaId()
        await saveMediaBlob(id, file)
        next.unshift({
          id,
          type: 'video',
          title: title.trim() || file.name.replace(/\.[^.]+$/, ''),
          src: `idb:${id}`,
          folderId: folder.id,
          folder: folder.name,
          venue: folder.name,
          date: new Date().getFullYear().toString(),
        })
        n += 1
      }
      setContent({ ...content, shows: next })
      setTitle('')
      if (fileRef.current) fileRef.current.value = ''
      setMsg(n ? `${n} video(s) subido(s) a “${folder.name}”.` : 'No se detectaron videos.')
    } catch (err) {
      console.error(err)
      setMsg('Error al subir. Prueba un archivo más liviano (MP4).')
    } finally {
      setBusy(false)
    }
  }

  const removeVideo = async (item: ShowMedia) => {
    if (!window.confirm('¿Eliminar este video?')) return
    if (item.type === 'video' && isIdbSrc(item.src)) {
      await deleteMediaBlob(idbKeyFromSrc(item.src))
    }
    setContent({ ...content, shows: content.shows.filter((s) => s.id !== item.id) })
  }

  const updateFolder = (id: string, patch: Partial<ShowFolder>) => {
    setContent({
      ...content,
      folders: content.folders.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    })
  }

  return (
    <section className="photo-manager">
      <header className="photo-manager__head">
        <div>
          <h2>Videos por carpeta</h2>
          <p>Sube desde tu PC (MP4) o pega un link de YouTube.</p>
        </div>
      </header>

      <div className="tabs" role="tablist" aria-label="Origen del video">
        <button
          type="button"
          className={mode === 'youtube' ? 'is-active' : ''}
          onClick={() => setMode('youtube')}
        >
          YouTube
        </button>
        <button
          type="button"
          className={mode === 'file' ? 'is-active' : ''}
          onClick={() => setMode('file')}
        >
          Subir archivo
        </button>
      </div>

      <div className="photo-manager__controls">
        <label>
          Carpeta
          <select value={folderId} onChange={(e) => setFolderId(e.target.value)}>
            {videoFolders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} · {f.location}
              </option>
            ))}
          </select>
        </label>
        <label>
          Título
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nombre del video" />
        </label>
        {mode === 'youtube' ? (
          <label>
            YouTube ID / URL
            <input
              value={youtubeInput}
              onChange={(e) => setYoutubeInput(e.target.value)}
              placeholder="https://youtu.be/... o ID"
            />
          </label>
        ) : (
          <label>
            Archivo de video
            <input
              ref={fileRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/*"
              multiple
              onChange={(e) => addFile(e.target.files)}
            />
          </label>
        )}
      </div>

      {mode === 'youtube' ? (
        <button type="button" className="btn btn--accent" onClick={addYoutube} style={{ width: 'fit-content' }}>
          + Agregar YouTube
        </button>
      ) : (
        <p className="photo-manager__msg">
          {busy ? 'Subiendo…' : 'Elige uno o varios MP4. Se guardan en este navegador.'}
        </p>
      )}

      <div className="photo-manager__controls" style={{ marginTop: '1rem' }}>
        <label>
          Nueva carpeta video
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nombre" />
        </label>
        <label>
          Ciudad
          <input
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Ciudad"
          />
        </label>
        <button type="button" className="btn btn--ghost" onClick={createFolder}>
          Crear carpeta
        </button>
      </div>

      {msg && <p className="photo-manager__msg">{msg}</p>}

      {grouped.map(({ folder, items }) => (
        <div key={folder.id} className="photo-manager__group">
          <div className="photo-manager__group-head">
            <h3>
              ▶ {folder.name} <span>({items.length})</span>
            </h3>
            <label>
              Ciudad
              <input
                value={folder.location}
                onChange={(e) => updateFolder(folder.id, { location: e.target.value })}
              />
            </label>
          </div>
          {items.length === 0 ? (
            <p className="photo-manager__empty">Sin videos aún.</p>
          ) : (
            <div className="stack">
              {items.map((item) => (
                <div key={item.id} className="photo-manager__card" style={{ padding: '0.85rem' }}>
                  <strong>{item.title}</strong>
                  <p className="photo-manager__meta">
                    {item.type === 'youtube'
                      ? `YouTube: ${item.src}`
                      : 'Archivo subido en este navegador'}
                  </p>
                  <button type="button" className="btn btn--ghost" onClick={() => removeVideo(item)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
