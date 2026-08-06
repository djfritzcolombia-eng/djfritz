import { useMemo, useState } from 'react'
import { site, type SiteContent } from '../data/site'
import { useContent } from '../content/content-context'
import { PhotoManager } from '../components/PhotoManager'
import { VideoManager } from '../components/VideoManager'

type Section = keyof SiteContent

const sections: { id: Section; label: string; help: string }[] = [
  {
    id: 'folders',
    label: 'Folders JSON',
    help: 'Lista de carpetas (fotos/videos) con ciudad.',
  },
  {
    id: 'shows',
    label: 'Shows JSON',
    help: 'Avanzado: media de shows. Usa los gestores visuales de arriba.',
  },
  {
    id: 'sets',
    label: 'Sets (audio)',
    help: 'Pon el MP3 en public/media/audio/ y usa src "/media/audio/archivo.mp3".',
  },
  {
    id: 'beats',
    label: 'Beats en venta',
    help: 'Incluye price, bpm, cover y src del preview. inStock true/false.',
  },
  {
    id: 'remixes',
    label: 'Remix + download',
    help: 'downloadable true y downloadUrl "/media/remixes/archivo.zip".',
  },
  {
    id: 'shop',
    label: 'Shop merch',
    help: 'category: camisas | gorras | chaquetas | hoodies. Imagen en /media/shop/.',
  },
]

export function AdminPage() {
  const { content, setContent, resetContent } = useContent()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('fritz-admin') === '1')
  const [password, setPassword] = useState('')
  const [section, setSection] = useState<Section>('sets')
  const [draft, setDraft] = useState('')
  const [msg, setMsg] = useState('')

  const currentJson = useMemo(() => JSON.stringify(content[section], null, 2), [content, section])

  const unlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === site.adminPassword) {
      sessionStorage.setItem('fritz-admin', '1')
      setAuthed(true)
      setDraft(JSON.stringify(content.sets, null, 2))
      setMsg('')
    } else {
      setMsg('Clave incorrecta')
    }
  }

  const loadSection = (id: Section) => {
    setSection(id)
    setDraft(JSON.stringify(content[id], null, 2))
    setMsg('')
  }

  const saveSection = () => {
    try {
      const parsed = JSON.parse(draft)
      setContent({ ...content, [section]: parsed })
      setMsg('Guardado en este navegador.')
    } catch {
      setMsg('JSON inválido — revisa comas y comillas.')
    }
  }

  const exportAll = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fritz-content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!authed) {
    return (
      <div className="page">
        <p className="page__eyebrow">Internal</p>
        <h1 className="page__title">Admin</h1>
        <p className="page__lead">Panel interno para gestionar fotos y contenido.</p>
        <form className="form-grid" onSubmit={unlock}>
          <label>
            Clave
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          <button type="submit" className="btn btn--accent">
            Entrar
          </button>
          {msg && <p style={{ color: 'var(--accent)' }}>{msg}</p>}
        </form>
      </div>
    )
  }

  const help = sections.find((s) => s.id === section)?.help

  return (
    <div className="page" style={{ maxWidth: '64rem' }}>
      <p className="page__eyebrow">Internal</p>
      <h1 className="page__title">Admin</h1>
      <p className="page__lead">Sube, edita y elimina fotos. Clave: `adminPassword` en site.ts.</p>

      <PhotoManager />
      <VideoManager />

      <h2 style={{ color: 'var(--accent)', fontSize: '1.35rem', marginBottom: '0.75rem' }}>
        Otro contenido
      </h2>

      <div className="tabs">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={section === s.id ? 'is-active' : ''}
            onClick={() => loadSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p style={{ color: 'var(--muted)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>{help}</p>

      <textarea
        value={draft || currentJson}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={() => {
          if (!draft) setDraft(currentJson)
        }}
        style={{
          width: '100%',
          minHeight: '16rem',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '0.82rem',
          background: '#0a0a0a',
          color: 'var(--text)',
          border: '1px solid var(--line)',
          padding: '0.85rem',
        }}
        spellCheck={false}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1rem' }}>
        <button type="button" className="btn btn--accent" onClick={saveSection}>
          Guardar sección
        </button>
        <button type="button" className="btn btn--ghost" onClick={exportAll}>
          Exportar JSON
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            resetContent()
            setDraft(JSON.stringify(content[section], null, 2))
            setMsg('Contenido restaurado al semilla (incluye fotos Selina).')
          }}
        >
          Reset semilla
        </button>
      </div>
      {msg && <p style={{ color: 'var(--accent)', marginTop: '0.85rem' }}>{msg}</p>}
    </div>
  )
}
