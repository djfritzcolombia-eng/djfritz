import { catalogBySection, catalogBrands, catalogProducts } from './catalog'
import type { MenuItem } from './menu'

export const site = {
  name: 'DJ Fritz',
  tagline: 'Equipos DJ, sonido e iluminación',
  phone: '312 643 3069',
  email: 'hola@djfritz.com',
  domain: 'www.djfritz.com',
  url: 'https://www.djfritz.com',
  city: 'Colombia',
}

export type Product = {
  id: string
  name: string
  brand: string
  price: number
  oldPrice?: number
  rating?: number
  reviews?: number
  badge?: 'nuevo' | 'oferta'
  image: string
  hue: number
  description?: string
  inStock?: boolean
}

export type Category = {
  id: string
  name: string
  href: string
  hue: number
}

/** @deprecated Usar primaryNav de menu.ts */
export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Controladores', href: '#controladores' },
  { label: 'Sonido', href: '#sonido' },
  { label: 'Iluminación', href: '#iluminacion' },
  { label: 'Accesorios', href: '#accesorios' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
]

/** Categorías legacy (marcas); el sidebar usa heroCategories de menu.ts */
export const categories: Category[] = [
  { id: 'pioneer', name: 'Pioneer DJ', href: '#controladores', hue: 210 },
  { id: 'hercules', name: 'Hercules', href: '#controladores', hue: 25 },
  { id: 'hk-audio', name: 'HK Audio', href: '#sonido', hue: 200 },
  { id: 'adam', name: 'Adam Audio', href: '#sonido', hue: 160 },
  { id: 'allen-heath', name: 'Allen & Heath', href: '#sonido', hue: 190 },
  { id: 'audio-technica', name: 'Audio-Technica', href: '#sonido', hue: 280 },
  { id: 'va-proled', name: 'VA Proled', href: '#iluminacion', hue: 45 },
  { id: 'moka', name: 'Moka SFX', href: '#iluminacion', hue: 320 },
  { id: 'pantallas', name: 'Pantallas LED', href: '#iluminacion', hue: 50 },
  { id: 'cases', name: 'Cases', href: '#accesorios', hue: 30 },
  { id: 'focusrite', name: 'Focusrite', href: '#sonido', hue: 0 },
  { id: 'novation', name: 'Novation', href: '#controladores', hue: 340 },
]

