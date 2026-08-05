export function ContactPage() {
  return (
    <div className="page">
      <p className="page__eyebrow">Booking</p>
      <h1 className="page__title">Contacto</h1>
      <p className="page__lead">
        Para shows y colaboraciones escribe a{' '}
        <a href="mailto:hola@djfritz.com" style={{ color: 'var(--accent)' }}>
          hola@djfritz.com
        </a>
        .
      </p>
    </div>
  )
}
