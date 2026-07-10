# CLAUDE.md — osmartinez.dev

Convenciones del proyecto. Respétalas en toda sesión de edición.

## Qué es
Landing page personal de Oscar Martínez (Senior Mobile & Fullstack Engineer),
desplegada en GitHub Pages en `osmartinez.dev`.

## Regla de oro: stack
- Sitio **estático vanilla**: HTML + CSS + JS puro.
- **Sin framework, sin bundler, sin paso de build, sin dependencias nuevas.**
- No introduzcas React, Vue, Tailwind por CDN, npm, etc. Si algo parece
  necesitar un build, primero propón la alternativa vanilla.

## Estructura de archivos
- `index.html` — marcado semántico + todo el `<head>` de SEO.
- `styles.css` — todos los estilos (no hay CSS inline salvo mínimos puntuales).
- `script.js` — tema, paleta, idioma (i18n), scroll suave y animaciones reveal.
- `robots.txt`, `sitemap.xml` — SEO.
- `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `og-image.png` — imágenes.
- `CLAUDE.md` — este archivo.

## Temas de color (paletas)
- Hay 4 paletas: `indigo`, `cobalto`, `esmeralda`, `amber`.
- Cada una tiene versión clara y oscura, definidas como variables CSS bajo:
  - `:root[data-palette="..."]`            → modo claro
  - `[data-theme="dark"][data-palette="..."]` → modo oscuro
- **Los bloques de modo oscuro van SIEMPRE después de los claros** (dependen del
  orden de cascada para ganar especificidad). No los reordenes.
- **Nunca uses colores hardcodeados** en componentes. Usa las variables
  existentes: `var(--paper)`, `var(--surface)`, `var(--ink)`, `var(--ink-2)`,
  `var(--muted)`, `var(--line)`, `var(--line-2)`, `var(--accent)`,
  `var(--accent-ink)`, `var(--accent-soft)`.
- Paleta/tema por defecto se fijan en los atributos de `<html>`
  (`data-theme="dark" data-palette="indigo"`).

## Bilingüe ES/EN (i18n)
- **Idioma por defecto: inglés.** El contenido en el HTML está en inglés.
- Todo texto visible se traduce vía el objeto `dict` en `script.js`
  (`dict.es` y `dict.en`). Cada clave DEBE existir en ambos idiomas.
- En el HTML, cada texto traducible lleva uno de:
  - `data-i18n="clave"`       → reemplaza textContent
  - `data-i18n-html="clave"`  → reemplaza innerHTML (para texto con `<em>`, `<strong>`)
  - `data-i18n-aria="clave"`  → reemplaza el atributo aria-label
- Al agregar cualquier texto nuevo: crea su clave en `dict.es` y `dict.en`
  y marca el elemento con el atributo correspondiente. No dejes texto suelto
  sin su clave, o no se traducirá.

## Persistencia
- Tema, paleta e idioma se guardan en `localStorage` mediante el objeto `store`
  (get/set envueltos en try/catch). No accedas a localStorage directamente.

## Accesibilidad (no romper)
- Mantén el `skip-link` inicial.
- Landmarks: `<header>`, `<nav aria-label>`, `<main>`, `<section aria-labelledby>`
  apuntando al `id` de su encabezado, `<footer>`.
- `aria-hidden="true"` en elementos puramente decorativos (puntos, íconos, `//`).
- Conserva el foco visible (`:focus-visible`) y el respeto a
  `prefers-reduced-motion` en animaciones.
- Botones de solo ícono siempre con `aria-label` (y su `data-i18n-aria`).

## SEO (no romper)
- No toques el JSON-LD (`<script type="application/ld+json">`), ni las etiquetas
  Open Graph / Twitter, ni el `<link rel="canonical">`, salvo que el cambio lo
  requiera explícitamente.
- Mantén **una sola `<h1>`** en la página y una jerarquía correcta de encabezados
  (h1 → h2 → h3).
- Si agregas una sección nueva, dale su `id` y su entrada en la navegación si aplica.

## Flujo de trabajo
- No hay build ni tests que correr. Tras editar, deja los archivos listos para
  `git commit` + `git push` (el push a `main` despliega solo en GitHub Pages).
- Al terminar un cambio, resume brevemente qué archivos tocaste y por qué.

## Datos pendientes / notas
- Email actual: `oscar.170993@gmail.com` (cambiar si se configura correo de dominio).
- Los logos de empresas son chips de texto (`.logo-chip`); se pueden sustituir por
  `<img>` con logos oficiales **solo si se tiene permiso de uso**.
