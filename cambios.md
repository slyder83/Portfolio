# Informe de cambios — Portfolio

> Documento vivo: las novedades se añaden arriba, en «Últimos cambios».

## ▶ Cómo continuar mañana (instrucciones)

Para retomar la sesión desde donde lo dejamos:

1. **Entra al proyecto** (no hace falta recordar nada, todo está en disco):
   ```bash
   cd /Applications/XAMPP/xamppfiles/htdocs/misproyectos/proyectos_personales/Portfolio
   git status            # ver qué hay modificado / sin seguimiento
   ```

2. **Lee este archivo** (`cambios.md`): la sección «Últimos cambios» (arriba) resume lo
   más reciente; «Historial detallado» tiene el desglose completo por sesión.

3. **Dile al asistente:** «Continúa desde cambios.md» (o resume: «retoma el portfolio,
   consulta cambios.md para el contexto»).

4. **Estado actual / punto de retomada:**
   - **Rama de git:** `feat/phase-2-remaing`. Working tree con cambios sin commitear
      (CI/CD en curso).
   - **Refactorización completa (C2–C8):** mergeada desde `refactor/code-quality` a `main`
      (commit `172668a`). C1 (TypeScript) descartada por decisión del usuario.
   - **Auditoría de ciberseguridad completada y mergeada** (07/09/2026).
   - **Tareas pendientes (nueva rama `feat/phase-2-remaing`, por orden de prioridad):**
      f) CI/CD (lint + build automáticos) → **completada** (workflow verificado en GitHub Actions)
      e) Tests (TDD / browser-testing) → pendiente
      d) Rendimiento (Core Web Vitals, bundle JS) → pendiente
      g) Observabilidad (analytics, logging) → pendiente
      h) Checklist de lanzamiento → pendiente

---

**Nota final de esta sesión:** refactorización C2-C8 completada y pusheada en
`refactor/code-quality`. C1 (TypeScript) descartada. Auditoría de ciberseguridad
completada con remediación (sendForm → send, maxLength, cooldown 30s, vercel.json
con 5 security headers). Nueva rama `feat/phase-2-remaing` para las tareas restantes,
empezando por CI/CD.

## Últimos cambios

<!-- Añadir aquí las nuevas entradas (la más reciente primero). -->

### 07/09/2026 — Fase 2f: CI/CD en GitHub Actions en `feat/phase-2-remaing`

Nuevo flujo `.github/workflows/ci.yml` que se ejecuta en cada push/PR a `main`:

1. `npm ci` (dependencias exactas desde `package-lock.json`)
2. `format:check` (Prettier — falla si hay código sin formatear)
3. `lint` (ESLint)
4. `build` de producción (Vite)
5. Upload del artefacto `dist/`

Node 22, timeout 10 min, cache de npm. El workflow valida que `main` nunca acepte
código que no formatee/lintee/compile. Los tests de Playwright (fase 2e) se añadirán
a este mismo workflow cuando existan.

**Extra:** Prettier había quedado pendiente en `src/components/ContactSection.jsx`
(la línea del toast de longitud de mensaje) — formateada.

### 07/09/2026 — Refactorización Fase 8 (Documentación — C5) en `refactor/code-quality`

Auditoría (C5): README desactualizado y documentación de `context/` con referencias a una
`lib/portfolioData.js` que nunca existió, a la utility `cosmic-button` ya eliminada, a "Vite 7"
y a un dark mode "pendiente" que ya está publicado.

**Cambios en `README.md`:**
- Reescrito: stack real (React 19, Vite 8, Tailwind v4, React Router v7, Radix+CVA, EmailJS),
  características actuales (dark mode, fondo animado, `Button`), estructura `src/`, scripts
  (`format`/`format:check`), tabla de scripts y configuración (`site.js`, `data/`)

**Cambios en `context/` (v3.1 → v3.2):**
- `rules/coding_standards.md`: tabla de capas con `data/` y `config/`, ejemplo `@utility
  cosmic-button` → componente `Button` (patrón shadcn), imports tipo `@/data/projects`,
  changelog 3.2
- `rules/architecture_principles.md`: capas `Data`/`Config` añadidas al diagrama y tabla,
  ejemplo `portfolioData.js` → `data/projects.js` + `config/site.js`, regla "Separación de
  datos" reescrita (ya no es futura)
- `rules/quality_gates.md`: checklist actualizado a `data/`/`config/site.js`, changelog 3.2
- `identity/project_profile.md`: capas + estructura con `config/`/`data/`, dark mode ya
  publicado en el alcance, Vite 7→8, historial 1.1.0
- `activation/active_agents.md`: stack Vite 8, dark mode expuesto, estructura con
  `data/`/`config/`, pendiente de extracción de datos eliminado, indentación 4 espacios,
  Prettier añadido

**Validación:** referencias `portfolioData`/`cosmic-button`/`Vite 7` eliminadas (solo quedan
en changelogs documentando el propio cambio). Sin cambios de código → lint/build intactos.

---

### 07/09/2026 — Auditoría de ciberseguridad (profundizada)

Auditoría completa solicitada por el usuario. Superficie de ataque mínima: SPA estático
en Vercel, sin backend, sin auth, sin uploads, sin cookies de sesión. Riesgo global: **bajo**.

**Controles ya sólidos (sin acción necesaria):**
| Control | Resultado |
|---------|-----------|
| Dependencias npm | 0 vulnerabilidades (`npm audit`); 168 paquetes con firma, 46 con attestations |
| `.env` en git | NO trackeado; `.env.example` con placeholders |
| Historial git | Sin secretos en formato conocido (tokens, API keys, etc.) |
| XSS | Sin `dangerouslySetInnerHTML`/`eval`/`innerHTML`; React auto-escapa |
| HSTS | Presente en producción (Vercel, `max-age=63072000; includeSubDomains; preload`) |
| Typosquatting | Sin paquetes sospechosos en la dependencia tree |
| `noopener noreferrer` | Presente en todos los enlaces externos |
| CV/archivos públicos | Intencional (portfolio); no hay archivos sensibles |
| Backend | No existe (`api/` vacío, `vercel.json` no existía antes de la auditoría) |

