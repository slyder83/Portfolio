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
   - **Rama de git:** `chore/portfolio-improvements` (commit `6e78e1f`). Todo el trabajo
     está **commiteado** en esa rama (no en `main`). El working tree quedó limpio.
   - Hechas: corrección de fallos visuales/funcionales; ThemeToggle en Home (limpieza);
      imágenes con dimensiones; skip navigation link; header semántico; enlace roto
      en ContactSection.
   - **Pendiente (lista de mejoras de la auditoría):**
      a) ✅ Imágenes a WebP — convertidas (04/09/2026). Verificadas y PNG eliminados.
      b) ✅ Enlace roto en ContactSection — corregido (04/09/2026).
      c) ✅ Hero opacity-0 sin fallback — corregido (04/09/2026).
      d) ✅ Contraste muted-foreground — corregido (04/09/2026).
      e) ✅ og:image real — creado y actualizado (04/09/2026).
   - Recordatorio: quedamos en **corregir fallos, no refactorizar**.

---

**Nota final de esta sesión:** todo está guardado y commiteado en la rama
`chore/portfolio-improvements` (no en `main`). El commit NO se ha subido a GitHub
(aún no lo has pedido). Si mañana o más adelante quieres publicarlo, habrá que hacer
`git push origin chore/portfolio-improvements` y, si procede, abrir un PR hacia `main`.

## Últimos cambios

<!-- Añadir aquí las nuevas entradas (la más reciente primero). -->

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
