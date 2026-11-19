# PROMPT F0 — CLI-A — Fundación de syntidev-plus

Pegar completo en Claude Code Terminal, abierto en `C:\laragon\www\syntidev-plus`.

---

```
/instinct-status
/software-architecture
/deployment-patterns
/ponytail ultra

ROL: CLI-A — Backend y fundación. Proyecto nuevo: syntidev-plus (synti.dev).

ANTES DE TODO:
1. Lee CLAUDE.md completo.
2. Lee .doc/AGENTS.md, .doc/BRAND_OLA.md y .doc/SYSTEM_MAP.md.
3. Confirma en una línea que leíste los 4 y cuál es el stack sellado.

OBJETIVO DE LA FASE 0: proyecto Astro vacío, bien cimentado, sin una sola sección de negocio todavía.

TAREAS (en orden, una a la vez, reporta al terminar cada una):

T0 — Confirmar carpeta
- Trabajas en C:\laragon\www\syntidev-plus. El nombre del paquete en package.json es "syntidev-plus".

T1 — Scaffold
- La carpeta ya tiene .git, README.md, CLAUDE.md y .doc/. NO borrar ninguno de esos.
- README.md fue creado con `echo >>` de PowerShell y quedó en UTF-16: reescríbelo en UTF-8 con una sola línea "# syntidev-plus".
- `npm create astro@latest` con plantilla "minimal", TypeScript strict, sin instalar dependencias extra, sin inicializar git (ya existe). Si el asistente se niega por carpeta no vacía: genera en `./_scaffold`, mueve su contenido a la raíz y borra `_scaffold`.
- package.json: "name": "syntidev-plus".
- Instalar `@astrojs/node` en modo standalone. `output: 'static'` por defecto; las rutas de servidor se marcarán luego con `export const prerender = false`.
- NO instalar Tailwind, React ni ninguna librería de UI o animación.
- tsconfig: extends "astro/tsconfigs/strict".

T2 — Estructura de carpetas (crear vacías con un .gitkeep si hace falta)
src/
  components/sections/   ← una sección = un componente .astro
  components/ui/         ← piezas pequeñas (botón, etiqueta, ola)
  content/               ← TODO el texto del sitio (JSON o MD)
  layouts/Base.astro
  lib/server/            ← lógica de servidor (F2)
  pages/index.astro
  pages/api/             ← (F2)
  pages/panel/           ← (F3)
  styles/tokens.css      ← tokens de BRAND_OLA.md §3 y §5, copiados exactos
  styles/global.css      ← reset + base tipográfica, solo consume tokens
public/fonts/            ← Source Serif 4, IBM Plex Sans, IBM Plex Mono en woff2 subset latino
prisma/                  ← (F2)

T3 — Tokens y fuentes
- tokens.css con TODOS los tokens de color, curvas y tiempos de BRAND_OLA.md, sin cambiar ningún valor.
- @font-face autoalojadas con font-display: swap. Precargar solo la fuente del título del hero.
- global.css: fondo var(--arena), texto var(--tinta), IBM Plex Sans 17px/1.6. Bloque @media (prefers-reduced-motion: reduce) que anule animaciones y transiciones.

T4 — Contenido separado
- src/content/site.json con la estructura de secciones del SYSTEM_MAP F1 y TODOS los textos como "[PENDIENTE: ...]".
- Prohibido escribir textos de marketing inventados (CLAUDE.md §4).

T5 — Layout base y home vacía
- Base.astro: <html lang="es">, meta viewport, title y description desde site.json, enlace a tokens.css y global.css, View Transitions de Astro activadas.
- index.astro: usa Base y muestra solo el título [PENDIENTE] para verificar fuentes y colores.

T6 — Verificación local
- `npm run build` sin errores ni warnings.
- Reporta: peso total de JS en dist (debe ser 0 KB en la home), peso de la home, lista de archivos creados.
- Captura de pantalla de la home en 1440px y 390px.

NO HAGAS (fuera de alcance de F0):
- Secciones, animaciones, Prisma, endpoints, panel, deploy al VPS (lo hace CLI-A en una tarea aparte cuando Claude Web apruebe T1–T6).

COMMIT (solo cuando Claude Web responda "LISTO F0"):
git add [archivos específicos]
git commit -m "feat(f0): scaffold Astro + tokens Ola + contenido separado

🤖 Agente: CLI-A | Fase: 0 | Fecha: 2026-11-19"

Formato de reporte: el de .doc/AGENTS.md.
✅ Tarea completada | ➡️ Próxima tarea
```