**Hallazgo 1 — Formulario abusable (severidad: media):**
- `sendForm` serializaba **cualquier campo del DOM** → un atacante podía inyectar campos
  ocultos y controlar parámetros del template EmailJS (enviar correos usando la cuenta
  del dueño como spam).
- Sin `maxLength` en campos → payloads ilimitados.
- Sin cooldown → envíos repetidos ilimitados.

**Acción realizada:**
1. `sendForm` → `emailjs.send` con payload explícito `{ name, email, message }`
   (nunca tocar el DOM del form para enviar).
2. Añadido `minLength`/`maxLength` en cliente: `name` (2–100), `email` (≤254),
   `message` (10–5000).
3. Cooldown de 30s entre envíos (toasts informativos en español).

**Hallazgo 2 — Cabeceras de seguridad deseadas ausentes (severidad: media):**
Producción sin `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy` ni `Permissions-Policy`. HSTS sí estaba presente (Vercel por defecto).

**Acción realizada:** creado `vercel.json` con las 5 cabeceras (CSP incluye
`connect-src ... https://api.emailjs.com` y `style-src ... 'unsafe-inline'` para
estilos inline de React; `frame-ancestors 'none'`, `base-uri 'self'`,
`upgrade-insecure-requests`).

**Mejoras menores implementadas:**
- Validación client-side con regex de email + comprobación de longitudes en `handleSubmit`.
- Botón deshabilitado durante envío (`isSubmitting`); cooldown de 30s entre envíos.

**Pendiente (recomendado):** configurar en el dashboard de EmailJS el **Spam Protection**
(Turnstile/reCAPTCHA o allowlist de dominios) para refuerzo server-side. El frontend
no puede prevenir abusos 100%; la protección real está en el rate-limit del servicio.

**Validación:** lint ✅ · build ✅ · Playwright: `maxLength` aplicados (100/254/5000),
form envía por `emailjs.send` (no `sendForm`), 0 errores de consola ·
`vercel.json` JSON válido ✅ · headers verificados con `curl` en producción (HSTS sí,
las 5 nuevas se aplicarán al próximo deploy).

---

### 07/09/2026 — Refactorización Fase 7 (Accesibilidad — C8) en `refactor/code-quality`

Auditoría (C8): filtros de categorías sin semántica de estado (no anunciaban el seleccionado),
menú móvil sin cierre por teclado, barras de skill sin semántica accesible.

**Cambios en `src/components/Navbar.jsx` (menú móvil):**
- Cierre con tecla `Escape` (`useCallback` + listener global mientras está abierto)
- Al cerrar, el foco vuelve al botón del menú (`toggleButtonRef`)
- Botón toggle con `aria-expanded` + `aria-controls="mobile-menu"`
- Overlay con `id="mobile-menu"` y `aria-hidden` cuando está cerrado (los enlaces ocultos
  dejan de ser anunciados por lectores de pantalla)

**Cambios en `src/components/SkillsSection.jsx`:**
- Botones de categoría con `aria-pressed={activeCategory === id}` (semántica de botón toggle)
- Barras de nivel con `role="progressbar"`, `aria-valuenow/min/max` y etiqueta accesible
  (`Nivel en {nombre}: {nivel}%`)

**Validación:** lint ✅ · build ✅ · Playwright: `aria-pressed` alterna al pulsar filtros
(true en seleccionado, false en los demás), 4 `progressbar` del backend con `valuenow`
correcto, menú se abre (`aria-expanded=true`), cierra con Escape y el foco vuelve al toggle,
0 errores de consola.

---

### 07/09/2026 — Refactorización Fase 6 (Limpieza de `index.css` — C6) en `refactor/code-quality`

Auditoría (C6): CSS con código muerto (utility `cosmic-button` y token `--color-button-text`
sin usos tras C7), estilo inconsistente (trailing whitespace, espaciado de keyframes,
indentación de `@media`) y Prettier no cubría CSS.

**Cambios en `src/index.css`:**
- Eliminada utility `cosmic-button` (ya no se referencia: sustituida por el componente `Button` en fase 5)
- Eliminado token `--color-button-text` de `@theme` (sin consumidores; la variable cruda `--button-text` se conserva porque `Button` la usa vía `hsl(var(--button-text))`)
- Añadido espacio entre keyframes `float` y `pulse-subtle`
- Formateado completo con Prettier (indentación 4, `@media` nested, sín trailing whitespace)

**Cambios en `package.json`:** scripts `format` y `format:check` ahora incluyen CSS
(`src/**/*.{js,jsx,css}`) + formateados `site.js`, `nav.js`, `projects.js`, `skills.js`,
`useStarBackground.js` (quedaron fuera del alcance anterior).

**Validación:** lint ✅ · build ✅ (CSS de 40.05 kB → 39.05 kB) · `prettier --check` ✅ en
todo `src/` · Playwright: botón default con color de texto correcto (blanco sobre verde),
18 barras `animate-grow`, 92 estrellas + 4 meteoros animando, 0 errores de consola.

**Pendiente relacionado:** el ejemplo `@utility cosmic-button` en `context/rules/coding_standards.md`
está desactualizado (se tratará en C5 / docs).

---

### 07/09/2026 — Refactorización Fase 5 (Botón reutilizable — C7) en `refactor/code-quality`

Auditoría (C7): `className` de botones duplicados entre componentes (`cosmic-button`,
`px-6 py-2 rounded-full border...`, `px-5 py-2 rounded-full...`) → extraído componente UI.

**Nuevo `src/components/ui/button.jsx`** (patrón shadcn, con `cva` + `@radix-ui/react-slot`):
- `Button` con variantes `default` (cosmic), `outline` (border primary), `secondary`
  (filtros), `ghost` (iconos); tamaños `default/sm/lg/icon`
