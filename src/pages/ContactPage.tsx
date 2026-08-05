import { site } from '../data/site'

export function ContactPage() {
  return (
    <div className="page">
      <p className="page__eyebrow">Booking</p>
      <h1 className="page__title">Contacto</h1>
      <p className="page__lead">Shows, beats y colaboraciones.</p>

      <div className="stack" style={{ marginTop: '2rem', maxWidth: '28rem' }}>
        <a href={`tel:${site.phoneTel}`} className="btn btn--accent">
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
