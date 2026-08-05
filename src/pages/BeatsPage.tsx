import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { AudioPlayer } from '../components/AudioPlayer'
import { useCart } from '../cart/CartContext'
import { useContent } from '../content/content-context'
import { formatPrice, site } from '../data/site'

export function BeatsPage() {
  const { content } = useContent()
  const { addItem } = useCart()
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const phone = String(data.get('phone') || '')
    const style = String(data.get('style') || '')
    const notes = String(data.get('notes') || '')
    const text = encodeURIComponent(
      `Hola Fritz, quiero agendar un beat.\nNombre: ${name}\nEmail: ${email}\nCel: ${phone}\nEstilo: ${style}\nDetalle: ${notes}`,
    )
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, '_blank')
    setSent(true)
  }

  return (
    <div className="page">
      <p className="page__eyebrow">Studio</p>
      <h1 className="page__title">Beats</h1>
      <p className="page__lead">
        Compra beats listos o agenda la creación de uno contigo. También en{' '}
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
        Agenda la creación de un beat
      </h2>
      <p className="page__lead" style={{ marginTop: '0.75rem' }}>
        Cuéntame el estilo y te confirmo por WhatsApp o correo.
      </p>

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Nombre
          <input name="name" required placeholder="Tu nombre" />
        </label>
        <label>
          Correo
          <input name="email" type="email" required placeholder="tu@email.com" />
        </label>
        <label>
          Celular
          <input name="phone" required placeholder="300..." defaultValue="" />
        </label>
        <label>
          Estilo
          <select name="style" required defaultValue="">
            <option value="" disabled>
              Elige estilo
            </option>
            <option>Trap</option>
            <option>Reggaetón</option>
            <option>House</option>
            <option>Afrobeats</option>
            <option>Otro</option>
          </select>
        </label>
        <label>
          Detalle del beat
          <textarea name="notes" required placeholder="Referencias, tempo, mood..." />
        </label>
        <button type="submit" className="btn btn--accent">
          Enviar por WhatsApp
        </button>
        {sent && (
          <p style={{ color: 'var(--accent)' }}>
            Listo — se abrió WhatsApp. También puedes escribir a {site.email}.
          </p>
        )}
      </form>
    </div>
  )
}
