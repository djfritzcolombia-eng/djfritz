import { site } from '../data/site'
import { ClientForm } from '../components/ClientForm'

export function ContactPage() {
  return (
    <div className="page">
      <p className="page__eyebrow">Registro</p>
      <h1 className="page__title">Contacto</h1>
      <p className="page__lead">
        Regístrate para comprar beats, mercancía o separar una fecha. El formulario
        se adapta según lo que necesites.
      </p>

      <ClientForm defaultIntent="booking" />

      <div className="stack" style={{ marginTop: '3rem', maxWidth: '28rem' }}>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Contacto directo
        </p>
        <a href={`tel:${site.phoneTel}`} className="btn btn--ghost">
          Cel {site.phone}
        </a>
        <a href={`mailto:${site.email}`} className="btn btn--ghost">
          {site.email}
        </a>
        <a
          href={`https://wa.me/${site.whatsapp}`}
          className="btn btn--ghost"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}
