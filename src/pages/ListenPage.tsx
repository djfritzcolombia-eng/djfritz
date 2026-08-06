import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AudioPlayer } from '../components/AudioPlayer'
import { YoutubeEmbed } from '../components/YoutubeEmbed'
import { useCart } from '../cart/CartContext'
import { useContent } from '../content/content-context'
import { formatPrice } from '../data/site'

type Tab = 'sets' | 'beats' | 'videos' | 'remixes'

function tabFromParam(value: string | null): Tab {
  if (value === 'beats' || value === 'videos' || value === 'remixes' || value === 'sets') {
    return value
  }
  return 'sets'
}

export function ListenPage() {
  const { content } = useContent()
  const { addItem } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab = tabFromParam(searchParams.get('tab'))

  const setTab = (next: Tab) => {
    setSearchParams(next === 'sets' ? {} : { tab: next }, { replace: true })
  }

  const tabs = useMemo(
    () =>
      [
        { id: 'sets' as const, label: 'Sets' },
        { id: 'beats' as const, label: 'Beats en venta' },
        { id: 'videos' as const, label: 'Video sets' },
        { id: 'remixes' as const, label: 'Remix' },
      ] as const,
    [],
  )

  return (
    <div className="page">
      <p className="page__eyebrow">Listen</p>
      <h1 className="page__title">Escuchar</h1>
      <p className="page__lead">Sets, beats, video sets y remixes. Simple y directo.</p>

      <div className="tabs" role="tablist" aria-label="Secciones de audio">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? 'is-active' : ''}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'sets' && (
        <div className="stack">
          {content.sets.map((track) => (
            <AudioPlayer key={track.id} {...track} />
          ))}
        </div>
      )}

      {tab === 'beats' && (
        <div className="stack">
          <p style={{ color: 'var(--muted)', marginBottom: '0.5rem' }}>
            ¿Quieres un beat a tu medida?{' '}
            <Link to="/beats" style={{ color: 'var(--accent)' }}>
              Agenda la creación
            </Link>
          </p>
          {content.beats.map((beat) => (
            <div key={beat.id} className="stack" style={{ gap: '0.5rem' }}>
              <AudioPlayer
                src={beat.src}
                title={beat.title}
                subtitle={`${beat.subtitle ?? ''}${beat.bpm ? ` · ${beat.bpm} BPM` : ''}${beat.price ? ` · ${formatPrice(beat.price)}` : ''}`}
                cover={beat.cover}
              />
              <button
                type="button"
                className="btn btn--accent"
                style={{ width: 'fit-content' }}
                disabled={!beat.inStock || !beat.price}
                onClick={() =>
                  addItem({
                    id: beat.id,
                    kind: 'beat',
                    name: beat.title,
                    price: beat.price ?? 0,
                    image: beat.cover,
                  })
                }
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'videos' && (
        <div className="stack">
          {content.shows.filter((v) => v.type === 'youtube').length === 0 && (
            <p style={{ color: 'var(--muted)' }}>
              Los video sets viven en Shows → Videos. Agrégalos en Admin.
            </p>
          )}
          {content.shows
            .filter((v) => v.type === 'youtube')
            .map((v) => (
              <div key={v.id}>
                <p style={{ marginBottom: '0.5rem', color: 'var(--muted)' }}>{v.title}</p>
                <YoutubeEmbed youtubeId={v.src} title={v.title} />
              </div>
            ))}
        </div>
      )}

      {tab === 'remixes' && (
        <div className="stack">
          {content.remixes.map((rx) => (
            <div key={rx.id} className="stack" style={{ gap: '0.5rem' }}>
              <AudioPlayer {...rx} />
              {rx.downloadable && rx.downloadUrl ? (
                <a className="btn btn--ghost" style={{ width: 'fit-content' }} href={rx.downloadUrl} download>
                  Download
                </a>
              ) : (
                <em style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                  Archivo de descarga pendiente en Admin
                </em>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
