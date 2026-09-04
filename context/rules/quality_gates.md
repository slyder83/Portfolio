# 🚦 Quality Gates (Puertas de Calidad)

> Criterios mínimos e innegociables que todo cambio debe cumplir antes de ser aceptado.
> Este documento es la última línea de defensa de la calidad del proyecto **Portfolio Personal**.

---

**Última actualización:** 2026-09-03 | **Versión:** 3.1

---

## 🎯 Propósito
Establecer los **criterios de aceptación** que garantizan que cada cambio:
- Mantiene la calidad técnica del código
- Cumple con estándares de accesibilidad y rendimiento
- Es seguro, mantenible y profesional
- Puede ser validado automáticamente por el agente de IA

Estas reglas actúan como el **filtro final** antes de que cualquier código sea integrado al proyecto.

---

## 1️⃣ Formato y Estructura (React / JSX)

### JSX Semántico

> **📖 Referencia completa:** Ver [`coding_standards.md` - Estándares de HTML](./coding_standards.md#-estándares-de-html-semantic-html5) para guía detallada de etiquetas semánticas en componentes React.

```jsx
// ✅ CORRECTO: Estructura semántica en componentes React
export const Home = () => (
  <>
    <header>
      <nav aria-label="Navegación principal">
        <a href="#hero">Inicio</a>
        <a href="#projects">Proyectos</a>
        <a href="#contact">Contacto</a>
      </nav>
    </header>

    <main>
      <section id="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Roberto Ceñera</h1>
        <p>Desarrollador Web especializado en React y Tailwind CSS</p>
      </section>

      <section id="projects" aria-labelledby="projects-title">
        <h2 id="projects-title">Proyectos</h2>
        <article>
          <h3>Sistema de Reservas</h3>
          <p>Proyecto de fin de grado con Java y Spring Boot.</p>
        </article>
      </section>
    </main>

    <footer>
      <nav aria-label="Enlaces legales">
        <a href="/privacy">Privacidad</a>
      </nav>
    </footer>
  </>
);

// ❌ INCORRECTO: Divs genéricos sin semántica
export const Home = () => (
  <div className="page">
    <div className="header">
      <div className="nav">
        <div onClick={() => scrollTo('hero')}>Inicio</div>
      </div>
    </div>
    <div className="content">
      <div className="title">Roberto Ceñera</div>
      <div className="projects">Mis proyectos</div>
    </div>
  </div>
);
```

### Validaciones JSX / HTML
| Criterio | Requisito | Herramienta |
|----------|-----------|-------------|
| **Validación W3C** | `index.html` con 0 errores | [W3C Validator](https://validator.w3.org/) |
| **Etiquetas semánticas** | Usar `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>` en JSX | Inspección manual / ESLint |
| **Landmarks accesibles** | Cada sección principal con `id` y/o `aria-labelledby` | Lighthouse / Inspección |
| **Jerarquía de headings** | H1 único en la página, orden lógico (H1→H2→H3) | Lighthouse / Inspección |
| **`lang` en HTML** | `index.html` con `lang="es"` | Validación manual |
| **Atributos `alt`** | Todas las imágenes de proyectos y assets | Lighthouse |
| **ESLint sin errores** | `npm run lint` pasa sin errores | ESLint |

### Estilos con Tailwind CSS v4
```jsx
// ✅ CORRECTO: Clases Tailwind + tokens del tema (@theme en index.css)
<button className="min-h-11 min-w-11 bg-primary text-primary-foreground rounded-lg px-4">
  Ver proyectos
</button>

// ✅ CORRECTO: Clases condicionales con cn()
import { cn } from '@/lib/utils';
<div className={cn('p-4 rounded-lg', isActive && 'bg-primary/10')} />

// ❌ INCORRECTO: Estilos inline hardcodeados
<button style={{ background: '#1A1A2E', color: '#FFFFFF', padding: '1rem' }}>
  Ver proyectos
</button>

// ❌ PROHIBIDO: !important en CSS sin justificación documentada
```

### React / JavaScript Moderno
```jsx
// ✅ CORRECTO: Componente funcional con hooks
import { useState } from 'react';

/**
 * Toggle de tema claro/oscuro
 * @returns {JSX.Element}
 */
export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

// ❌ INCORRECTO: Componente de clase
class ThemeToggle extends React.Component { /* ... */ }

// ❌ INCORRECTO: Código legacy
var handleClick = function() { /* ... */ }
```

### Nomenclatura Estricta
| Tipo | Formato | Ejemplo | Idioma |
|------|---------|---------|--------|
| Componentes React | `PascalCase.jsx` | `HeroSection.jsx` | Inglés |
| Custom Hooks | `use*.js` | `use-toast.js` | Inglés |
| Utilidades / Datos | `camelCase.js` | `portfolioData.js`, `utils.js` | Inglés |
| Variables | `camelCase` | `isSubmitting`, `projectList` | Inglés |
| Constantes | `UPPER_SNAKE_CASE` | `EMAILJS_SERVICE_ID` | Inglés |

---

## 2️⃣ Lógica y Tipado (JSDoc)

### Contratos de Tipos
```javascript
/**
 * @typedef {Object} Project
 * @property {string} title - Nombre del proyecto
 * @property {string} description - Descripción breve
 * @property {string[]} tags - Tecnologías usadas
 * @property {string} [githubUrl] - URL del repositorio (opcional)
 * @property {string} [liveUrl] - URL de demo en producción (opcional)
 */

/**
 * Filtra proyectos por tecnología
 * @param {Project[]} projects - Lista de proyectos
 * @param {string} tag - Tecnología a filtrar
 * @returns {Project[]} Proyectos que contienen el tag
 */
export function filterProjectsByTag(projects, tag) {
  return projects.filter((p) => p.tags.includes(tag));
}
```

### Funciones Puras (Lib Layer)
```javascript
// ✅ CORRECTO: Función pura en lib/, sin efectos secundarios
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => twMerge(clsx(inputs));

// ❌ INCORRECTO: Función impura que manipula el DOM directamente
function highlightProject(projectId) {
  document.getElementById(projectId).classList.add('active'); // Prohibido
}
```

### Inmutabilidad
```javascript
// ✅ CORRECTO: No mutar objetos ni arrays de estado
const projects = loadProjects();
const updatedProjects = [...projects, newProject];
const updatedProject = { ...projects[0], title: 'Nuevo título' };

// ❌ INCORRECTO: Mutación directa
const projects = loadProjects();
projects.push(newProject); // Modifica el original
projects[0].title = 'Nuevo título'; // Mutación directa
```

---

## 3️⃣ Pruebas y Cobertura

> **Nota:** El proyecto aún no tiene runner de tests configurado. Estos umbrales son **criterios aspiracionales** que serán obligatorios cuando se añada Vitest o similar.

### Estructura de Tests (futura)
```javascript
// tests/lib/utils.test.js
import { cn } from '../../src/lib/utils';

describe('cn', () => {
  it('should merge Tailwind classes correctly', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });
});
```

### Umbrales de Cobertura
| Capa | Cobertura Mínima | Justificación |
|------|------------------|---------------|
| Lib (`src/lib/`) | **100%** | Funciones puras y datos estáticos |
| Hooks (`src/hooks/`) | **80%** | Lógica de estado reutilizable |
| Components (`src/components/`) | **60%** | UI con lógica mínima |
| Pages (`src/pages/`) | **40%** | Composición de vistas (testing manual complementario) |

### Independencia de Tests
```javascript
// ✅ CORRECTO: Test de función pura en lib/
import { cn } from './utils.js';

// ❌ INCORRECTO: Test que requiere renderizado completo sin Testing Library
import { ContactSection } from './ContactSection.jsx';
// Requeriría @testing-library/react + jsdom
```

---

## 4️⃣ Accesibilidad (WCAG 2.1 AA)

### Contraste de Color
| Elemento | Ratio Mínimo | Herramienta |
|----------|--------------|-------------|
| Texto normal | 4.5:1 | [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) |
| Texto grande (18pt+) | 3:1 | Chrome DevTools |
| Elementos UI | 3:1 | Lighthouse |

```css
/* ✅ CORRECTO: Tokens de tema con contraste verificado (index.css @theme) */
@theme {
  --color-primary: /* verificado ≥ 4.5:1 sobre fondo */;
  --color-muted-foreground: /* verificado ≥ 4.5:1 sobre fondo */;
}

/* ❌ INCORRECTO: Color con contraste insuficiente en dark mode */
.text-muted { color: #888888; } /* Puede fallar sobre fondos claros */
```

### Navegación por Teclado
```jsx
// ✅ CORRECTO: Elementos interactivos nativos accesibles
<button
  className="min-h-11 min-w-11"
  aria-label="Activar modo oscuro"
  onClick={toggleTheme}
>
  <Moon className="h-5 w-5" />
</button>

// ❌ INCORRECTO: Div no accesible por teclado
<div className="theme-toggle" onClick={toggleTheme}>
  <Moon />
</div>
```

### Tamaños de Target
```jsx
// ✅ CORRECTO: Área táctil mínima 44x44px (min-h-11 min-w-11 en Tailwind)
<button className="min-h-11 min-w-11 p-3 rounded-full">
  <Send className="h-5 w-5" />
</button>

// ❌ INCORRECTO: Botón demasiado pequeño
<button className="h-5 w-5 p-0">
  <Send className="h-3 w-3" />
</button>
```

### ARIA para Contenido Dinámico
```jsx
// ✅ CORRECTO: Toast con aria-live para anuncios al lector de pantalla
<div role="status" aria-live="polite" aria-atomic="true">
  Mensaje enviado correctamente
</div>

// ✅ CORRECTO: Elementos decorativos ocultos a lectores de pantalla
<div aria-hidden="true">
  <StarBackground />
</div>

// ❌ INCORRECTO: Icono decorativo sin aria-hidden
<div>
  <StarBackground /> {/* El lector de pantalla intentará leerlo */}
</div>
```

---

## 5️⃣ Rendimiento (Core Web Vitals)

### Métricas Objetivo
| Métrica | Umbral | Categoría |
|---------|--------|-----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Bueno |
| **INP** (Interaction to Next Paint) | < 200ms | Bueno |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Bueno |
| **TTFB** (Time to First Byte) | < 800ms | Bueno |

### Optimización de Assets
```jsx
// ✅ CORRECTO: Imágenes de proyectos optimizadas
<img
  src={project.image}
  alt={project.imageAlt}
  loading="lazy"
  width={800}
  height={450}
  className="rounded-lg object-cover"
/>

// ❌ INCORRECTO: PNG sin optimizar ni dimensiones
<img src="/projects/reservas.png" alt="Proyecto" />
```

### Carga de Scripts (Vite)
```html
<!-- ✅ CORRECTO: Vite gestiona el bundle automáticamente -->
<script type="module" src="/src/main.jsx"></script>

<!-- ❌ INCORRECTO: Scripts bloqueantes adicionales sin defer/module -->
<script src="analytics.js"></script>
```

### Prevención de CLS
```jsx
// ✅ CORRECTO: Reservar espacio para imágenes y contenido dinámico
<div className="aspect-video w-full overflow-hidden rounded-lg">
  <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
</div>

// ❌ INCORRECTO: Imagen sin dimensiones que provoca layout shift
<img src={project.image} alt={project.title} />
```

---

## 6️⃣ Seguridad y Configuración

### Sanitización de Datos
```javascript
// ✅ CORRECTO: Validación de datos del formulario antes de enviar
const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(formRef.current);

  const email = formData.get('email');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast({ title: 'Email inválido', variant: 'destructive' });
    return;
  }

  emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    formRef.current,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};

// ❌ INCORRECTO: Renderizar HTML sin sanitizar
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // XSS risk

// ❌ INCORRECTO: Credenciales hardcodeadas
emailjs.sendForm('service_abc123', 'template_xyz', form, 'pk_live_secret');
```

### Verificación de Secretos
```javascript
// ❌ PROHIBIDO: Credenciales en código
const API_KEY = 'pk_live_abc123xyz'; // NUNCA

// ✅ CORRECTO: Variables de entorno de Vite
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

### Checklist de Seguridad
- [ ] No hay credenciales hardcodeadas
- [ ] No hay rutas locales del desarrollador (`/Users/...`, `C:\...`)
- [ ] Datos del formulario son validados antes de enviarse
- [ ] No se usa `dangerouslySetInnerHTML` con datos de usuario
- [ ] Las variables sensibles están en `.env` (no commiteadas)
- [ ] No hay comentarios con información sensible

---

## 7️⃣ SEO y Meta-Tags

### Meta Tags Esenciales (`index.html`)
```html
<!-- ✅ CORRECTO: Meta tags completos (contenido real del proyecto) -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://portfolio-five-steel-52.vercel.app/" />

  <title>Roberto Ceñera | Portfolio</title>
  <meta name="description" content="Portfolio personal de Roberto Ceñera, desarrollador web especializado en React, Tailwind CSS y PHP.">

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_ES" />
  <meta property="og:title" content="Roberto Ceñera | Portfolio" />
  <meta property="og:description" content="Portfolio personal de Roberto Ceñera, desarrollador web especializado en React, Tailwind CSS y PHP." />
  <meta property="og:image" content="/favicon.png" />
  <meta property="og:url" content="https://portfolio-five-steel-52.vercel.app/" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Roberto Ceñera | Portfolio" />
  <meta name="twitter:description" content="Portfolio personal de Roberto Ceñera, desarrollador web." />
  <meta name="twitter:image" content="https://portfolio-five-steel-52.vercel.app/favicon.png" />

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Roberto Ceñera",
    "url": "https://portfolio-five-steel-52.vercel.app/",
    "jobTitle": "Desarrollador Web"
  }
  </script>
</head>
```

### Validaciones SEO
| Criterio | Requisito | Herramienta |
|----------|-----------|-------------|
| **Title único** | Descriptivo, < 60 caracteres | Lighthouse |
| **Meta description** | ~160 caracteres, con keywords relevantes | Lighthouse |
| **Open Graph** | `og:title`, `og:description`, `og:image`, `og:url` presentes | [Meta Tags Checker](https://metatags.io/) |
| **JSON-LD** | Schema `Person` y `WebSite` en `index.html` | [Rich Results Test](https://search.google.com/test/rich-results) |
| **Canonical URL** | `<link rel="canonical">` apuntando a producción | Inspección manual |

---

## ✅ Checklist de Validación Completo

### Antes de Marcar una Tarea como Completada

#### Formato y Estructura
- [ ] ¿`npm run lint` pasa sin errores?
- [ ] ¿`npm run build` completa sin errores?
- [ ] ¿Los componentes usan etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)?
- [ ] ¿Hay un único `<h1>` y jerarquía lógica de headings (H1→H2→H3)?
- [ ] ¿`index.html` tiene `lang="es"`?
- [ ] ¿Los estilos usan clases Tailwind y tokens del tema (no inline)?
- [ ] ¿Los componentes son funcionales (no clases)?
- [ ] ¿Los archivos siguen las convenciones de nombres (`PascalCase.jsx`, `use*.js`)?
- [ ] ¿Todo el código técnico está en inglés?

#### Lógica y Tipado
- [ ] ¿Las funciones exportadas en `lib/` tienen JSDoc?
- [ ] ¿La lógica pura está en `lib/`, no en componentes?
- [ ] ¿No se mutan objetos de estado directamente?
- [ ] ¿Se usa desestructuración e inmutabilidad?
- [ ] ¿Los datos de contenido vienen de `lib/portfolioData.js`?

#### Pruebas
- [ ] ¿Las funciones puras de `lib/` tienen tests unitarios? *(cuando exista runner)*
- [ ] ¿La cobertura de `lib/` es del 100%? *(cuando exista runner)*
- [ ] ¿Los tests son independientes del navegador? *(cuando exista runner)*
- [ ] ¿Todos los tests pasan? *(cuando exista runner)*

#### Accesibilidad
- [ ] ¿El contraste de color es mínimo 4.5:1?
- [ ] ¿Los elementos interactivos son accesibles por teclado?
- [ ] ¿Los botones tienen mínimo 44×44px (`min-h-11 min-w-11`)?
- [ ] ¿Los toasts y mensajes dinámicos tienen `aria-live="polite"`?
- [ ] ¿Los elementos decorativos tienen `aria-hidden="true"`?
- [ ] ¿Todas las imágenes tienen `alt` descriptivo?
- [ ] ¿Los botones con solo icono tienen `aria-label`?

#### Rendimiento
- [ ] ¿LCP < 2.5s?
- [ ] ¿CLS < 0.1?
- [ ] ¿Las imágenes tienen `loading="lazy"` y dimensiones (`width`/`height`)?
- [ ] ¿Las imágenes pesan < 200KB?
- [ ] ¿No hay layout shifts al cargar?

#### Seguridad
- [ ] ¿Las credenciales de EmailJS están en variables de entorno?
- [ ] ¿No hay credenciales en el código?
- [ ] ¿No hay rutas locales del desarrollador?
- [ ] ¿El formulario valida datos antes de enviar?
- [ ] ¿No se usa `dangerouslySetInnerHTML`?

#### SEO
- [ ] ¿`index.html` tiene `<title>` y `<meta description>` correctos?
- [ ] ¿Están presentes las etiquetas Open Graph?
- [ ] ¿Hay Twitter Card meta tags?
- [ ] ¿Existe JSON-LD `Person` y `WebSite`?
- [ ] ¿Hay `<link rel="canonical">` apuntando a producción?

#### Arquitectura
- [ ] ¿El código está en la capa correcta (`components/`, `pages/`, `hooks/`, `lib/`)?
- [ ] ¿Se respetan las reglas de dependencia (ver `architecture_principles.md`)?
- [ ] ¿`lib/portfolioData.js` es la fuente de verdad para datos de contenido?

---

## 🛠️ Herramientas de Validación

| Categoría | Herramienta | URL |
|-----------|-------------|-----|
| JavaScript / React | ESLint | https://eslint.org/ |
| JavaScript / React | React DevTools | Chrome / Firefox DevTools |
| Build | Vite | https://vite.dev/ |
| HTML | W3C Validator | https://validator.w3.org/ |
| Accesibilidad | WAVE | https://wave.webaim.org/ |
| Accesibilidad | axe DevTools | https://www.deque.com/axe/ |
| Contraste | WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ |
| Rendimiento | Lighthouse | Chrome DevTools |
| Core Web Vitals | PageSpeed Insights | https://pagespeed.web.dev/ |
| SEO | Meta Tags Checker | https://metatags.io/ |
| SEO | Rich Results Test | https://search.google.com/test/rich-results |

---

## 📚 Referencias

- **Coding Standards Completo:** [`./coding_standards.md`](./coding_standards.md)
- **Architecture Principles:** [`./architecture_principles.md`](./architecture_principles.md)
- **React 19 Docs:** https://react.dev/learn
- **Vite:** https://vite.dev/guide/
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **WCAG 2.1 AA:** https://www.w3.org/WAI/WCAG21/quickref/
- **Core Web Vitals:** https://web.dev/vitals/
- **JSDoc:** https://jsdoc.app/
- **Open Graph Protocol:** https://ogp.me/
- **Schema.org Person:** https://schema.org/Person

---

## Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2024-12-22 | Definición inicial |
| 1.1 | 2024-12-24 | Adaptación para proyecto Vanilla Web y optimización de umbrales para IA |
| 2.0 | 2026-01-04 | • Formato mejorado con emojis y tablas<br>• Ejemplos de código concretos<br>• Checklist expandido y categorizado<br>• Sección de herramientas de validación<br>• Referencias documentadas<br>• Alineación con `architecture_principles.md` y `coding_standards.md` |
| 2.1 | 2026-01-08 | • **Sección HTML ampliada con ejemplos completos**<br>• Añadida validación de "Regla del 30%" (máx 30% divs/spans)<br>• Añadida validación de etiquetas semánticas específicas<br>• Añadida validación de atributo `datetime` en `<time>`<br>• **Referencia cruzada a `coding_standards.md`** para guía completa<br>• Checklist HTML expandido (3→5 validaciones)<br>• HTMLHint añadido a herramientas<br>• Ejemplo de estructura completa (header, main, footer)<br>• Alineación total con `coding_standards.md` v2.2 |
| **3.0** | **2026-09-02** | • Migración de Vanilla JS / Victory Royale Timer a React 19 / Portfolio Personal<br>• Sección 1 adaptada a JSX semántico y Tailwind CSS v4<br>• Nomenclatura actualizada (`PascalCase.jsx`, `use*.js`)<br>• Capas de tests: Lib/Hooks/Components/Pages (criterio aspiracional)<br>• Ejemplos de accesibilidad del Portfolio (ThemeToggle, toasts, aria-hidden)<br>• Rendimiento con Vite y optimización de imágenes de proyectos<br>• Seguridad con EmailJS y variables de entorno<br>• SEO con meta tags reales de `index.html` y JSON-LD<br>• Checklist completo adaptado a React<br>• Herramientas: ESLint, React DevTools, Vite<br>• Alineación con `coding_standards.md` v3.0 y `architecture_principles.md` v3.0 |
| **3.1** | **2026-09-03** | • Ejemplo de imágenes actualizado para usar datos del proyecto sin documentar rutas inexistentes |

---

**Última actualización:** 2026-09-03  
**Responsable:** Roberto Ceñera
