# Total Gym Salta — Web oficial

One-page estática para **Total Gym Salta**: gimnasio de 2 sedes en Salta, Argentina.

- **Total Gym** — Vicente López 770 (musculación, funcional, boxeo, spinning, GAP, estética corporal)
- **Pilates Reformer Total** — Leguizamón 321 (pilates reformer, grupos reducidos)

Objetivo de conversión: **reservar clase de prueba por WhatsApp** (sin formularios ni backend).

## Stack

HTML + CSS + JS vanilla, sin frameworks ni build step. Deploy directo en Vercel como sitio estático.

```
├── index.html          # Página completa (SEO, Open Graph, Schema.org ExercisePlace ×2)
├── css/styles.css      # Estilos (variables CSS, BEM, mobile-first)
├── js/main.js          # Tabs de horarios, menú móvil, scroll-reveal, header sticky
├── assets/
│   ├── img/            # Imágenes WebP optimizadas (≤165 KB) + logo PNG
│   └── video/hero.mp4  # Video del hero
├── favicon.png
├── robots.txt
├── sitemap.xml
└── vercel.json         # Cache inmutable para /assets
```

## Desarrollo local

No requiere instalación. Servir la carpeta con cualquier servidor estático:

```bash
npx serve .
# o
python -m http.server 8080
```

## Cómo editar contenido frecuente

| Qué | Dónde |
|---|---|
| Horarios de actividades | Objeto `SCHEDULE` al tope de [js/main.js](js/main.js) |
| Promo del banner superior | Bloque `<!-- PROMO BANNER -->` en [index.html](index.html) (comentar para apagar) |
| Testimonios (hoy placeholder) | Sección `#comunidad` en [index.html](index.html) |
| Números de WhatsApp | Buscar `wa.me/` en `index.html` y `main.js` — gym: `5493872121954` · pilates: `5493875040110` |

## Pendientes antes de lanzar

- [ ] Reemplazar los 3 testimonios placeholder por testimonios reales.
- [ ] Verificar el número de WhatsApp de la sede matriz.
- [ ] Actualizar `robots.txt`, `sitemap.xml` y las metas `og:` / `canonical` si se usa dominio propio (hoy apuntan a `totalgymsalta.vercel.app`).

---
Web por LCS DESING.
