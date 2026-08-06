export const site = {
  name: 'Fritz',
  tagline: 'DJ Productor · Colombia',
  phone: '300 663 6377',
  phoneTel: '3006636377',
  email: 'djfritzcolombia@gmail.com',
  domain: 'www.djfritz.com',
  url: 'https://www.djfritz.com',
  whatsapp: '573006636377',
  /** Cambia esta clave en producción (panel /admin) */
  adminPassword: 'fritz2026',
}

export type ShowFolder = {
  id: string
  name: string
  /** Ciudad / ubicación */
  location: string
  kind: 'photos' | 'videos'
}

export type ShowMedia = {
  id: string
  type: 'photo' | 'youtube'
  title: string
  src: string
  thumb?: string
  date?: string
  venue?: string
  /** @deprecated usar folderId */
  folder?: string
  folderId: string
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

export function slugifyFolder(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const photoFolders: ShowFolder[] = [
  { id: 'selina-medellin', name: 'Selina Medellín', location: 'Medellín', kind: 'photos' },
  { id: 'neutro', name: 'NEUTRO', location: 'Por confirmar', kind: 'photos' },
  { id: 'onirico', name: 'ONIRICO', location: 'Por confirmar', kind: 'photos' },
  { id: 'vintrash-bogota', name: 'VINTRASH BOGOTA', location: 'Bogotá', kind: 'photos' },
  { id: 'pergola-clandestina', name: 'PERGOLA CLANDESTINA', location: 'Por confirmar', kind: 'photos' },
  { id: 'la-jugada', name: 'LA JUGADA', location: 'Por confirmar', kind: 'photos' },
  { id: 'la-movida', name: 'LA MOVIDA', location: 'Por confirmar', kind: 'photos' },
  { id: 'rancho-mx', name: 'RANCHO MX', location: 'México', kind: 'photos' },
  { id: 'callao', name: 'CALLAO', location: 'Por confirmar', kind: 'photos' },
  { id: 'the-room-by-view', name: 'THE ROOM BY VIEW', location: 'Por confirmar', kind: 'photos' },
  { id: 'zelavi', name: 'ZELAVI', location: 'Por confirmar', kind: 'photos' },
  { id: 'odem', name: 'ODEM', location: 'Por confirmar', kind: 'photos' },
  { id: 'video-club', name: 'VIDEO CLUB', location: 'Por confirmar', kind: 'photos' },
  { id: 'zelect', name: 'ZELECT', location: 'Por confirmar', kind: 'photos' },
  {
    id: 'manana-sera-bonito-karol-g',
    name: 'MAÑANA SERA BONITO KAROL G',
    location: 'Tour',
    kind: 'photos',
  },
  { id: 'vivanti', name: 'VIVANTI', location: 'Por confirmar', kind: 'photos' },
]

const videoFolders: ShowFolder[] = [
  { id: 'vivanti-aqua-fest-1', name: 'VIVANTI AQUA FEST 1', location: 'Por confirmar', kind: 'videos' },
  { id: 'vivanti-aqua-fest-2', name: 'VIVANTI AQUA FEST 2', location: 'Por confirmar', kind: 'videos' },
]

export type SiteContent = {
  folders: ShowFolder[]
  shows: ShowMedia[]
  sets: AudioTrack[]
  beats: BeatProduct[]
  remixes: AudioTrack[]
  shop: ShopProduct[]
}

export const seedContent: SiteContent = {
  folders: [...photoFolders, ...videoFolders],
  shows: [
    {
      id: 'selina-02630',
      type: 'photo',
      title: 'Selina Medellín 01',
      src: '/media/shows/selina-medellin/dsc02630.jpg',
      venue: 'Selina Medellín',
      folder: 'Selina Medellín',
      folderId: 'selina-medellin',
      date: '2026',
    },
    {
      id: 'selina-02642',
      type: 'photo',
      title: 'Selina Medellín 02',
      src: '/media/shows/selina-medellin/dsc02642.jpg',
      venue: 'Selina Medellín',
      folder: 'Selina Medellín',
      folderId: 'selina-medellin',
      date: '2026',
    },
    {
      id: 'selina-02616',
      type: 'photo',
      title: 'Selina Medellín 03',
      src: '/media/shows/selina-medellin/dsc02616.jpg',
      venue: 'Selina Medellín',
      folder: 'Selina Medellín',
      folderId: 'selina-medellin',
      date: '2026',
    },
    {
      id: 'selina-02612',
      type: 'photo',
      title: 'Selina Medellín 04',
      src: '/media/shows/selina-medellin/dsc02612.jpg',
      venue: 'Selina Medellín',
      folder: 'Selina Medellín',
      folderId: 'selina-medellin',
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

export const CONTENT_KEY = 'fritz-site-content-v4'
