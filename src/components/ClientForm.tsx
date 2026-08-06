import { type FormEvent, useState } from 'react'
import { openWhatsApp } from '../lib/whatsapp'
import './ClientForm.css'

export type ClientIntent = 'merch' | 'beats' | 'booking'

export type CartLine = {
  name: string
  qty: number
  priceLabel: string
  kind: 'beat' | 'merch'
}

type Props = {
  defaultIntent?: ClientIntent
  /** Fija el modo y oculta las pestañas */
  lockedIntent?: ClientIntent
  cartLines?: CartLine[]
  cartTotalLabel?: string
  submitLabel?: string
  onSuccess?: () => void
}

const intentCopy: Record<ClientIntent, { label: string; lead: string }> = {
  merch: {
    label: 'Mercancía',
    lead: 'Regístrate para comprar merch. Pedimos datos de envío.',
  },
  beats: {
    label: 'Beats',
    lead: 'Compra o agenda un beat. Lo enviamos al correo que indiques.',
  },
  booking: {
    label: 'Separar fecha',
    lead: 'Reserva de DJ set: fecha, evento y producción técnica.',
  },
}

function detectCartIntent(lines: CartLine[] | undefined): ClientIntent {
  if (!lines?.length) return 'booking'
  const hasMerch = lines.some((l) => l.kind === 'merch')
  const hasBeats = lines.some((l) => l.kind === 'beat')
  if (hasMerch && !hasBeats) return 'merch'
  if (hasBeats && !hasMerch) return 'beats'
  return 'merch'
}

