/** Menú tipo audioluces: departamentos + subcategorías con rutas por página */

export type ProductSection = 'sonido' | 'iluminacion' | 'dj' | 'accesorios'

export type MenuItem = {
  id: string
  label: string
  /** Ruta de la página */
  path: string
  section?: ProductSection
  /** Palabras clave para filtrar el catálogo */
  keywords?: string[]
  children?: MenuItem[]
}

export const departmentMenu: MenuItem[] = [
  {
    id: 'sonido',
    label: 'Sonido Profesional',
    path: '/categoria/sonido',
    section: 'sonido',
    children: [
      {
        id: 'cabinas',
        label: 'Cabinas y parlantes',
        path: '/categoria/sonido/cabinas',
        section: 'sonido',
        keywords: ['cabina', 'parlante', 'altavoz', 'line array', 'array', 'speaker'],
      },
      {
        id: 'amplificadores',
        label: 'Amplificadores',
        path: '/categoria/sonido/amplificadores',
        section: 'sonido',
        keywords: ['amplificador', 'power amp'],
      },
      {
        id: 'consolas',
        label: 'Consolas y mixers',
        path: '/categoria/sonido/consolas',
        section: 'sonido',
        keywords: ['consola', 'mezclador', 'mixer', 'qu-', 'sq-', 'wing'],
      },
      {
        id: 'microfonos',
        label: 'Micrófonos',
        path: '/categoria/sonido/microfonos',
        section: 'sonido',
        keywords: ['microfono', 'mic ', 'micrófono'],
      },
      {
        id: 'monitores',
        label: 'Monitores de estudio',
        path: '/categoria/sonido/monitores',
        section: 'sonido',
        keywords: ['monitor', 'adam', 'nearfield'],
      },
      {
        id: 'interfaces',
        label: 'Interfaces de audio',
        path: '/categoria/sonido/interfaces',
        section: 'sonido',
        keywords: ['interfaz', 'interface', 'scarlett', 'focusrite', 'rednet'],
      },
      {
        id: 'auriculares',
        label: 'Auriculares',
        path: '/categoria/sonido/auriculares',
        section: 'sonido',
        keywords: ['auricular', 'audifono', 'headphones', 'hdj'],
      },
    ],
  },
  {
    id: 'iluminacion',
    label: 'Iluminación Profesional',
    path: '/categoria/iluminacion',
    section: 'iluminacion',
    children: [
      {
        id: 'cabezas',
        label: 'Cabezas móviles',
        path: '/categoria/iluminacion/cabezas',
        section: 'iluminacion',
        keywords: ['cabeza', 'moving', 'beam', 'spot'],
      },
      {
        id: 'par-led',
        label: 'Par LED y ambientación',
        path: '/categoria/iluminacion/par-led',
        section: 'iluminacion',
        keywords: ['par led', 'par ', 'wash', 'barra'],
      },
      {
        id: 'efectos',
        label: 'Máquinas y efectos',
        path: '/categoria/iluminacion/efectos',
        section: 'iluminacion',
        keywords: [
          'humo',
          'haze',
          'spark',
          'confeti',
          'confetti',
          'co2',
          'llama',
          'nieve',
          'espuma',
          'burbuja',
          'niebla',
          'cryo',
        ],
      },
      {
        id: 'dmx',
        label: 'Control DMX',
        path: '/categoria/iluminacion/dmx',
        section: 'iluminacion',
        keywords: ['dmx', 'controlador'],
      },
      {
        id: 'pantallas',
        label: 'Pantallas LED',
        path: '/categoria/iluminacion/pantallas',
        section: 'iluminacion',
        keywords: ['pantalla', 'panel led', 'matrix', 'videowall'],
      },
    ],
  },
  {
    id: 'dj',
    label: 'Equipos DJ',
    path: '/categoria/dj',
    section: 'dj',
    children: [
      {
        id: 'controladores',
        label: 'Controladores',
        path: '/categoria/dj/controladores',
        section: 'dj',
        keywords: ['controlador', 'controller', 'ddj', 'mixtrack', 'numark'],
      },
      {
        id: 'cdj',
        label: 'CDJ y media players',
        path: '/categoria/dj/cdj',
        section: 'dj',
        keywords: ['cdj', 'xdj', 'opus', 'media player', 'reproductor'],
      },
      {
        id: 'mixers-dj',
        label: 'Mixers DJ',
        path: '/categoria/dj/mixers-dj',
        section: 'dj',
        keywords: ['djm', 'mezcladora', 'euphonia'],
      },
      {
        id: 'tornamesas',
        label: 'Tornamesas',
        path: '/categoria/dj/tornamesas',
        section: 'dj',
        keywords: ['tornamesa', 'turntable', 'plx'],
      },
      {
        id: 'audifonos-dj',
        label: 'Audífonos DJ',
        path: '/categoria/dj/audifonos-dj',
        section: 'dj',
        keywords: ['audifono', 'auricular', 'hdj'],
      },
    ],
  },
  {
    id: 'accesorios',
    label: 'Accesorios y montaje',
    path: '/categoria/accesorios',
    section: 'accesorios',
    children: [
      {
        id: 'cables',
        label: 'Cables y conectores',
        path: '/categoria/accesorios/cables',
        section: 'accesorios',
        keywords: ['cable', 'xlr', 'jack', 'speakon', 'conector'],
      },
      {
        id: 'cases',
        label: 'Cases y flight cases',
        path: '/categoria/accesorios/cases',
        section: 'accesorios',
        keywords: ['case', 'flight', 'estuche'],
      },
      {
        id: 'soportes',
        label: 'Soportes y stands',
        path: '/categoria/accesorios/soportes',
        section: 'accesorios',
        keywords: ['soporte', 'stand', 'tripode'],
      },
      {
        id: 'inalambricos',
        label: 'Inalámbricos y video',
        path: '/categoria/accesorios/inalambricos',
        section: 'accesorios',
        keywords: ['hollyland', 'inalambrico', 'transmisor', 'lark', 'wireless'],
      },
    ],
  },
]

