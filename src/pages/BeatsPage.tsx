import { Link } from 'react-router-dom'
import { AudioPlayer } from '../components/AudioPlayer'
import { ClientForm } from '../components/ClientForm'
import { useCart } from '../cart/CartContext'
import { useContent } from '../content/content-context'
import { formatPrice } from '../data/site'

export function BeatsPage() {
  const { content } = useContent()
  const { addItem } = useCart()

  return (
    <div className="page">
      <p className="page__eyebrow">Studio</p>
      <h1 className="page__title">Beats</h1>
      <p className="page__lead">
        Compra beats listos o agenda uno a medida. También en{' '}
        <Link to="/escuchar" style={{ color: 'var(--accent)' }}>
          Escuchar → Beats en venta
        </Link>
        .
      </p>

      <h2 style={{ color: 'var(--accent)', marginTop: '2.5rem', fontSize: '1.6rem' }}>Beats en venta</h2>
      <div className="stack" style={{ marginTop: '1rem' }}>
        {content.beats.map((beat) => (
          <div key={beat.id} className="stack" style={{ gap: '0.5rem' }}>
            <AudioPlayer
              src={beat.src}
              title={beat.title}
              subtitle={`${beat.subtitle ?? ''} · ${formatPrice(beat.price ?? 0)}`}
              cover={beat.cover}
            />
            <button
              type="button"
              className="btn btn--accent"
              style={{ width: 'fit-content' }}
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

      <h2 style={{ color: 'var(--accent)', marginTop: '3rem', fontSize: '1.6rem' }}>
        Agenda o registra tu beat
      </h2>
      <ClientForm lockedIntent="beats" submitLabel="Enviar por WhatsApp" />
    </div>
  )
}