- Soporte `asChild` para renderizar el mismo estilo sobre `<a>` (enlaces)

| Archivo | Antes | Después |
|---------|-------|---------|
| `HeroSection.jsx` | `<a className="cosmic-button">` | `<Button asChild>` |
| `AboutSection.jsx` | 2 botones (cosmic + outline) | `<Button>` y `<Button variant="outline">` |
| `ProjectSection.jsx` | `<a className="cosmic-button w-fit flex...">` | `<Button asChild className="w-fit mx-auto">` |
| `ContactSection.jsx` | `<button className="cosmic-button w-full flex...">` | `<Button className="w-full">` |
| `SkillsSection.jsx` | `cn("capitalize", activo ? cosmic : bg-secondary/70)` | `<Button size="sm" variant={activo ? default : secondary}>` |
| `NotFound.jsx` | `<button className="cosmic-button">` | `<Button onClick={navigate}>` |
| `ThemeToggle.jsx` | `<button className="p-2 rounded-full...">` | `<Button variant="ghost" size="icon">` |
| `Footer.jsx` | `<a className="p-2 rounded-full bg-primary/10...">` | `<Button asChild variant="ghost" size="icon">` |
| `Navbar.jsx` | `<button className="md:hidden p-2...">` | `<Button variant="ghost" size="icon" className="md:hidden z-50">` |

- `cosmic-button` ya no se referencia en ningún componente (la utility queda en CSS para C6)
- `cn` eliminado de `SkillsSection.jsx` (sin usos restantes)

**Validación:** lint ✅ · build ✅ · Playwright: enlaces de Hero/About/CV renderizan como
botones, filtros de categorías cambian de variante al hacer click (activo → bg-primary),
menú móvil abre/cierra, 404 funcionando, 0 errores de consola.

---

Auditoría (C3): lógica de generación + renderizado mezclados, funciones re-creadas en
cada render, resize sin throttle, ~200+ elementos DOM regenerados en cada resize.

**Cambios en `StarBackground.jsx` (de ~96 a ~50 líneas):**
- Extraída lógica a nuevo hook `src/hooks/useStarBackground.js`: generación de stars
  (`Array.from`) y meteors fuera del componente, `requestAnimationFrame` como throttle
  en el resize (evita regenerar todo el fondo en cada evento de resize)
- Extraídos subcomponentes `Star` y `Meteor` (mismo archivo, solo renderizan estilos)
- El componente principal solo usa `useStarBackground()` y mapea subcomponentes

**Validación:** lint ✅ · build ✅ · Playwright: 102 estrellas animando `pulse-subtle`,
4 meteoros animando `meteor` con delays 0/1.25/2.5/3.75s, 0 errores de consola.

---

### 07/09/2026 — Refactorización Fase 3 (Config centralizada — C4) en `refactor/code-quality`

Auditoría (C4): constantes duplicadas a lo largo del código → centralizadas en un módulo
de configuración.

**Nuevo `src/config/site.js`:** `name`, `ownerEmail`, `githubUrl`, `linkedinUrl`, `url`.

| Archivo | Constantes reemplazadas |
|---------|-------------------------|
| `ContactSection.jsx` | email (`mailto` + toast), LinkedIn URL, GitHub URL → `site.*` |
| `ProjectSection.jsx` | "Ver más en GitHub" URL → `site.githubUrl` |
| `Navbar.jsx` | nombre "Roberto Ceñera" → `site.name`; `navItems` extraído a `src/data/nav.js` |
| `Footer.jsx` | nombre → `site.name` |

**Validación:** lint ✅ · build ✅ · Playwright: email, linkedin, github y nombre
renderizan desde config; 0 errores de consola.

---

### 07/09/2026 — Refactorización Fase 2 (Extracción de datos — C2) en `refactor/code-quality`

Auditoría (C2): datos de negocio embebidos en componentes → extraídos a módulos de datos.

| Archivo | Antes | Después |
|---------|-------|---------|
| `SkillsSection.jsx` | `skills` (18) y `categories` (4) hardcodeados | import desde `@/data/skills` |
| `ProjectSection.jsx` | `projects` (5) hardcodeados | import desde `@/data/projects` |
| **Nuevo** `src/data/skills.js` | — | export `skills` + `categories` |
| **Nuevo** `src/data/projects.js` | — | export `projects` |

**Validación:** lint ✅ · build ✅ · Playwright: 18 skills, 5 proyectos, 3 demo links,
5 github links, 0 errores de consola. Sin cambio visual.

---

### 07/09/2026 — Refactorización Fase 1 (Quick wins) en `refactor/code-quality`

