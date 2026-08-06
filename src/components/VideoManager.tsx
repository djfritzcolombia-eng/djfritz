import { useMemo, useState } from 'react'
import type { ShowFolder, ShowMedia } from '../data/site'
import { slugifyFolder } from '../data/site'
import { useContent } from '../content/content-context'
import { makeMediaId } from '../media/mediaDb'
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
  const [folderId, setFolderId] = useState('vivanti-aqua-fest-1')
  const [youtubeInput, setYoutubeInput] = useState('')
  const [title, setTitle] = useState('')
  const [msg, setMsg] = useState('')
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')

  const videoFolders = useMemo(
    () => content.folders.filter((f) => f.kind === 'videos'),
    [content.folders],
  )

  const videos = content.shows.filter((s) => s.type === 'youtube')

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

  const addVideo = () => {
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
    setMsg(`Video agregado a “${folder.name}”.`)
  }

  const removeVideo = (id: string) => {
    if (!window.confirm('¿Eliminar este video?')) return
    setContent({ ...content, shows: content.shows.filter((s) => s.id !== id) })
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
          <p>Carpetas como VIVANTI AQUA FEST 1 / 2. Agrega YouTube por ID o URL.</p>
        </div>
      </header>

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
        <label>
          YouTube ID / URL
          <input
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            placeholder="https://youtu.be/... o ID"
          />
        </label>
      </div>
      <button type="button" className="btn btn--accent" onClick={addVideo} style={{ width: 'fit-content' }}>
        + Agregar video
      </button>

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
                  <p className="photo-manager__meta">YouTube: {item.src}</p>
                  <button type="button" className="btn btn--ghost" onClick={() => removeVideo(item.id)}>
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
