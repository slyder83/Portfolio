# Reglas de Estilo y Estándares de Código (Coding Standards)

> Referencia normativa para la escritura de código en **Portfolio Personal**.
> Este documento es la ley para humanos y agentes de IA.

---

**Última actualización:** 2026-09-03 | **Versión:** 3.1

---

## 🎯 Objetivo
- Garantizar un código **limpio, predecible y profesional**.
- Asegurar que el proyecto sea mantenible siguiendo las mejores prácticas de React 19.
- Establecer una base sólida para que la IA genere código coherente con el existente.
- Mantener consistencia con la **arquitectura basada en componentes** y los **principios SOLID**.

---

## 🏗️ Arquitectura (Componentes React)

### Estructura de Capas
El proyecto sigue una **arquitectura basada en componentes de React**:

```
src/
├── components/      # Componentes reutilizables de UI
├── pages/           # Vistas enrutables (Home, NotFound)
├── hooks/           # Custom Hooks de React
└── lib/             # Utilidades y configuración compartida
```

### Reglas de Dependencia
1. **Pages** → Solo componen componentes, sin lógica de negocio
2. **Components** → Pueden usar Hooks y Lib, pero no Pages
3. **Hooks** → Solo usan Lib y APIs de React
4. **Lib** → Funciones puras, sin dependencias de React

**Para código nuevo:**
- Evitar hardcodear textos largos y datos reutilizables directamente en JSX.
- Mantener los datos estáticos en una fuente separada cuando se extraigan del componente.
- Mezclar lógica de negocio con componentes de vista
- Acceder al DOM directamente sin usar refs o hooks

### Ubicación del Código
| Tipo de Código | Capa | Ejemplo |
|----------------|------|---------|
| Datos estáticos (proyectos, skills) | Lib | Extraer a `portfolioData.js` en una futura refactorización; hoy están en los componentes correspondientes |
| Lógica de estado compleja | Hooks | Hooks existentes como `use-toast.js`; crear otros solo cuando la lógica lo requiera |
| Primitivos de UI reutilizables | Components/ui | `toast.jsx`, `toaster.jsx` |
| Secciones de página | Components | `HeroSection.jsx` |
| Composición de vistas | Pages | `Home.jsx` |
| Estilos globales y variables | Raíz | `index.css` |

---

## 🧱 Principios Generales (Mentalidad de Diseño)

### SOLID Principles
- **S** - Single Responsibility: Una clase = una razón para cambiar
- **O** - Open/Closed: Abierto a extensión, cerrado a modificación
- **L** - Liskov Substitution: Clases derivadas deben ser sustituibles
- **I** - Interface Segregation: Interfaces específicas > interfaces generales
- **D** - Dependency Inversion: Depender de abstracciones, no de concretos