Creada rama `refactor/code-quality` desde `main` (tras merge del PR #3 de fase 2).
Auditoría completa del código entregada al usuario (categorías: ✅ bien / 🟡 mejora
mínima / 🔴 refactor completo). Plan por fases; se ejecutó la **Fase 1 (quick wins)**:

| ID | Cambio | Verificación |
|----|--------|--------------|
| B1 | `Navbar.jsx`: aria-label "Cerrar menú"/"Abrir menú" (tildes) | ✅ |
| B2 | `ThemeToggle.jsx`: aria-label/title en español ("Activar modo claro/oscuro") | ✅ |
| B3 | `Footer.jsx`: `new Date().getFullYear()` extraído a `currentYear`; limpiado doble espacio className | ✅ |
| B6 | `SkillsSection.jsx`: `animate-[grow_1.5s_ease-out]` → `animate-grow` (usa el `@theme`) | ✅ |
| B7 | Instalado **Prettier** (config `tabWidth:4`, `semi:false`, `singleQuote:false`); `.prettierrc.json` + `.prettierignore`; scripts `format`/`format:check`; formateados 14 archivos | ✅ |

**Adicional:** instalado **Playwright + Chromium** (devDependency) como herramienta de
verificación de renderizado, útil para la futura fase 2e (tests).

**Validación:** `npm run lint` ✅ · `npm run build` ✅ · Verificación con Playwright:
todos los componentes renderizan (navbar, hero, about, skills, projects, contact, footer,
theme toggle, 102 estrellas, 4 meteoros) y **0 errores de consola**.

**Nota:** Prettier normalizó comillas simples→dobles, quitó semicolons y unificó a 4
espacios. Excluidos de formateo: `src/components/ui`, `src/hooks/use-toast.js` (código
shadcn generado con su propio estilo).

---

### 07/09/2026 — Fix animación meteoros (StarBackground)

El usuario reportó que los meteoros aparecían **estáticos/parados** al cargar y empezaban
a moverse una a una, con sensación de "chapuza".

**Causa raíz:** la revisión de código anterior cambió `delay` (propiedad CSS inválida,
ignorada → efectivamente 0s) a `animationDelay` (válida). Eso activó el `delay` aleatorio
de hasta 15s quedando en los datos, por lo que los meteoros quedaban **visibles y parados**
durante el delay (el keyframe empezaba en `opacity: 1`).

**Solución (efecto natural de meteorito):**
1. `src/index.css` — keyframe `meteor` ahora arranca en `opacity: 0` (fade in) y termina
   en `opacity: 0` (fade out); `--animate-meteor` añade `animation-fill-mode: backwards`
   para que el meteorito esté **invisible durante el delay** (nunca una línea parada).
2. `StarBackground.jsx` — delays distribuidos uniformemente `(i/4)*5` = 0, 1.25, 2.5, 3.75s
   para que siempre haya un meteorito cruzando (sin huecos muertos).

Resultado: los meteoritos "entran" gradualmente y cruzan de forma continua desde el primer
instante, sin verse nunca parados.

---

### 07/09/2026 — Auditoría de seguridad (fase 2)

Auditoría de seguridad completa. Resultado: el proyecto queda en buen estado.

**Hallazgos y acciones:**

| # | Severidad | Hallazgo | Acción |
|---|-----------|----------|--------|
| 1 | **Alta (dev-only)** | 7 vulnerabilidades npm (4 altas, 2 moderadas, 1 baja), todas en devDependencies de eslint (plugin-kit, humanfs, ajv, brace-expansion, flatted, js-yaml, minimatch) | `npm audit fix` → **0 vulnerabilidades** |
| 2 | Info | `VITE_EMAILJS_PUBLIC_KEY` está en el bundle `.js` (visible en `dist/assets`). | Correcto por diseño: la public key de EmailJS no es un secreto; la protección está en el dashboard (dominios permitidos + rate limiting). No es un fallo. |
| 3 | OK | `.env` está en `.gitignore` (línea 27) y no rastreado por git. Existe `.env.example`. | Sin acción. |
| 4 | OK | Sin `dangerouslySetInnerHTML`/`innerHTML` en todo el código fuente. | Sin XSS. |
| 5 | OK | Enlaces externos usan `rel="noopener noreferrer"` con `target="_blank"`. | Sin riesgo de tabnabbing. |
| 6 | OK | Formulario con `required` + manejo de errores con toast. | Sin acción. |

**Pendiente opcional:** añadir `vercel.json` con security headers (CSP, X-Content-Type-Options, etc.).

---

### 07/09/2026 — Revisión de código multi-eje (fase 2)

Revisión completa del código fuente del portfolio siguiendo el skill
`code-review-and-quality`. Se revisaron 5 ejes: corrección, legibilidad,
arquitectura, seguridad y rendimiento. Build y lint pasan sin errores. npm audit
muestra 7 vulnerabilidades (todas en devDependencies de eslint).

**Hallazgos corregidos:**

| # | Severidad | Archivo | Problema |
|---|-----------|---------|----------|
| 1 | **Requerido** | `StarBackground.jsx` | `delay` en inline style no es una propiedad CSS válida; los meteoros no tenían delay. Corregido a `animationDelay`. |
| 2 | **Requerido** | `NotFound.jsx` | Texto en inglés ("Go back home") en sitio 100% en español. Traducido. |
| 3 | **Nit** | `ProjectSection.jsx` | `demoUrl: "#"` es semánticamente incorrecto (parece enlace roto). Cambiado a `null`. |
| 4 | **Opcional** | `SkillsSection.jsx` | `key={key}` usa índice del array en vez de `skill.name`. Mejorado para estabilidad. |

**Hallazgos informativos (sin corrección necesaria):**

- **Seguridad:** `VITE_EMAILJS_PUBLIC_KEY` se expone en el bundle (diseño de EmailJS, no es un fallo). La rate limiting se gestiona en el dashboard de EmailJS.
- **Rendimiento:** `StarBackground` genera ~200+ elementos DOM en pantalla 1080p. Aceptable para un portfolio, pero a monitorizar.
- **Rendimiento:** El resize listener de `StarBackground` no tiene throttle. Menor impacto en un portfolio estático.
- **Arquitectura:** Los datos de `projects` están hardcodeados en el componente. Correcto para un portfolio personal; moverlos a un archivo de datos si crece.

Detalle completo más abajo en «Historial detallado».

---

### 04/09/2026 — Toast de error del formulario con alternativa (UX)

El toast de error al enviar el formulario mostraba un mensaje genérico ("inténtalo más
tarde"). Lo cambié por uno más útil que incluye el email directo como alternativa
("Puedes escribirme directamente a rcenegar@gmail.com"). Detalle en «Historial detallado».

---

### 04/09/2026 — Imágenes de proyectos a WebP (rendimiento)

Convertí las 5 imágenes de proyectos de PNG a WebP con `sharp`, reduciendo el peso
total cargado de ~11.5 MB a ~572 KB (un 95% menos). Actualicé las referencias en
`ProjectSection.jsx`. Verificadas visualmente y los PNG originales eliminados.
Detalle en «Historial detallado».

---

### 04/09/2026 — `og:image` real para redes sociales (SEO)

El `og:image` apuntaba al `favicon.png` (icono diminuto de pestaña). Creé una imagen
OG de 1200×630px con la paleta del proyecto usando SVG + `sharp` para la conversión a
PNG. Actualicé los metas Open Graph, Twitter Cards y structured data. Detalle en
«Historial detallado».

---

### 04/09/2026 — Contraste `muted-foreground` en light theme (WCAG 4.5:1)

El token `--muted-foreground` en el tema claro tenía un contraste de 4.42:1 contra el
fondo, por debajo del mínimo WCAG AA (4.5:1). Ajusté la luminosidad de 40% a 39% para
alcanzar 4.60:1. El tema oscuro ya pasaba (9.17:1). Detalle en «Historial detallado».

---

### 04/09/2026 — Hero: fallback para `prefers-reduced-motion` (accesibilidad)

Los elementos del Hero usaban `opacity-0` y dependían de animaciones CSS para hacerse
visibles. Si el usuario tenía reducción de movimiento o las animaciones no cargaban, el
texto quedaba invisible. Añadí un `@media (prefers-reduced-motion: reduce)` que
deshabilita las animaciones y muestra el contenido inmediatamente. Detalle en «Historial
detallado».

---

### 04/09/2026 — Enlace `<a href="#">` roto en ContactSection (accesibilidad)

El enlace «Norte de España» en la sección de Ubicación usaba `href="#"`, que no lleva a
ninguna parte y genera una navegación inesperada al tope de la página. Lo reemplacé por
un `<span>` ya que es información estática. Detalle en «Historial detallado».

---

### 03/09/2026 — Header semántico (SEO/accesibilidad)

La barra de navegación usaba `<nav>` como elemento raíz sin un `<header>` de página.
La envolví en un `<header>` fijo, dejando el `<nav>` dentro. El `<footer>` ya usaba
la etiqueta correcta. Detalle en «Historial detallado».

---

### 03/09/2026 — Skip navigation link (accesibilidad)

Añadí un enlace «Saltar al contenido» en `Home.jsx` para que los usuarios que navegan
con teclado/lector de pantalla puedan saltarse el menú de navegación e ir directos al
contenido principal. Está oculto por defecto y se muestra al recibir foco (pulsar Tab).
Detalle en «Historial detallado».

---

### 03/09/2026 — Imágenes de proyectos: añadir dimensiones (CLS)

Añadí los atributos `width` y `height` a las imágenes de los proyectos con sus
dimensiones reales, y los guardé como datos (`imageWidth`/`imageHeight`) en
`ProjectSection.jsx`. Aunque la caja ya fija la altura (`h-48`), declarar las
dimensiones ayuda a evitar *layout shift* y es una buena práctica. Detalle en
«Historial detallado».

---

### 03/09/2026 — Habilitar ThemeToggle en Home

El toggle de tema claro/oscuro **ya funcionaba** en la página principal porque está
integrado dentro del `Navbar` (escritorio y menú móvil). Lo que había en `Home.jsx`
era un `<ThemeToggle />` **comentado y duplicado**. Eliminé ese código muerto (la línea
comentada y el import sin usar) para evitar confusión. Detalle en «Historial detallado».

---

### 03/09/2026 — Corrección de fallos visuales y funcionales

Documentado el detalle completo de los 6 fallos corregidos en esta primera
sesión (más abajo en el informe): tokens de color shadcn, `text-gradient`,
keyframe `grow`, toasts, dependencia del `useEffect` y `aria-hidden`.

---

## Historial detallado

### Sesión 07/09/2026: Revisión de código multi-eje (fase 2)

**Contexto:** Revisión del código fuente completo del portfolio siguiendo el skill
`code-review-and-quality`. Se revisaron todos los archivos `.jsx`, `.js`, `.css` y
de configuración del proyecto.

**Eje 1 — Corrección:**

1. **StarBackground.jsx:77** — `delay: meteor.delay` en inline style no es una
   propiedad CSS válida. Los meteoros tenían un `delay` random generado (línea 50)
   pero nunca se aplicaba porque `delay` no existe en CSS. Resultado: todos los
   meteoros aparecían al mismo tiempo en vez de estar escalonados.
   → Corregido a `animationDelay: meteor.delay + "s"`.

2. **NotFound.jsx:19-20** — El texto del 404 estaba en inglés ("Oops, the page
   you're looking for doesn't exist." y "Go back home") mientras que todo el resto
   del sitio está en español.
   → Traducido al español.

3. **ProjectSection.jsx:13** — `demoUrl: "#"` para proyectos sin demo. Aunque el
   código oculta el enlace cuando `demoUrl === "#"`, un `href="#"` es
   semánticamente un enlace que lleva al tope de la página (problema que ya se
   corrigió en ContactSection en fase 1).
   → Cambiado a `null` para mayor claridad semántica.

**Eje 2 — Legibilidad:**

4. **SkillsSection.jsx:56** — `key={key}` usa el índice del array como key de React.
   Como la lista se filtra por categoría, los índices cambian y React puede
   reutilizar componentes incorrectamente.
   → Cambiado a `key={skill.name}` (único y estable).

**Eje 3 — Arquitectura:**

- El código sigue un patrón consistente: componentes funcionales, hooks de React,
  utilidades de shadcn/ui. Sin problemas estructurales.
- Los datos de `projects` están hardcodeados en `ProjectSection.jsx`. Correcto para
  un portfolio personal con 5 proyectos. Si creciera, mover a un archivo de datos.

**Eje 4 — Seguridad:**

- `VITE_EMAILJS_PUBLIC_KEY` se expone en el bundle del cliente. Esto es por diseño
  de EmailJS (la clave pública está pensada para uso client-side). La rate limiting
  se gestiona en el dashboard de EmailJS.
- `.env` está correctamente en `.gitignore`.
- No se encontraron inyecciones, XSS, ni secrets en código.

**Eje 5 — Rendimiento:**

- `StarBackground` genera `(innerWidth * innerHeight) / 10000` elementos estrella
  (~200 en pantalla 1080p). Cada uno es un `<div>` con clase CSS. Aceptable para
  un portfolio, pero a monitorizar en dispositivos móviles de gama baja.
- El `resize` listener de `StarBackground` no tiene throttle. Cada pixel de resize
  regenera todas las estrellas. Impacto menor en uso normal.
- Imágenes de proyectos usan `loading="lazy"` y `decoding="async"` (bueno).
- Las animaciones del Hero usan `prefers-reduced-motion` fallback (ya corregido en
  fase 1).

**npm audit:** 7 vulnerabilidades (1 low, 2 moderate, 4 high), todas en
devDependencies de eslint/plugins. No afectan a producción. Se pueden resolver con
`npm audit fix`.

**Verificación:** `npm run build` y `npm run lint` pasan sin errores.

---

### Sesión 04/09/2026: Toast de error del formulario (fase 2)

**Contexto:** Durante la verificación de producción de la fase 1, se detectó un error
412 al enviar el formulario de contacto. La causa era que el token OAuth de Gmail en
EmailJS había expirado (problema del lado del servicio, no del código). Se resolvió
reconectando la cuenta Gmail en el dashboard de EmailJS.

**Mejora de código:** Aun con el servicio restaurado, el toast de error mostraba un
mensaje genérico. Lo cambié por uno más útil que incluye el email directo como
alternativa, para que el usuario pueda contactar directamente si el servicio falla.

**Archivo modificado:** `src/components/ContactSection.jsx`

**Cambio:**
- `.catch()`: de "Por favor, inténtalo de nuevo más tarde" a
  "No se pudo enviar el mensaje. Puedes escribirme directamente a rcenegar@gmail.com"

Verificado con `npm run build` y `npm run lint`.

---

### Sesión 04/09/2026: Imágenes de proyectos a WebP

**Recomendación de la auditoría:** Las imágenes de los proyectos eran PNG pesados
(algunos de varios MB), lo que ralentizaba la carga de la página.

**Archivos creados/modificados:**
- `public/projects/*.webp` — 5 imágenes convertidas con `sharp` (calidad 80).
- `scripts/convert-projects.js` — script de conversión (reutilizable con `npm run
  convert-projects`).
- `package.json` — añadido script `convert-projects`.
- `src/components/ProjectSection.jsx` — referencias `.png` → `.webp`.

**Resultado de la conversión (calidad 80):**

| Imagen | PNG | WebP | Ahorro |
|--------|-----|------|--------|
| tfg-reservas | 5384 KB | 266 KB | -95.1% |
| victory-royale-timer | 3562 KB | 130 KB | -96.3% |
| efemerides-videojuegos | 1833 KB | 114 KB | -93.8% |
| fem-weather | 604 KB | 30 KB | -95.0% |
| autoescuela | 145 KB | 32 KB | -78.1% |
| **Total** | **~11.5 MB** | **~572 KB** | **-95%** |

**Pendiente:** Los PNG originales se conservan en `public/projects/` a la espera de
que contribuya verifique que los WebP se ven bien, momento en el que se borrarán.

Ahora: las imágenes WebP fueron verificadas visualmente y los PNG originales ya se
eliminaron.

Verificado con `npm run build` y `npm run lint`.

---

### Sesión 04/09/2026: og:image para redes sociales

**Recomendación de la auditoría:** El `og:image` apuntaba a `/favicon.png`, que es el
icono de pestaña (32×32 px). Las redes sociales necesitan una imagen de 1200×630 px
para mostrar una preview correcta.

**Archivos creados/modificados:**
- `public/og-image.svg` — diseño vectorial con fondo verde oscuro, nombre, título y
  tecnologías.
- `public/og-image.png` — conversión a PNG (1200×630, ~29KB) con `sharp`.
- `scripts/generate-og.js` — script de conversión (reutilizable con `npm run generate-og`).
- `package.json` — añadido script `generate-og`.
- `index.html` — actualizados los 3 metas que apuntaban al favicon:
  - `og:image` → `/og-image.png`
  - `twitter:image` → URL completa a `og-image.png`
  - Structured data (`schema.org`) → URL completa a `og-image.png`

Verificado con `npm run build` y `npm run lint` (sin errores).

---

### Sesión 04/09/2026: Contraste muted-foreground (WCAG AA)

**Recomendación de la auditoría:** Verificar que `text-muted-foreground` cumple el
contraste mínimo WCAG AA (4.5:1) contra el fondo.

**Archivo modificado:** `src/index.css`

**Qué hice:**
- Calculé el contraste con un script Python (HSL → RGB → luminancia relativa → ratio).
- Light theme: `--muted-foreground: 150 20% 40%` daba **4.42:1** (FALLA).
- Ajusté la luminosidad de 40% a 39%, resultando en **4.60:1** (PASA).
- Dark theme: `150 20% 65%` ya daba **9.17:1** (PASA), sin cambios.

El cambio es de 1% de luminosidad, imperceptible visualmente pero suficiente para
cumplir WCAG AA.

Verificado con `npm run build` y `npm run lint` (sin errores).

---

### Sesión 04/09/2026: Hero fallback para prefers-reduced-motion

**Recomendación de la auditoría:** Los elementos del Hero (`<h1>`, párrafo, botón)
usaban `opacity-0` y dependían de animaciones CSS (`animate-fade-in-delay-*`) para
hacerse visibles. Si el usuario tenía `prefers-reduced-motion: reduce` activado, o si
las animaciones no cargaban por cualquier motivo, el contenido quedaba invisible.

**Archivo modificado:** `src/index.css`

**Qué hice:**
- Añadí un bloque `@media (prefers-reduced-motion: reduce)` al final del archivo.
- Dentro, deshabilito las animaciones (`animation: none !important`) y fuerzo
  `opacity: 1 !important` en las 5 clases de animación del Hero.

Esto garantiza que el contenido siempre sea visible, independientemente de las
preferencias de movimiento del usuario.

Verificado con `npm run build` y `npm run lint` (sin errores).

---

### Sesión 04/09/2026: Enlace roto en ContactSection

**Recomendación de la auditoría:** El enlace de «Ubicación» usaba `href="#"`, que genera
una navegación inesperada al tope de la página sin aportar nada. «Norte de España» es
información estática y no necesita ser un enlace.

**Archivo modificado:** `src/components/ContactSection.jsx`

**Qué hice:**
- Reemplacé el `<a href="#" ...>` por un `<span>` con la misma clase de color.
- Eliminé `hover:text-primary transition-colors` al no ser un elemento interactivo.

Verificado con `npm run build` y `npm run lint` (sin errores).

---

### Sesión 03/09/2026 (5.ª): Header semántico

**Recomendación de la auditoría:** La barra de navegación usaba `<nav>` como elemento
raíz, pero faltaba el `<header>` de página (logo + navegación). El uso de etiquetas
semánticas (`<header>`/`<footer>`) mejora SEO y la experiencia de lectores de pantalla.

**Archivo modificado:** `src/components/Navbar.jsx`

**Qué hice:**
- Convertí el elemento raíz de la barra en `<header>` (sigue siendo `fixed w-full z-50`).
- Puse el `<nav aria-label="Navegación principal">` dentro del header, haciéndolo el
  contenedor del contenido (mantiene el `container flex ...`).
- El `<footer>` de `Footer.jsx` ya usaba la etiqueta semántica correcta, así que no
  requirió cambios.

Estructura semántica resultante: `<header>` → `<nav>` → contenido; `<main>` → secciones;
`<footer>` → pie.

Verificado con `npm run build` y `npm run lint` (sin errores).

---

### Sesión 03/09/2026 (4.ª): Skip navigation link

**Recomendación de la auditoría:** No existía un enlace «Saltar al contenido», lo que
obligaba a usuarios de teclado y lectores de pantalla a recorrer todo el menú de
navegación antes de llegar al contenido.

**Archivo modificado:** `src/pages/Home.jsx`

**Qué hice:**
- Añadí como primer elemento de la página un enlace `<a href="#main-content">Saltar al
  contenido</a>`.
- Por defecto está oculto (`sr-only`) para no estorbar visualmente, pero aparece como
  botón visible arriba a la izquierda cuando recibe foco (`focus:not-sr-only focus:fixed
  ...`), que es el patrón estándar de accesibilidad.
- Añadí `id="main-content"` y `scroll-mt-20` al `<main>` para que al saltar el contenido
  no quede oculto bajo la barra de navegación fija.

Verificado con `npm run build` y `npm run lint` (sin errores). Las utilidades
`sr-only`/`not-sr-only` se generan correctamente en el CSS.

---

### Sesión 03/09/2026 (3.ª): Imágenes de proyectos con dimensiones

**Fallo/recomendación:** Las imágenes de los proyectos no declaraban `width`/`height`.
Aunque el contenedor ya fija la altura (`h-48` + `object-cover`), declarar las
dimensiones nativas de cada imagen es una buena práctica que evita *layout shift* y da
al navegador/crawlers información sobre el tamaño.

**Archivo modificado:** `src/components/ProjectSection.jsx`

**Qué hice:**
- Añadí los campos `imageWidth` e `imageHeight` con las dimensiones reales de cada
  captura (consultadas del filesystem con `sips`):
  - tfg-reservas.png → 2514×2158
  - autoescuela.png → 2384×1586
  - efemerides-videojuegos.png → 2006×1610
  - fem-weather.png → 1326×825
  - victory-royale-timer.png → 3242×2638
- Añadí `width={project.imageWidth}` y `height={project.imageHeight}` al `<img>`.

Verificado con `npm run build` y `npm run lint` (sin errores).

---

### Sesión 03/09/2026 (2.ª): ThemeToggle en Home

**Situación:** La funcionalidad de cambiar entre tema claro/oscuro **ya estaba activa**
en la página principal, porque el componente `ThemeToggle` se renderiza dentro del
`Navbar` (tanto en escritorio como en el menú móvil).

En `Home.jsx` quedaba un `<ThemeToggle />` **comentado** y un **import sin usar** de ese
componente. Eran código muerto que podía confundir (parecía que el toggle estaba
deshabilitado, cuando en realidad ya funciona vía Navbar).

**Archivo modificado:** `src/pages/Home.jsx`

**Qué hice:**
- Eliminé la línea comentada `{/* <ThemeToggle /> */}`.
- Eliminé el import sin usar `import { ThemeToggle } ...`.

No añadí ningún toggle nuevo en posición visible, porque ya existe en la barra de
navegación (sería duplicarlo). Si prefieres que el toggle aparezca además en otro sitio,
dímelo y lo colocamos.

---

### Sesión 03/09/2026: Corrección de fallos (visuales y funcionales)

### 1. Tokens de color «shadcn» no definidos (FALLO CRÍTICO — visual roto en todo el sitio)

**Fallo:** El proyecto usa clases de colores del patrón shadcn/ui (`text-muted-foreground`,
`bg-secondary`, `text-secondary-foreground`, `border-input`, `bg-destructive`,
`text-destructive-foreground`, etc.) en varios componentes, pero esos tokens de color
**nunca se definieron** en `index.css`. Las clases se usaban pero no generaban ningún CSS,
por lo que:

- Los textos secundarios (`text-muted-foreground`) se veían del mismo color que el principal.
- Los fondos de sección (`bg-secondary`) no se mostraban.
- Los tags de proyectos (`text-secondary-foreground`) con color incorrecto.
- Los bordes de los inputs del formulario (`border-input`) con color por defecto.

Comprobé con grep en el CSS compilado que estas clases generaban `0` resultados antes
de la corrección.

**Archivo modificado:** `src/index.css`

**Qué hice:**
- Añadí los tokens mapeados en `@theme`:
  `--color-secondary`, `--color-secondary-foreground`, `--color-muted`,
  `--color-muted-foreground`, `--color-destructive`, `--color-destructive-foreground`,
  `--color-input`, `--color-ring`.
- Definí los valores de cada uno en el tema claro (`:root`) y en el oscuro (`.dark`),
  usando la misma paleta verde del proyecto.

Resultado: todas esas clases ahora sí generan CSS y los estilos se aplican correctamente
en ambos temas.

---

### 2. Clase `text-gradient` sin definir (Hero)

**Fallo:** En `HeroSection.jsx` el nombre «Ceñera» del título usaba la clase
`text-gradient`, pero esa utility no existía en ningún sitio del proyecto. El texto
no mostraba el efecto degradado que pretendía el autor.

**Archivo modificado:** `src/index.css`

**Qué hice:** Añadí la utility `text-gradient` con un degradado que va del color
`primary` a un `primary` semitransparente, usando `background-clip: text` y
`color: transparent` (la forma estándar de degradado en texto).

---

### 3. Animación `grow` de las barras de habilidades sin keyframe (Skills)

**Fallo:** En `SkillsSection.jsx` las barras de progreso usaban
`animate-[grow_1.5s_ease-out]`, pero el keyframe `grow` no existía en `index.css`.
Las barras de habilidades **no se animaban** (aparecían ya renderizadas en vez de
crecer desde 0).

**Archivo modificado:** `src/index.css`

**Qué hice:** Añadí el keyframe `grow` (de `scaleX(0)` a `scaleX(1)`) y lo declaré como
`--animate-grow`. Combinado con `origin-left` de la barra, ahora crecen de izquierda a
derecha como se pretendía.

---

### 4. Toasts que nunca se cerraban (formulario de contacto)

**Fallo:** En `use-toast.js` la constante `TOAST_REMOVE_DELAY` estaba a `1000000`
milisegundos (~16 minutos). Cuando enviabas el formulario de contacto y salía el toast de
«Mensaje enviado» / «Error al enviar», este quedaba pegado en pantalla durante muchísimo
tiempo en vez de desaparecer automáticamente.

**Archivo modificado:** `src/hooks/use-toast.js`

**Qué hice:** Cambié `TOAST_REMOVE_DELAY` de `1000000` a `5000` (5 segundos), que es lo
habitual para un toast de confirmación.

---

### 5. Efecto `useEffect` con dependencia incorrecta (use-toast)

**Fallo:** En `use-toast.js` el `useEffect` tenía `[state]` como dependencia. Como el
estado cambia cuando se muestra/oculta un toast, el efecto se volvía a ejecutar en cada
cambio, registrando y desregistrando el listener del sistema pub/sub innecesariamente
(re-suscripciones repetidas).

**Archivo modificado:** `src/hooks/use-toast.js`

**Qué hice:** Cambié la dependencia de `[state]` a `[]`, para que el listener se registre
una sola vez al montar el componente.

---

### 6. Fondo de estrellas leído por lectores de pantalla (Accesibilidad)

**Fallo:** El componente `StarBackground` (el fondo decorativo de estrellas y meteoros)
no estaba marcado como decorativo, así que los lectores de pantalla podían procesarlo.

**Archivo modificado:** `src/components/StarBackground.jsx`

**Qué hice:** Añadí `aria-hidden="true"` al contenedor raíz del fondo de estrellas para
indicar que es decorativo y debe ignorarse en la lectura.

---

## Verificación

Tras los cambios ejecuté:

- `npm run build` → compila sin errores.
  El CSS pasó de ~33.6 kB a ~37 kB (los tokens añadidos).
- `npm run lint` → sin errores.

Comprobé con grep en el CSS compilado que todas las clases antes rotas
(`text-muted-foreground`, `bg-secondary`, `text-secondary-foreground`,
`border-input`, `text-gradient`, `@keyframes grow`) ahora se generan correctamente.

---

## Nota importante: otros cambios que NO son míos

En el working tree hay otros archivos modificados que **no he tocado yo** — ya estaban
cambiados antes de esta sesión (probablemente de tu trabajo anterior o de un upgrade
de dependencias). Te lo señalo para que no los confundas con mis correcciones:

- `package.json` (subida de versiones: `vite` 7→8, `tailwindcss` 4.1→4.3, `react-router-dom` 7.6→7.18, etc.)
- `package-lock.json` (consistente con lo anterior)
- `vite.config.js` (cambio de `path` a `fileURLToPath` en el alias `@`)
- `src/components/ProjectSection.jsx` (añadir `key` a los tags)

Y hay carpetas sin seguimiento de git:
- `.agents/`, `.claude/`, `context/`, `skills-lock.json`

---

## Cambios hechos en sesiones anteriores (no de hoy)

- Añadí `.env` a `.git/info/exclude` como protección local adicional contra un commit
  accidental de variables de entorno (además del `.gitignore` que ya lo ignoraba).
  Verificado que git lo ignora correctamente con `git check-ignore -v .env`.

---

## Resumen de archivos que sí modifiqué

| Archivo | Tipo de cambio |
|---------|----------------|
| `src/index.css` | Tokens de color, keyframe `grow`, utility `text-gradient`, reduced-motion fallback, contraste muted-foreground |
| `src/hooks/use-toast.js` | Bajar tiempo de cierre de toast y corregir dependencia del `useEffect` |
| `src/components/StarBackground.jsx` | Añadir `aria-hidden="true"` |
| `src/components/ContactSection.jsx` | Eliminar enlace `href="#"` roto |
| `public/og-image.svg` | Diseño vectorial de la OG image |
| `public/og-image.png` | Imagen OG generada (1200×630) |
| `public/projects/*.webp` | Imágenes de proyectos convertidas a WebP |
| `scripts/generate-og.js` | Script de conversión SVG→PNG |
| `scripts/convert-projects.js` | Script de conversión PNG→WebP |
| `src/components/ProjectSection.jsx` | Ref .png → .webp |
| `index.html` | Actualizar metas og:image, twitter:image, structured data |
| `package.json` | Añadir script `generate-og`, devDependency `sharp` |
| `.git/info/exclude` | Protección local contra commit de `.env` |
