# Fritz — DJ

Sitio oficial (`www.djfritz.com`).

## Decisiones de media (recomendadas)

| Tipo | Cómo |
|------|------|
| **Videos** (shows / video sets) | YouTube embed (ID en Admin). Mejor para peso, móvil y share. |
| **Audio** (sets / beats / remix preview) | MP3 en `public/media/audio/` + reproductor HTML5. |
| **Remix download** | Archivo en `public/media/remixes/` + botón Download. |
| **Fotos** | Desde iCloud → copiar a `public/media/...` → registrar en `/admin`. |

## Panel interno

Abre `/admin` (clave en `src/data/site.ts` → `adminPassword`, por defecto `fritz2026`).

El panel guarda en el navegador (localStorage) para pruebas. Para producción definitiva exporta JSON o edita `src/data/site.ts` y haz deploy.

## Carrito

Merch + beats. Checkout actual: WhatsApp (`300 663 6377`). Luego Nequi / Mercado Pago / Stripe.

## Contacto

- Cel: 300 663 6377
- Email: djfritzcolombia@gmail.com

## Local

```bash
npm install
npm run dev
```
