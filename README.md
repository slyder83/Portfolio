# Portafolio de Roberto Ceñera García

Portafolio web personal donde presento mis proyectos, habilidades y formas de contacto, construido con **React**, **Tailwind CSS v4** y **Vite**.

---

## Características

- Diseño limpio y responsivo con tema oscuro/claro
- Fondo animado (estrellas y meteoros) con respeto a `prefers-reduced-motion`
- Formulario de contacto funcional mediante EmailJS
- Enrutamiento con React Router (incluye página 404)
- Componentes UI reutilizables con patrón shadcn (`Button`, `Toast`)

---

## Tecnologías usadas

- React 19
- Vite 8
- Tailwind CSS v4
- EmailJS
- React Router
- Lucide-react (iconos)
- Radix UI + Class Variance Authority (primitivos de interfaz)
- Prettier y ESLint (calidad de código)

---

## Puesta en marcha

```bash
npm install
npm run dev   # servidor de desarrollo en http://localhost:5173
```

### Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Análisis estático con ESLint |
| `npm run format` | Formatea el código con Prettier |
| `npm run format:check` | Verifica el formato sin modificar |

---

## Estructura del proyecto

```text
src/
├── components/     # Secciones de página y componentes reutilizables
│   └── ui/         # Primitivos de interfaz (Button, Toast...)
├── config/         # Configuración del sitio (site.js)
├── data/           # Datos estáticos (proyectos, skills, navegación)
├── hooks/          # Custom hooks de React
├── lib/            # Utilidades (cn)
├── pages/          # Vistas (Home, NotFound)
├── App.jsx         # Enrutamiento principal
├── index.css       # Estilos globales y variables Tailwind
└── main.jsx        # Punto de entrada de React
```

## Configuración

El nombre, correo y URLs del sitio están centralizados en `src/config/site.js`. Los proyectos, habilidades y elementos de navegación se mantienen como datos estáticos en `src/data/`.

---

## Contacto

Puedes enviarme un mensaje a través del formulario de contacto del portafolio o directamente al correo electrónico: `rcenegar@gmail.com`.

---

## Inspiración

Este portafolio fue desarrollado siguiendo la inspiración y algunas ideas del tutorial de YouTube:  
https://www.youtube.com/watch?v=ifOJ0R5UQOc  
(donde se explica cómo crear un portafolio moderno con React y Tailwind CSS).

---

¡Gracias por visitar mi portafolio!  
— Roberto Ceñera García