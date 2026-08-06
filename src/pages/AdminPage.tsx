import { useMemo, useState } from 'react'
import { type SiteContent } from '../data/site'
import { useContent } from '../content/content-context'
import { PhotoManager } from '../components/PhotoManager'
import { VideoManager } from '../components/VideoManager'
import { BeatManager } from '../components/BeatManager'
import {
  loadAdminCreds,
  saveAdminCreds,
  verifyAdminLogin,
} from '../lib/adminAuth'
import './AdminPage.css'

type Section = keyof SiteContent
type AdminView =
  | 'fotos'
  | 'videos'
  | 'beats'
  | 'redes'
  | 'seguridad'
  | 'avanzado'

const navItems: { id: AdminView; label: string; hint: string }[] = [
  { id: 'fotos', label: 'Fotos', hint: 'Carpetas y galerías de shows' },
  { id: 'videos', label: 'Videos', hint: 'YouTube o archivo desde PC' },
  { id: 'beats', label: 'Beats', hint: 'Audio, portada, BPM y hashtags' },
  { id: 'redes', label: 'Redes', hint: 'Instagram y presencia web' },
  { id: 'seguridad', label: 'Seguridad', hint: 'Cambiar clave de acceso' },
  { id: 'avanzado', label: 'Avanzado', hint: 'JSON sets / shop / remix' },
]

const advancedSections: { id: Section; label: string; help: string }[] = [
  {
    id: 'folders',
    label: 'Folders JSON',
    help: 'Lista de carpetas (fotos/videos) con ciudad.',
  },
  {
    id: 'shows',
    label: 'Shows JSON',
    help: 'Avanzado: media de shows.',
  },
  {
    id: 'sets',
    label: 'Sets (audio)',
    help: 'MP3 en public/media/audio/ → src "/media/audio/archivo.mp3".',
  },
  {
    id: 'remixes',
    label: 'Remix + download',
    help: 'downloadable true y downloadUrl.',
  },
  {
    id: 'shop',
    label: 'Shop merch',
    help: 'category: camisas | gorras | chaquetas | hoodies.',
  },
]

export function AdminPage() {
  const { content, setContent, resetContent } = useContent()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('fritz-admin') === '1')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState<AdminView>('fotos')
  const [section, setSection] = useState<Section>('sets')
  const [draft, setDraft] = useState('')
  const [msg, setMsg] = useState('')

  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [credMsg, setCredMsg] = useState('')
  const [instagram, setInstagram] = useState(content.settings.instagram)

  const currentJson = useMemo(() => JSON.stringify(content[section], null, 2), [content, section])

  const unlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (verifyAdminLogin(username, password)) {
      sessionStorage.setItem('fritz-admin', '1')
      setAuthed(true)
      setDraft(JSON.stringify(content.sets, null, 2))
      setMsg('')
      setPassword('')
    } else {
      setMsg('Usuario o clave incorrectos')
    }
  }

  const logout = () => {
    sessionStorage.removeItem('fritz-admin')
    setAuthed(false)
    setUsername('')
    setPassword('')
  }

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault()
    const creds = loadAdminCreds()
    if (currentPass !== creds.password) {
      setCredMsg('La clave actual no coincide.')
      return
    }
    if (newPass.length < 6) {
      setCredMsg('La nueva clave debe tener al menos 6 caracteres.')
      return
    }
    if (newPass !== confirmPass) {
      setCredMsg('La confirmación no coincide.')
      return
    }
    saveAdminCreds({ username: creds.username, password: newPass })
    setCurrentPass('')
    setNewPass('')
    setConfirmPass('')
    setCredMsg('Clave actualizada en este navegador.')
  }

  const saveInstagram = (e: React.FormEvent) => {
    e.preventDefault()
    const url = instagram.trim()
    setContent({
      ...content,
      settings: { ...content.settings, instagram: url },
    })
    setMsg('Instagram guardado.')
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
            Usuario
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Fritz"
              autoComplete="username"
              required
            />
          </label>
          <label>
            Clave
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
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

  const help = advancedSections.find((s) => s.id === section)?.help
  const creds = loadAdminCreds()
  const activeNav = navItems.find((n) => n.id === view)

  return (
    <div className="admin page">
      <div className="admin__top">
        <div>
          <p className="page__eyebrow">Internal</p>
          <h1 className="page__title">Admin</h1>
          <p className="page__lead">Sesión: {creds.username}</p>
        </div>
        <button type="button" className="btn btn--ghost" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <div className="admin__layout">
        <nav className="admin__nav" aria-label="Secciones admin">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={view === item.id ? 'is-active' : ''}
              onClick={() => {
                setView(item.id)
                setMsg('')
                if (item.id === 'redes') setInstagram(content.settings.instagram)
              }}
            >
              <strong>{item.label}</strong>
              <span>{item.hint}</span>
            </button>
          ))}
        </nav>

        <div className="admin__panel">
          <header className="admin__panel-head">
            <h2>{activeNav?.label}</h2>
            <p>{activeNav?.hint}</p>
          </header>

          {view === 'fotos' && <PhotoManager />}
          {view === 'videos' && <VideoManager />}
          {view === 'beats' && <BeatManager />}

          {view === 'redes' && (
            <form className="form-grid" onSubmit={saveInstagram} style={{ maxWidth: '34rem' }}>
              <label>
                Instagram (URL completa)
                <input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://www.instagram.com/tuusuario"
                  required
                />
              </label>
              <button type="submit" className="btn btn--accent">
                Guardar Instagram
              </button>
              {msg && <p style={{ color: 'var(--accent)' }}>{msg}</p>}
            </form>
          )}

          {view === 'seguridad' && (
            <form className="form-grid" onSubmit={changePassword} style={{ maxWidth: '34rem' }}>
              <label>
                Clave actual
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  required
                />
              </label>
              <label>
                Nueva clave
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  required
                  minLength={6}
                />
              </label>
              <label>
                Confirmar nueva clave
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                  minLength={6}
                />
              </label>
              <button type="submit" className="btn btn--accent">
                Guardar nueva clave
              </button>
              {credMsg && <p style={{ color: 'var(--accent)' }}>{credMsg}</p>}
            </form>
          )}

          {view === 'avanzado' && (
            <>
              <div className="tabs">
                {advancedSections.map((s) => (
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
                className="admin__json"
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
                    setMsg('Contenido restaurado al semilla.')
                  }}
                >
                  Reset semilla
                </button>
              </div>
              {msg && <p style={{ color: 'var(--accent)', marginTop: '0.85rem' }}>{msg}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