/** Enlaces del menú principal (con mega-menú donde aplica) */
export const primaryNav: {
  label: string
  path: string
  mega?: 'department' | 'brands'
  departmentId?: string
}[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Sonido', path: '/categoria/sonido', mega: 'department', departmentId: 'sonido' },
  {
    label: 'Iluminación',
    path: '/categoria/iluminacion',
    mega: 'department',
    departmentId: 'iluminacion',
  },
  { label: 'Equipos DJ', path: '/categoria/dj', mega: 'department', departmentId: 'dj' },
  {
    label: 'Accesorios',
    path: '/categoria/accesorios',
    mega: 'department',
    departmentId: 'accesorios',
  },
  { label: 'Marcas', path: '/marcas', mega: 'brands' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contacto', path: '/contacto' },
]

/** Categorías del sidebar hero */
export const heroCategories: { id: string; label: string; hue: number; item: MenuItem }[] = [
  { id: 'cabinas', label: 'Cabinas y parlantes', hue: 210, item: departmentMenu[0].children![0] },
  { id: 'amplificadores', label: 'Amplificadores', hue: 200, item: departmentMenu[0].children![1] },
  { id: 'consolas', label: 'Consolas y mixers', hue: 190, item: departmentMenu[0].children![2] },
  { id: 'microfonos', label: 'Micrófonos', hue: 180, item: departmentMenu[0].children![3] },
  { id: 'cabezas', label: 'Cabezas móviles', hue: 45, item: departmentMenu[1].children![0] },
  { id: 'par-led', label: 'Par LED / ambientación', hue: 35, item: departmentMenu[1].children![1] },
  { id: 'efectos', label: 'Máquinas y efectos', hue: 320, item: departmentMenu[1].children![2] },
  { id: 'controladores', label: 'Controladores DJ', hue: 250, item: departmentMenu[2].children![0] },
  { id: 'cdj', label: 'CDJ y media players', hue: 260, item: departmentMenu[2].children![1] },
  { id: 'mixers-dj', label: 'Mixers DJ', hue: 270, item: departmentMenu[2].children![2] },
  { id: 'cases', label: 'Cases', hue: 30, item: departmentMenu[3].children![1] },
  { id: 'inalambricos', label: 'Inalámbricos / video', hue: 160, item: departmentMenu[3].children![3] },
]

export function findDepartment(sectionId: string): MenuItem | undefined {
  return departmentMenu.find((d) => d.id === sectionId || d.section === sectionId)
}

export function findSubcategory(sectionId: string, subId: string): MenuItem | undefined {
  return findDepartment(sectionId)?.children?.find((c) => c.id === subId)
}

export function brandPath(brand: string): string {
  return `/marca/${slugify(brand)}`
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
