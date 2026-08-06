import { site } from '../data/site'

export function openWhatsApp(message: string) {
  const text = encodeURIComponent(message)
  window.open(`https://wa.me/${site.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer')
}