const fmt = (n: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(n)

export const formatPrice = fmt

/** Catálogo completo adaptado desde Vertice Audio */
export const products: Record<'sonido' | 'iluminacion' | 'dj' | 'accesorios', Product[]> = {
  sonido: catalogBySection.sonido,
  iluminacion: catalogBySection.iluminacion,
  dj: catalogBySection.dj,
  accesorios: catalogBySection.accesorios,
}

export const allProducts: Product[] = catalogProducts

export const featured: Product[] = [
  ...catalogProducts.filter((p) => p.badge === 'nuevo').slice(0, 4),
  ...catalogBySection.dj.slice(0, 2),
  ...catalogBySection.sonido.slice(0, 2),
]

export const brands: string[] = [...catalogBrands]

export const posts = [
  {
    id: 'p1',
    tag: 'Guías',
    title: 'Controlador vs CDJ: ¿qué setup te conviene?',
    excerpt: 'Comparamos flujo Pioneer, Hercules y presupuestos reales del catálogo.',
  },
  {
    id: 'p2',
    tag: 'Recomendaciones',
    title: 'Setup mínimo para fiestas privadas',
    excerpt: 'Cabina HK, luces VA Proled y cableado: la lista corta que funciona.',
  },
  {
    id: 'p3',
    tag: 'Tutoriales',
    title: 'Cómo armar un rack DJ con cases y monitors',
    excerpt: 'Cases, Audio-Technica y consolas: evita errores comunes al montar.',
  },
  {
    id: 'p4',
    tag: 'Noticias',
    title: 'Novedades Pioneer y luces LED del mes',
    excerpt: 'Lo último en controladores, CDJ y cabezas móviles disponible ahora.',
  },
]

export const trust = [
  {
    title: '100% Garantizado',
    text: 'Equipos revisados y garantía local en cada compra.',
  },
  {
    title: 'Medios de pago',
    text: 'Transferencia, efectivo contra entrega y tarjetas en compra segura.',
  },
  {
    title: 'Compra segura',
    text: 'Publicaciones moderadas y datos protegidos en cada transacción.',
  },
  {
    title: 'Envío nacional',
    text: 'Despachos a todo el país con seguimiento y embalaje profesional.',
  },
]

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const synonyms: Record<string, string[]> = {
  sonido: ['cabina', 'amplificador', 'monitor', 'consola', 'audio', 'hk', 'adam', 'yamaha'],
  iluminacion: ['led', 'cabeza', 'movil', 'humo', 'dmx', 'par', 'pantalla', 'proled', 'moka'],
  luces: ['led', 'cabeza', 'movil', 'humo', 'dmx', 'par', 'pantalla'],
  controladores: ['controlador', 'ddj', 'cdj', 'djm', 'pioneer', 'hercules', 'novation'],
  controlador: ['ddj', 'cdj', 'pioneer', 'hercules'],
  tornamesas: ['tornamesa', 'cdj', 'plato'],
  dj: ['ddj', 'cdj', 'djm', 'pioneer', 'hercules', 'rekordbox', 'serato'],
  pioneer: ['pioneer', 'ddj', 'cdj', 'djm'],
  hercules: ['hercules'],
  accesorios: ['cable', 'case', 'stand', 'clamp', 'hollyland', 'cases'],
  cable: ['cable', 'xlr'],
  cases: ['case'],
  microfono: ['microfono', 'mic', 'audio technica', 'phenyx'],
  interface: ['focusrite', 'interface', 'scarlett'],
}

export function searchProducts(query: string): Product[] {
  const q = normalize(query)
  if (!q) return []

  const tokens = q.split(' ').filter(Boolean)
  const expanded = new Set<string>(tokens)

  for (const [key, terms] of Object.entries(synonyms)) {
    if (q === key || q.includes(key) || key.includes(q)) {
      terms.forEach((t) => expanded.add(normalize(t)))
    }
  }

  // también expandir por marca del catálogo
  for (const brand of brands) {
    const b = normalize(brand)
    if (b.includes(q) || q.includes(b.split(' ')[0] ?? b)) {
      expanded.add(b)
    }
  }

  const scored = allProducts
    .map((product) => {
      const haystack = normalize(`${product.name} ${product.brand} ${product.id}`)
      let score = 0
      if (haystack.includes(q)) score += 20
      if (normalize(product.name).startsWith(q)) score += 10
      if (normalize(product.brand).includes(q)) score += 8
      for (const token of tokens) {
        if (haystack.includes(token)) score += 6
      }
      for (const term of expanded) {
        if (term !== q && haystack.includes(term)) score += 4
      }
      return { product, score }
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)

  const seen = new Set<string>()
  return scored
    .filter((row) => {
      if (seen.has(row.product.id)) return false
      seen.add(row.product.id)
      return true
    })
    .map((row) => row.product)
}

export function scrollToSearchTarget(productId?: string) {
  const run = () => {
    const el = productId
      ? document.getElementById(`producto-${productId}`)
      : document.getElementById('busqueda')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  window.requestAnimationFrame(() => {
    window.setTimeout(run, 80)
  })
}

/** Filtra el catálogo por marca (botones de marcas / categorías) */
export function filterByBrand(brand: string): Product[] {
  const q = normalize(brand)
  if (!q) return []

  // quitar sufijos comunes del UI ("Pioneer DJ" → pioneer)
  const qCore = q.replace(/\bdj\b/g, '').replace(/\bled\b/g, '').trim() || q

  return allProducts
    .filter((product) => {
      const b = normalize(product.brand)
      if (b === q || b === qCore) return true
      if (b.includes(qCore) || qCore.includes(b)) return true
      // tokens: "allen heath" vs "allen & heath"
      const bt = b.split(' ').filter(Boolean)
      const qt = qCore.split(' ').filter((t) => t.length > 1)
      if (qt.length && qt.every((t) => bt.some((x) => x.includes(t) || t.includes(x)))) {
        return true
      }
      return false
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'es'))
}

/** Filtra por ítem del menú (sección + keywords), estilo audioluces */
export function filterByMenuItem(item: MenuItem): Product[] {
  const pool: Product[] = item.section ? catalogBySection[item.section] : allProducts

  if (!item.keywords?.length) {
    return [...pool].sort((a, b) => a.name.localeCompare(b.name, 'es'))
  }

  const kws = item.keywords.map(normalize).filter(Boolean)

  return pool
    .filter((product) => {
      const hay = normalize(`${product.name} ${product.brand} ${product.description ?? ''}`)
      return kws.some((kw) => hay.includes(kw))
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'es'))
}