### Otros Principios
- **DRY (Don't Repeat Yourself):** Evitar duplicidad. Si una lógica o valor se usa más de una vez, extraer a función/constante.
- **KISS (Keep It Simple):** Preferir soluciones simples y nativas. No sobre-proyectar.
- **YAGNI (You Ain't Gonna Need It):** No implementar funcionalidades futuras que no estén en `project_profile.md`.
- **Separation of Concerns:** Separar estrictamente cálculo (lógica) del renderizado (DOM).

---

## 🏷️ Nomenclatura e Idioma (Estricto)

### Idioma
- **Código técnico:** Todo en **Inglés** (variables, funciones, componentes, comentarios)
- **Contenido visible:** Español (textos del portfolio de Roberto Ceñera)

### Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes React | `PascalCase.jsx` | `HeroSection.jsx`, `FeatureCard.jsx` |
| Variables y funciones | `camelCase` | `portfolioData`, `handleSubmit` |
| Constantes | `UPPER_SNAKE_CASE` | `EMAILJS_SERVICE_ID` |
| Archivos de utilidad/datos | `camelCase.js` | `utils.js`, `portfolioData.js` (cuando se extraiga) |
| Custom Hooks | `camelCase.js` con prefijo `use` | `use-toast.js` |
| Carpetas | `kebab-case` o descriptivo | `components/`, `lib/` |
| Booleanos | Prefijo interrogativo | `isOpen`, `hasError`, `isDark` |
| Callbacks / handlers | Prefijo `handle` o `on` | `handleSubmit`, `onToggle` |

### Archivos Especiales
```
App.jsx             # Enrutamiento principal
main.jsx            # Punto de entrada
index.css           # Estilos globales y @theme de Tailwind
*Section.jsx        # Secciones de página
*Card.jsx           # Tarjetas de contenido
use*.js             # Custom Hooks de React
*Data.js            # Datos estáticos en lib/
```

---

## 📦 Módulos ES6 / Imports en React

### Import/Export
```jsx
// ✅ CORRECTO: Named exports para componentes
export const HeroSection = () => { }
export const FeatureCard = ({ title }) => { }

// ✅ CORRECTO: Default export para páginas
export default function App() { }

// ❌ INCORRECTO: CommonJS
module.exports = { }
const x = require('./file')
```

### Orden de Imports
```jsx
// 1. Imports de librerías externas (React, React Router, Lucide...)
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code, User } from 'lucide-react'

// 2. Imports de componentes internos
import { Navbar } from '../components/Navbar'
import { HeroSection } from '../components/HeroSection'

// 3. Imports de hooks propios
import { useToast } from '../hooks/use-toast'

// 4. Imports de datos/utilidades
import { cn } from '../lib/utils'
// Cuando exista: import { PROJECTS } from '../lib/portfolioData'
```

### Extensiones
- En React con Vite, **no es necesario incluir la extensión** en imports de archivos propios.
- Usar rutas relativas: `'../components/Navbar'` no `'src/components/Navbar'`
- El alias `@/` puede configurarse en Vite para imports absolutos desde `src/`.

---

## 🧱 Estructura de Código (React / JavaScript Moderno)

### Variables
```javascript
// ✅ CORRECTO
const CONSTANT_VALUE = 100;
let mutableValue = 0;

// ❌ INCORRECTO
var oldStyleVar = 0; // Prohibido usar var
```

### Funciones
```javascript
// ✅ CORRECTO: Arrow functions para callbacks
const handleClick = (event) => {
  // ...
};

// ✅ CORRECTO: Function declaration para funciones exportadas
export function filterProjectsByTag(projects, tag) {
  // ...
}

// ✅ CORRECTO: Early returns
function validate(data) {
  if (!data) return false;
  if (!data.value) return false;
  return true;
}

// ❌ INCORRECTO: Anidación innecesaria
function validate(data) {
  if (data) {
    if (data.value) {
      return true;
    }
  }
  return false;
}
```

### Async/Await
```javascript
// ✅ CORRECTO: async/await con try/catch
async function loadConfig() {
  try {
    const config = await fetch('./config.json');
    return await config.json();
  } catch (error) {
    console.error('Load failed:', error);
    throw error;
  }
}

// ❌ INCORRECTO: Promises sin await
async function loadConfig() {
  return fetch('./config.json')
    .then(r => r.json()); // Usar async/await en su lugar
}
```

### Desestructuración
```javascript
// ✅ CORRECTO
const { title, tags } = project;
const [first, second] = array;

// ✅ CORRECTO: Con defaults
const { timeout = 5000 } = options;
```

### Spread/Rest
```javascript
// ✅ CORRECTO
const newObj = { ...oldObj, updated: true };
const merged = [...array1, ...array2];

function process(...args) { }
```

---

## 📝 Documentación (JSDoc)

### Obligatorio para:
- Todas las funciones exportadas
- Todas las clases
- Métodos públicos de clases

### Formato
```javascript
/**
 * Filters projects by technology tag
 * @param {Project[]} projects - List of projects
 * @param {string} tag - Technology to filter by
 * @returns {Project[]} Projects that include the tag
 *
 * @example
 * const phpProjects = filterProjectsByTag(projects, 'PHP');
 */
export function filterProjectsByTag(projects, tag) {
  return projects.filter((project) => project.tags.includes(tag));
}
```

### TypeDefs (cuando ayuda)
```javascript
/**
 * @typedef {Object} Project
 * @property {string} title - Project name
 * @property {string} description - Short description
 * @property {string[]} tags - Technologies used
 * @property {string} [githubUrl] - Repository URL (optional)
 * @property {string} [demoUrl] - Live demo URL (optional)
 */
```

---

## 📄 Estándares de HTML (Semantic HTML5)

### Estructura Semántica Obligatoria

**Regla de Oro:** Si existe una etiqueta semántica apropiada, **SIEMPRE** usarla sobre `<div>` o `<span>`.

#### Etiquetas Principales del Proyecto

| En lugar de | Usar | Cuándo | Ejemplo Portfolio |
|-------------|------|--------|------------------|
| `<div class="header">` | `<header>` | Encabezado principal | Logo + navegación |
| `<div class="nav">` | `<nav>` | Menú de navegación | Links a secciones |
| `<div class="main">` | `<main>` | Contenido principal | Área del portfolio |
| `<div class="section">` | `<section>` | Sección temática | Sección de proyectos |
| `<div class="article">` | `<article>` | Contenido autocontenido | Tarjeta de proyecto |
| `<div class="aside">` | `<aside>` | Contenido relacionado | Información adicional |
| `<div class="footer">` | `<footer>` | Pie de página | Links legales + copyright |
| `<div class="time">` | `<time>` | Fechas y horas | Fecha de proyecto |

### Ejemplo Práctico: Portfolio Personal

```html
<!-- ❌ INCORRECTO: Solo divs -->
<div class="header">
  <div class="logo">Roberto Ceñera</div>
  <div class="nav">
    <div class="link">Proyectos</div>
    <div class="link">Contacto</div>
  </div>
</div>
<div class="main">
  <div class="section">
    <div class="title">Mis Proyectos</div>
    <div class="project-card">
      <div class="project-name">Sistema de Reservas</div>
    </div>
  </div>
</div>
<div class="footer">
  <div class="copyright">© 2026</div>
</div>

<!-- ✅ CORRECTO: HTML5 Semántico -->
<header class="site-header">
  <h1 class="site-logo">Roberto Ceñera</h1>
  <nav class="main-nav" aria-label="Navegación principal">
    <a href="#projects" class="nav-link">Proyectos</a>
    <a href="#contact" class="nav-link">Contacto</a>
  </nav>
</header>

<main class="main-content">
  <section id="projects" aria-labelledby="projects-title">
    <h2 id="projects-title">Mis Proyectos</h2>
    <article class="project-card">
      <h3>Sistema de Reservas</h3>
      <p>Aplicación web completa...</p>
    </article>
  </section>
</main>

<footer class="site-footer">
  <p class="copyright">© 2026 Roberto Ceñera</p>
</footer>
```

### Atributos Semánticos Importantes

#### `<time datetime>`
```html
<!-- ✅ CORRECTO: Formato ISO 8601 -->
<time datetime="2026-02-15T00:00:00Z">
  February 15, 2026
</time>

<!-- Para el countdown dinámico -->
<time 
  class="countdown-display" 
  datetime="2026-02-15T00:00:00Z"
  data-target-date="2026-02-15T00:00:00Z">
  <!-- Contenido actualizado por JS -->
</time>
```

#### `<html lang>`
```html
<!-- ✅ CORRECTO: Especificar idioma -->
<html lang="es">
<html lang="en">

<!-- Se actualiza dinámicamente via JS -->
document.documentElement.lang = currentLanguage;
```

#### Headings Jerárquicos (H1-H6)
```html
<!-- ✅ CORRECTO: Jerarquía lógica -->
<h1>Victory Royale Timer</h1>
  <h2>Season 5 Countdown</h2>
    <h3>Time Remaining</h3>

<!-- ❌ INCORRECTO: Saltos de nivel -->
<h1>Victory Royale Timer</h1>
  <h4>Season 5 Countdown</h4> <!-- Salta h2 y h3 -->
```

### Cuándo SÍ Usar `<div>` y `<span>`

#### Casos Válidos para `<div>`
```html
<!-- ✅ Contenedores de layout sin significado semántico -->
<section class="countdown-section">
  <div class="flex-container">
    <!-- Solo para display: flex -->
    <article>...</article>
  </div>
</section>

<!-- ✅ Wrappers para aplicar estilos específicos -->
<div class="gradient-overlay">
  <header>...</header>
</div>

<!-- ✅ Cuando ninguna etiqueta semántica se ajusta -->
<div class="decorative-spacer"></div>
```

#### Casos Válidos para `<span>`
```html
<!-- ✅ Styling inline de texto -->
<p>The season ends in <span class="highlight">45 days</span></p>

<!-- ✅ Íconos decorativos -->
<button>
  <span class="icon-star" aria-hidden="true"></span>
  Favorite
</button>
```

### Regla del 30%
**Máximo 30% de la estructura HTML puede ser `<div>` o `<span>` genéricos.**

```html
<!-- Ejemplo: 10 elementos totales -->
<header>           <!-- semántico -->
  <h1></h1>       <!-- semántico -->
  <nav>           <!-- semántico -->
    <div class="flex-wrapper"> <!-- layout - OK -->
      <a></a>     <!-- semántico -->
      <a></a>     <!-- semántico -->
    </div>
  </nav>
</header>
<main>            <!-- semántico -->
  <section>       <!-- semántico -->
    <article>     <!-- semántico -->
      <time>      <!-- semántico -->
        <div class="time-grid"> <!-- layout - OK -->
          <!-- ... -->
        </div>
      </time>
    </article>
  </section>
</main>

<!-- 2 divs de 10 elementos = 20% ✓ -->
```

### Accesibilidad en HTML

#### ARIA Labels y Roles
```html
<!-- ✅ CORRECTO: ARIA para contenido dinámico -->
<time 
  class="countdown-display"
  aria-live="polite"
  aria-atomic="true"
  role="timer">
  <!-- Actualizado cada segundo -->
</time>

<!-- ✅ CORRECTO: Botones de idioma -->
<nav class="language-selector" aria-label="Language selection">
  <button 
    class="lang-button"
    aria-pressed="true"
    aria-label="Switch to English">
    EN
  </button>
</nav>
```

#### Skip Links
```html
<!-- ✅ CORRECTO: Navegación por teclado -->
<a href="#main-content" class="skip-link">
  Skip to countdown
</a>

<main id="main-content" tabindex="-1">
  <!-- ... -->
</main>
```

### Validación HTML

#### Herramientas
- **W3C Validator:** https://validator.w3.org/
- **HTML5 Outliner:** https://gsnedders.html5.org/outliner/

#### Comandos NPM (si se instalan)
```bash
# Validar HTML
npm run validate:html

# Ver estructura semántica
npm run outline:html
```

---

## 🎨 Estándares de Estilos (Tailwind CSS v4)

### Variables de Tema
```css
/* ✅ CORRECTO: Usar variables del @theme en index.css */
/* En JSX con Tailwind */
<div className="bg-primary text-primary-foreground" />
<div className="border-border" />

/* ❌ INCORRECTO: Colores hardcodeados */
<div style={{ backgroundColor: '#48bb78' }} />
```

### Clases de Utilidad vs CSS Ad-hoc
```jsx
/* ✅ CORRECTO: Usar clases Tailwind */
<button className="px-6 py-2 rounded-full bg-primary font-medium
                   transition-all duration-300 hover:scale-105">
  Contacta
</button>

/* ✅ CORRECTO: @utility en index.css para patrones repetidos */
/* En index.css: */
@utility cosmic-button {
  @apply px-6 py-2 rounded-full bg-primary font-medium
         transition-all duration-300 hover:scale-105;
}
/* En JSX: */
<button className="cosmic-button">Contacta</button>

/* ❌ INCORRECTO: CSS inline para estilos que pueden ser Tailwind */
<button style={{ padding: '0.5rem 1.5rem', borderRadius: '9999px' }}>
  Contacta
</button>
```

### Condicionales de Clase
```jsx
/* ✅ CORRECTO: Usar clsx o cn() para clases condicionales */
import { clsx } from 'clsx'

const Button = ({ variant, className }) => (
  <button className={clsx(
    'px-6 py-2 rounded-full transition-all',
    variant === 'primary' && 'bg-primary text-primary-foreground',
    variant === 'outline' && 'border border-primary text-primary',
    className
  )}>
    ...
  </button>
)

/* ❌ INCORRECTO: Concatenación de strings */
<button className={"btn" + (isActive ? " btn-active" : "")}>
```

### Orden de Propiedades CSS (en @utility)
```css
@utility card-hover {
  /* 1. Transición */
  @apply transition-transform duration-300;
  /* 2. Efectos hover */
  @apply hover:scale-[1.02] hover:shadow-lg;
}
```

---

## ✏️ Formato

### Indentación
**CRÍTICO:** Usar **2 espacios** (NO tabs)

```javascript
// ✅ CORRECTO: 2 espacios
function example() {
  if (condition) {
    doSomething();
  }
}

// ❌ INCORRECTO: Tabs o 4 espacios
function example() {
	if (condition) {
		doSomething();
	}
}
```

### Punto y coma
**Obligatorios** al final de cada statement.

```javascript
// ✅ CORRECTO
const x = 5;
doSomething();

// ❌ INCORRECTO
const x = 5
doSomething()
```

### Espaciado
```javascript
// ✅ CORRECTO: Espacios alrededor de operadores
const sum = a + b;
if (condition === true) { }

// ✅ CORRECTO: Salto de línea entre bloques lógicos
function example() {
  const data = loadData();
  
  if (!data) {
    return null;
  }
  
  return processData(data);
}

// ❌ INCORRECTO: Sin espacios
const sum=a+b;
if(condition===true){ }
```

### Llaves
```javascript
// ✅ CORRECTO: Siempre usar llaves
if (condition) {
  doSomething();
}

// ❌ INCORRECTO: Sin llaves (incluso en una línea)
if (condition) doSomething();
```

---

## 🚫 Prohibiciones Estrictas

| # | Prohibición | Razón | Alternativa |
|---|-------------|-------|-------------|
| 1 | ❌ **No usar `var`** | Scope confuso, hoisting | `const` y `let` |
| 2 | ❌ **No usar `!important` en CSS** | Rompe especificidad | Mejorar selectores Tailwind |
| 3 | ❌ **No usar estilos inline** | Inconsistencia con Tailwind | Clases de utilidad |
| 4 | ❌ **No ampliar el hardcodeo de textos largos en JSX** | Dificulta mantenimiento | Extraer datos compartidos cuando se refactorice el componente |
| 5 | ❌ **No hardcodear colores** | Inconsistencia visual | Variables `@theme` de Tailwind |
| 6 | ❌ **No usar números mágicos** | Código críptico | Constantes nombradas |
| 7 | ❌ **No mezclar lógica en vistas** | Acoplamiento | Mover a Hooks o Lib |
| 8 | ❌ **No usar CommonJS** | No es estándar moderno | ES6 modules |
| 9 | ❌ **No crear componentes clase** | Patrón obsoleto en React 19 | Componentes funcionales + Hooks |
| 10 | ❌ **No manipular el DOM directamente** | Anti-patrón en React | Usar `useState`, `useRef`, `useEffect` |
| 11 | ❌ **No abusar de `<div>` sin semántica** | Pérdida de accesibilidad | HTML5 semántico en JSX |

### Ejemplos de Violaciones

```javascript
// ❌ PROHIBIDO: var
var count = 0;
if (true) {
  var count = 10; // Sobrescribe la anterior
}

// ✅ CORRECTO: const/let
let count = 0;
if (true) {
  const count = 10; // Scope local
}
```

```javascript
// ❌ PROHIBIDO: Números mágicos
setTimeout(() => {
  updateProjects();
}, 1000); // ¿Qué significa 1000?

// ✅ CORRECTO: Constantes nombradas
const EMAILJS_TIMEOUT_MS = 1000;
setTimeout(() => {
  updateProjects();
}, EMAILJS_TIMEOUT_MS);
```

```javascript
// ❌ PROHIBIDO: Texto hardcodeado
const message = 'Soy desarrollador web';

// ✅ CORRECTO: Datos centralizados en lib/
const { bio } = portfolioData;
const message = bio.short;
```

---

## ✅ Checklist de Revisión para el Agente

Antes de entregar código, el agente DEBE validar:

### Arquitectura
- [ ] ¿El componente tiene una sola responsabilidad?
- [ ] ¿Los datos nuevos o compartidos están separados del JSX cuando procede? *(La extracción completa de proyectos y skills sigue pendiente)*
- [ ] ¿La lógica de estado compleja está en un Hook?

### Principios
- [ ] ¿Se respetan SRP, DRY, KISS y YAGNI?
- [ ] ¿Hay separación de concerns?

### HTML Semántico
- [ ] ¿Usa etiquetas HTML5 semánticas en el JSX?
- [ ] ¿Hay jerarquía correcta de headings (H1-H6)?
- [ ] ¿Los formularios tienen `<label>` asociados?

### Nomenclatura
- [ ] ¿Los componentes usan `PascalCase.jsx`?
- [ ] ¿Los hooks empiezan con `use`?
- [ ] ¿Los nombres son descriptivos y no ambiguos?

### Formato
- [ ] ¿Usa 2 espacios de indentación?
- [ ] ¿Hay espaciado adecuado entre bloques?

### Módulos
- [ ] ¿Usa ES6 modules (import/export)?
- [ ] ¿Los imports están ordenados correctamente (librerías → componentes → hooks → lib)?

### Estilos (Tailwind)
- [ ] ¿Se usan clases Tailwind en lugar de estilos inline?
- [ ] ¿Los colores hacen referencia a variables de `@theme`?

### Accesibilidad
- [ ] ¿Los elementos interactivos tienen ARIA labels apropiados?
- [ ] ¿Hay navegación por teclado funcional?

### Prohibiciones
- [ ] ¿No usa `var`?
- [ ] ¿No hardcodea textos largos en JSX?
- [ ] ¿No usa componentes clase?
- [ ] ¿No manipula el DOM directamente fuera de refs?

---

## 🛠️ Herramientas de Desarrollo

### ESLint (ya configurado en el proyecto)

**Configuración actual en `eslint.config.js`:**
- Extiende `eslint:recommended`
- Plugin `eslint-plugin-react-hooks` para validar reglas de Hooks
- Plugin `eslint-plugin-react-refresh` para Vite HMR

**Comandos:**
```bash
# Ejecutar linter
npm run lint
```

### Prettier (recomendado instalar)

**Configuración recomendada (`.prettierrc`):**
```json
{
  "semi": false,
  "singleQuote": false,
  "jsxSingleQuote": false,
  "tabWidth": 2,
  "useTabs": false,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### EditorConfig

**Configuración universal:**
```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

---

## ⚠️ Anti-Patrones Comunes

### ❌ Callback Hell
```javascript
// ❌ INCORRECTO: Pirámide de la muerte
loadConfig(function(config) {
  loadTranslations(config.lang, function(translations) {
    initTimer(config.endDate, function(timer) {
      updateUI(timer, function() {
        // ...
      });
    });
  });
});

// ✅ CORRECTO: async/await
async function init() {
  const config = await loadConfig();
  const translations = await loadTranslations(config.lang);
  const timer = await initTimer(config.endDate);
  await updateUI(timer);
}
```

### ❌ Modificar Prototipos Nativos
```javascript
// ❌ PROHIBIDO: Modificar prototipos
Array.prototype.myMethod = function() { /* ... */ };

// ✅ CORRECTO: Funciones helper
export function myArrayHelper(array) { /* ... */ }
```

### ❌ Uso Excesivo de `this`
```javascript
// ❌ INCORRECTO: Contexto confuso
const timer = {
  seconds: 0,
  start: function() {
    setInterval(function() {
      this.seconds++; // ¡this es undefined!
    }, 1000);
  }
};

// ✅ CORRECTO: Arrow function preserva contexto
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds++; // ✓ this es timer
    }, 1000);
  }
};
```

### ❌ Comparaciones Débiles
```javascript
// ❌ INCORRECTO: Comparación débil
if (value == null) { } // Confuso
if (count == '5') { }  // Coerción implícita

// ✅ CORRECTO: Comparación estricta
if (value === null || value === undefined) { }
if (count === 5) { }
```

---

## 📚 Referencias

### Documentación Oficial
- **React 19 Docs:** https://react.dev/learn
- **Vite:** https://vite.dev/guide/
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **React Router v7:** https://reactrouter.com/
- **JavaScript (MDN):** https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **HTML5 Semántico:** https://developer.mozilla.org/en-US/docs/Glossary/Semantics
- **ARIA (Accessibility):** https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA

### Arquitectura y Principios
- **Thinking in React:** https://react.dev/learn/thinking-in-react
- **SOLID Principles:** https://en.wikipedia.org/wiki/SOLID
- **JavaScript Design Patterns:** https://www.patterns.dev/

### Herramientas
- **ESLint:** https://eslint.org/
- **Prettier:** https://prettier.io/
- **Stylelint:** https://stylelint.io/
- **HTMLHint:** https://htmlhint.com/
- **EditorConfig:** https://editorconfig.org/
- **W3C Validator:** https://validator.w3.org/

### Guías de Estilo
- **Airbnb JavaScript Style Guide:** https://github.com/airbnb/javascript
- **Google JavaScript Style Guide:** https://google.github.io/styleguide/jsguide.html
- **Google HTML/CSS Style Guide:** https://google.github.io/styleguide/htmlcssguide.html

### Accesibilidad
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **WebAIM:** https://webaim.org/
- **A11y Project:** https://www.a11yproject.com/

---

## Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2024-12-22 | Definición inicial |
| 1.1 | 2024-12-24 | Unificación de principios generales y estándares técnicos |
| 2.0 | 2026-01-03 | Corrección de indentación, sección Clean Architecture, módulos ES6, async/await, prohibiciones |
| 2.1 | 2026-01-04 | Tabla de prohibiciones, herramientas (ESLint, Prettier), anti-patrones, referencias |
| 2.2 | 2026-01-08 | Sección HTML5 semántico completa, regla del 30%, ARIA, accesibilidad, HTMLHint |
| **3.1** | **2026-09-03** | • Reglas y ejemplos alineados con la estructura actual de Portfolio Personal<br>• Separación de datos documentada como objetivo futuro<br>• Import y componentes UI actualizados a las rutas existentes |
| 3.0 | 2026-09-01 | • Migración de Vanilla JS / Clean Arch a React 19 / Tailwind CSS v4<br>• Sección de arquitectura actualizada a componentes React<br>• CSS reemplazado por estándares Tailwind v4<br>• Imports actualizados al orden React<br>• Prohibiciones revisadas (sin frameworks externos → sin componentes clase)<br>• Herramientas actualizadas (ESLint ya configurado en el proyecto)<br>• Referencias actualizadas a React, Vite y Tailwind |

---

**Última actualización:** 2026-09-03  
**Responsable:** Roberto Ceñera
