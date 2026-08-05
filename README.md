# DJ Fritz

Sitio web de **DJ Fritz** (`www.djfritz.com`): catálogo de equipos DJ, sonido e iluminación profesional.

Incluye catálogo por categorías, búsqueda, filtro por marca, carrito, favoritos y loader de marca.

## Arrancar en local

```bash
npm install
npm run dev
```

Abre la URL de Vite (por defecto `http://localhost:5173`).

## Build de producción

```bash
npm run build
npm run preview
```

La carpeta `dist/` queda lista para subir a Vercel, Netlify u otro hosting estático.

### Dominio www.djfritz.com

1. Despliega el proyecto (recomendado: Vercel → Importar este repo).
2. En el panel del hosting, agrega el dominio `djfritz.com` y `www.djfritz.com`.
3. En tu registrador DNS, apunta:
   - `www` → CNAME al destino que indique el hosting (ej. `cname.vercel-dns.com`)
   - raíz `@` → A / ALIAS según las instrucciones del hosting
4. Activa HTTPS (automático en Vercel/Netlify).

## Contenido

- Datos del sitio y búsqueda: [`src/data/site.ts`](src/data/site.ts)
- Catálogo de productos: [`src/data/catalog.ts`](src/data/catalog.ts)
- Logos e imágenes: `public/` (`logo-fritz-white.png`, `logo-fritz-black.png`)