export function ClientForm({
  defaultIntent = 'booking',
  lockedIntent,
  cartLines,
  cartTotalLabel,
  submitLabel,
  onSuccess,
}: Props) {
  const initial = lockedIntent ?? (cartLines?.length ? detectCartIntent(cartLines) : defaultIntent)
  const [intent, setIntent] = useState<ClientIntent>(initial)
  const [sent, setSent] = useState(false)

  const active = lockedIntent ?? intent
  const hasMerch = (cartLines ?? []).some((l) => l.kind === 'merch') || active === 'merch'
  const hasBeats = (cartLines ?? []).some((l) => l.kind === 'beat') || active === 'beats'
  const needShipping = active === 'merch' || hasMerch
  const needBeatEmail = active === 'beats' || hasBeats

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (key: string) => String(data.get(key) || '').trim()

    const name = get('name')
    const phone = get('phone')
    const email = get('email')
    const notes = get('notes')
    const lines: string[] = []

    if (active === 'booking') {
      const production = [
        data.get('prod_sound') ? 'Sonido' : null,
        data.get('prod_lights') ? 'Luces' : null,
        data.get('prod_fx') ? 'FX' : null,
        data.get('prod_screens') ? 'Pantallas' : null,
      ].filter(Boolean)

      lines.push(
        'Hola Fritz, quiero separar una fecha para DJ set.',
        `Nombre: ${name}`,
        `Celular: ${phone}`,
        email ? `Email: ${email}` : '',
        `Fecha: ${get('date')}`,
        `Tipo de evento: ${get('eventType')}`,
        `Asistentes: ${get('attendees')}`,
        `Producción técnica: ${production.length ? production.join(', ') : 'Por definir'}`,
        notes ? `Notas: ${notes}` : '',
      )
    } else if (active === 'beats' && !cartLines?.length) {
      lines.push(
        'Hola Fritz, registro / compra de beat.',
        `Nombre: ${name}`,
        `Celular: ${phone}`,
        `Email (entrega del beat): ${email}`,
        get('style') ? `Estilo: ${get('style')}` : '',
        notes ? `Detalle: ${notes}` : '',
        'Entrega: por correo electrónico.',
      )
    } else if (active === 'merch' && !cartLines?.length) {
      lines.push(
        'Hola Fritz, registro / compra de mercancía.',
        `Nombre: ${name}`,
        `Celular: ${phone}`,
        `Email: ${email}`,
        `Dirección: ${get('address')}`,
        `Ciudad: ${get('city')}`,
        get('region') ? `Departamento / barrio: ${get('region')}` : '',
        notes ? `Notas envío: ${notes}` : '',
      )
    } else {
      lines.push('Hola Fritz, quiero completar mi compra.')
      lines.push(`Nombre: ${name}`, `Celular: ${phone}`, `Email: ${email}`)
      if (needBeatEmail) lines.push(`Entrega beats al correo: ${email}`)
      if (needShipping) {
        lines.push(
          `Dirección: ${get('address')}`,
          `Ciudad: ${get('city')}`,
          get('region') ? `Departamento / barrio: ${get('region')}` : '',
        )
      }
      if (notes) lines.push(`Notas: ${notes}`)
    }

    if (cartLines?.length) {
      lines.push('', 'Pedido:')
      for (const item of cartLines) {
        lines.push(`• ${item.name} x${item.qty} — ${item.priceLabel} (${item.kind})`)
      }
      if (cartTotalLabel) lines.push(`Total: ${cartTotalLabel}`)
    }

    openWhatsApp(lines.filter(Boolean).join('\n'))
    setSent(true)
    onSuccess?.()
  }

  return (
    <div className="client-form">
      {!lockedIntent && !cartLines?.length && (
        <div className="tabs client-form__tabs" role="tablist" aria-label="Tipo de solicitud">
          {(Object.keys(intentCopy) as ClientIntent[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              className={active === key ? 'is-active' : ''}
              onClick={() => {
                setIntent(key)
                setSent(false)
              }}
            >
              {intentCopy[key].label}
            </button>
          ))}
        </div>
      )}

      <p className="client-form__lead">
        {cartLines?.length
          ? needShipping && needBeatEmail
            ? 'Completa tus datos. Beats van por correo; merch necesita dirección de envío.'
            : needShipping
              ? 'Completa tus datos de envío para la mercancía.'
              : 'Indica el correo donde enviaremos tus beats.'
          : intentCopy[active].lead}
      </p>

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Nombre
          <input name="name" required autoComplete="name" placeholder="Tu nombre" />
        </label>

        <label>
          Celular / WhatsApp
          <input name="phone" required autoComplete="tel" placeholder="300..." />
        </label>

        {(active !== 'booking' || needBeatEmail) && (
          <label>
            {needBeatEmail ? 'Correo (entrega del beat)' : 'Correo'}
            <input
              name="email"
              type="email"
              required={active !== 'booking'}
              autoComplete="email"
              placeholder="tu@email.com"
            />
          </label>
        )}

        {active === 'booking' && !cartLines?.length && (
          <>
            <label>
              Fecha del evento
              <input name="date" type="date" required />
            </label>
            <label>
              Tipo de evento
              <select name="eventType" required defaultValue="">
                <option value="" disabled>
                  Elige tipo
                </option>
                <option>Club / discoteca</option>
                <option>Festival</option>
                <option>Privado / corporativo</option>
                <option>Cumpleaños</option>
                <option>Boda</option>
                <option>Otro</option>
              </select>
            </label>
            <label>
              Asistentes (aprox.)
              <input name="attendees" required placeholder="Ej. 200" />
            </label>
            <fieldset className="client-form__checks">
              <legend>Producción técnica</legend>
              <label>
                <input type="checkbox" name="prod_sound" value="1" /> Sonido
              </label>
              <label>
                <input type="checkbox" name="prod_lights" value="1" /> Luces
              </label>
              <label>
                <input type="checkbox" name="prod_fx" value="1" /> FX
              </label>
              <label>
                <input type="checkbox" name="prod_screens" value="1" /> Pantallas
              </label>
            </fieldset>
            <label>
              Notas adicionales
              <textarea
                name="notes"
                placeholder="Ciudad, venue, horarios, rider, referencias..."
              />
            </label>
          </>
        )}

        {active === 'beats' && !cartLines?.length && (
          <>
            <label>
              Estilo (opcional)
              <select name="style" defaultValue="">
                <option value="">Sin especificar</option>
                <option>Trap</option>
                <option>Reggaetón</option>
                <option>House</option>
                <option>Afrobeats</option>
                <option>Otro</option>
              </select>
            </label>
            <label>
              Detalle / referencias
              <textarea name="notes" placeholder="Beat a comprar, mood, tempo..." />
            </label>
          </>
        )}

        {needShipping && (active === 'merch' || Boolean(cartLines?.length)) && (
          <>
            <label>
              Dirección de envío
              <input name="address" required placeholder="Calle, número, apto" />
            </label>
            <label>
              Ciudad
              <input name="city" required placeholder="Medellín, Cali..." />
            </label>
            <label>
              Departamento / barrio
              <input name="region" placeholder="Antioquia / El Poblado" />
            </label>
            {(active === 'merch' || Boolean(cartLines?.length)) && (
              <label>
                Notas de envío
                <textarea name="notes" placeholder="Horario, referencias, talla..." />
              </label>
            )}
          </>
        )}

        {cartLines && cartLines.length > 0 && (
          <div className="client-form__cart">
            <strong>Tu pedido</strong>
            <ul>
              {cartLines.map((line) => (
                <li key={`${line.kind}-${line.name}`}>
                  {line.name} x{line.qty} — {line.priceLabel}
                </li>
              ))}
            </ul>
            {cartTotalLabel && <p>Total: {cartTotalLabel}</p>}
          </div>
        )}

        <button type="submit" className="btn btn--accent">
          {submitLabel ?? 'Enviar por WhatsApp'}
        </button>

        {sent && (
          <p className="client-form__ok">
            Listo — se abrió WhatsApp con tu registro. Te confirmamos por ahí.
          </p>
        )}
      </form>
    </div>
  )
}
