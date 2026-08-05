export const site = {
  name: 'Fritz',
  tagline: 'DJ · Colombia',
  phone: '300 663 6377',
  phoneTel: '3006636377',
  email: 'djfritzcolombia@gmail.com',
  domain: 'www.djfritz.com',
  url: 'https://www.djfritz.com',
  whatsapp: '573006636377',
  /** Cambia esta clave en producción (panel /admin) */
  adminPassword: 'fritz2026',
}

export type MediaKind = 'photo' | 'video' | 'audio'

export type ShowMedia = {
  id: string
  type: 'photo' | 'youtube'
  title: string
  src: string
  thumb?: string
  date?: string
  venue?: string
}

export type AudioTrack = {
  id: string
  title: string
  subtitle?: string
  src: string
  cover?: string
  duration?: string
  price?: number
  downloadable?: boolean
  /** ruta pública para descarga (remix) */
  downloadUrl?: string
}

export type BeatProduct = AudioTrack & {
  bpm?: number
  key?: string
  tags?: string[]
  inStock: boolean
}

export type ShopCategory = 'camisas' | 'gorras' | 'chaquetas' | 'hoodies'

export type ShopProduct = {
  id: string
  name: string
  category: ShopCategory
  price: number
  image: string
  description?: string
  inStock: boolean
}

export type BeatBookingRequest = {
  id: string
  name: string
  email: string
  phone: string
  style: string
  notes: string
  createdAt: string
}

export const shopCategoryLabels: Record<ShopCategory, string> = {
  camisas: 'Camisas oversize',
  gorras: 'Gorras',
  chaquetas: 'Chaquetas',
  hoodies: 'Hoodies',
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(n)

/** Contenido semilla — el panel /admin puede sobrescribirlo en el navegador */
export type SiteContent = {
  shows: ShowMedia[]
  sets: AudioTrack[]
  beats: BeatProduct[]
  videoSets: ShowMedia[]
  remixes: AudioTrack[]
  shop: ShopProduct[]
}

export const seedContent: SiteContent = {
  shows: [
    {
      id: 'selina-02630',
      type: 'photo',
      title: 'Selina Medellín',
      src: '/media/shows/selina-medellin/dsc02630.jpg',
      venue: 'Selina Medellín',
      date: '2026',
    },
    {
      id: 'selina-02642',
      type: 'photo',
      title: 'Selina Medellín',
      src: '/media/shows/selina-medellin/dsc02642.jpg',
      venue: 'Selina Medellín',
      date: '2026',
    },
    {
      id: 'selina-02616',
      type: 'photo',
      title: 'Selina Medellín',
      src: '/media/shows/selina-medellin/dsc02616.jpg',
      venue: 'Selina Medellín',
      date: '2026',
    },
    {
      id: 'selina-02612',
      type: 'photo',
      title: 'Selina Medellín',
      src: '/media/shows/selina-medellin/dsc02612.jpg',
      venue: 'Selina Medellín',
      date: '2026',
    },
  ],
  sets: [
    {
      id: 'set1',
      title: 'Fritz Live Set 01',
      subtitle: 'Club energy',
      src: '',
      cover: '/media/covers/set.svg',
      duration: '62:00',
    },
  ],
  beats: [
    {
      id: 'beat1',
      title: 'Midnight Drive',
      subtitle: 'Trap / Dark',
      src: '',
      cover: '/media/covers/beat.svg',
      price: 250000,
      bpm: 140,
      key: 'Am',
      tags: ['trap', 'dark'],
      inStock: true,
    },
    {
      id: 'beat2',
      title: 'Neon Pulse',
      subtitle: 'Reggaetón',
      src: '',
      cover: '/media/covers/beat.svg',
      price: 180000,
      bpm: 95,
      key: 'Fm',
      tags: ['reggaeton'],
      inStock: true,
    },
  ],
  videoSets: [],
  remixes: [
    {
      id: 'rx1',
      title: 'Fritz Remix Pack 01',
      subtitle: 'Free download',
      src: '',
      cover: '/media/covers/remix.svg',
      downloadable: true,
      downloadUrl: '/media/remixes/placeholder-remix.txt',
    },
  ],
  shop: [
    {
      id: 'p1',
      name: 'Camisa Oversize Fritz Black',
      category: 'camisas',
      price: 120000,
      image: '/media/shop/placeholder.svg',
      description: 'Oversize fit · algodón pesado',
      inStock: true,
    },
    {
      id: 'p2',
      name: 'Gorra Fritz Script',
      category: 'gorras',
      price: 85000,
      image: '/media/shop/placeholder.svg',
      inStock: true,
    },
    {
      id: 'p3',
      name: 'Chaqueta Night Run',
      category: 'chaquetas',
      price: 280000,
      image: '/media/shop/placeholder.svg',
      inStock: true,
    },
    {
      id: 'p4',
      name: 'Hoodie Omerta Red',
      category: 'hoodies',
      price: 210000,
      image: '/media/shop/placeholder.svg',
      inStock: true,
    },
  ],
}

export const CONTENT_KEY = 'fritz-site-content-v2'
