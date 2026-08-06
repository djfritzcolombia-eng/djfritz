import { useMemo, useRef, useState } from 'react'
import type { ShowFolder, ShowMedia } from '../data/site'
import { slugifyFolder } from '../data/site'
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

export function PhotoManager() {
  const { content, setContent } = useContent()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [folderId, setFolderId] = useState('selina-medellin')
  const [filterFolder, setFilterFolder] = useState<string>('all')
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')

  const photoFolders = useMemo(
    () => content.folders.filter((f) => f.kind === 'photos'),
    [content.folders],
  )

  const photos = content.shows.filter((s) => s.type === 'photo')

  const visiblePhotos = useMemo(
    () => (filterFolder === 'all' ? photos : photos.filter((p) => p.folderId === filterFolder)),
    [photos, filterFolder],
  )

  const grouped = useMemo(() => {
    const map = new Map<string, ShowMedia[]>()
    for (const photo of visiblePhotos) {
      const list = map.get(photo.folderId) ?? []
      list.push(photo)
      map.set(photo.folderId, list)
    }
    return photoFolders
      .filter((f) => filterFolder === 'all' || f.id === filterFolder)
      .map((folder) => ({ folder, items: map.get(folder.id) ?? [] }))
  }, [visiblePhotos, photoFolders, filterFolder])

  const createFolder = () => {
    const name = newName.trim()
    if (!name) {
      setMsg('Escribe el nombre de la carpeta.')
      return
    }
    const id = slugifyFolder(name)
    if (content.folders.some((f) => f.id === id)) {
      setMsg('Esa carpeta ya existe.')
      return
    }
    const folder: ShowFolder = {
      id,
      name,
      location: newLocation.trim() || 'Por confirmar',
      kind: 'photos',
    }
    setContent({ ...content, folders: [...content.folders, folder] })
    setFolderId(id)
    setFilterFolder(id)
    setNewName('')
    setNewLocation('')
    setMsg(`Carpeta “${name}” creada.`)
  }

  const updateFolder = (id: string, patch: Partial<ShowFolder>) => {
    setContent({
      ...content,
      folders: content.folders.map((f) => (f.id === id ? { ...f, ...patch } : f)),
      shows: content.shows.map((s) =>
        s.folderId === id && patch.name
          ? { ...s, folder: patch.name, venue: patch.name }
          : s,
      ),
    })
  }

  const addFiles = async (files: FileList | null) => {
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
        if (!file.type.startsWith('image/')) continue
        const id = makeMediaId()
        const blob = await compressImageFile(file)
        await saveMediaBlob(id, blob)
        n += 1
        next.unshift({
          id,
          type: 'photo',
          title: `${folder.name} ${String(n).padStart(2, '0')}`,
          src: `idb:${id}`,
          venue: folder.name,
          folder: folder.name,
          folderId: folder.id,
          date: new Date().getFullYear().toString(),
        })
      }
      setContent({ ...content, shows: next })
      setFilterFolder(folder.id)
      setMsg(`${n} foto(s) en “${folder.name}”.`)
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Error al subir')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removePhoto = async (item: ShowMedia) => {
    if (!window.confirm(`¿Quitar “${item.title}”?`)) return
    if (isIdbSrc(item.src)) await deleteMediaBlob(idbKeyFromSrc(item.src))
    setContent({ ...content, shows: content.shows.filter((s) => s.id !== item.id) })
    setMsg('Foto eliminada.')
  }

  return (
    <section className="photo-manager">
      <header className="photo-manager__head">
        <div>
          <h2>Fotos por carpeta</h2>
          <p>Elige carpeta + ciudad, sube fotos o edita ubicaciones. Carpetas vacías también aparecen en Shows.</p>
        </div>
      </header>

      <div className="photo-manager__controls">
        <label>
          Subir a carpeta
          <select value={folderId} onChange={(e) => setFolderId(e.target.value)}>
            {photoFolders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} · {f.location}
              </option>
            ))}
          </select>
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

      <div className="photo-manager__controls">
        <label>
          Nueva carpeta
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nombre venue" />
        </label>
        <label>
          Ciudad
          <input
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Medellín, Bogotá..."
          />
        </label>
        <button type="button" className="btn btn--ghost" onClick={createFolder}>
          Crear carpeta
        </button>
      </div>

      <div className="photo-manager__filters">
        <button
          type="button"
          className={filterFolder === 'all' ? 'is-active' : ''}
          onClick={() => setFilterFolder('all')}
        >
          Todas
        </button>
        {photoFolders.map((f) => (
          <button
            key={f.id}
            type="button"
            className={filterFolder === f.id ? 'is-active' : ''}
            onClick={() => setFilterFolder(f.id)}
          >
            {f.name}
          </button>
        ))}
      </div>

      {msg && <p className="photo-manager__msg">{msg}</p>}

      {grouped.map(({ folder, items }) => (
        <div key={folder.id} className="photo-manager__group">
          <div className="photo-manager__group-head">
            <h3>
              📁 {folder.name} <span>({items.length})</span>
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
            <p className="photo-manager__empty">Sin fotos — súbelas con el botón de arriba.</p>
          ) : (
            <div className="photo-manager__grid">
              {items.map((item) => (
                <article key={item.id} className="photo-manager__card">
                  <MediaImage src={item.src} alt={item.title} />
                  <div className="photo-manager__fields">
                    <label>
                      Título
                      <input
                        value={item.title}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            shows: content.shows.map((s) =>
                              s.id === item.id ? { ...s, title: e.target.value } : s,
                            ),
                          })
                        }
                      />
                    </label>
                    <p className="photo-manager__meta">
                      {isIdbSrc(item.src) ? 'Subida local' : 'Archivo del proyecto'} · {folder.location}
                    </p>
                    <button
                      type="button"
                      className="btn btn--ghost photo-manager__delete"
                      onClick={() => removePhoto(item)}
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  )
}
