# CLAUDE.md — syntidev-plus (synti.dev)
# Instrucciones maestras para Claude Code y todos los agentes
# ⚠️ LEER COMPLETO ANTES DE CUALQUIER ACCIÓN
# Versión: 1.0 | Noviembre 2026 | Carlos Bolívar — SYNTIdev
# Precedencia absoluta sobre skills, plugins y reglas ECC.

---

## 🚦 GOBERNANZA — LEER PRIMERO, SIEMPRE

### Modos de operación

| MODO      | Palabra clave | Qué hacer                          | PROHIBIDO                              |
|-----------|---------------|------------------------------------|----------------------------------------|
| CONSULTA  | [CONSULTA]    | Responder en ≤5 líneas, sin código | Abrir archivos, escribir código        |
| DISEÑO    | [DISEÑO]      | Proponer arquitectura o diseño     | Implementar, tocar archivos            |
| EJECUCIÓN | [EJECUTA]     | Implementar lo acordado            | Inferir cambios fuera del scope        |
| REVISIÓN  | [REVISA]      | Auditar código existente           | Proponer refactors no solicitados      |
| DEBUG     | [DEBUG]       | Diagnosticar SOLO el error         | Tocar código fuera del scope           |

**Si el modo no está declarado → preguntar "¿Modo CONSULTA, DISEÑO o EJECUCIÓN?" y PARAR.**
**NUNCA asumir EJECUCIÓN por defecto.**

### Protocolo anti-deriva (irrompible)

Antes de CADA respuesta:
1. ¿Me pidieron código? → Solo entonces escribo código.
2. ¿El scope es claro y acotado? → Si no, preguntar en UNA línea y parar.
3. ¿Voy a modificar algo fuera de lo pedido? → PARAR.
4. ¿Encontré un bug fuera del scope? → Reportar en 1 línea, NO corregir.
5. ¿Mis criterios de éxito los puede verificar Carlos sin leer código? → Si no, reescribirlos.

**Límites duros:** nunca abrir archivos adicionales sin permiso · nunca "ya que estaba, también arreglé…" · nunca continuar después de completar el pedido · máximo 1 archivo por request salvo instrucción explícita.

Cada respuesta termina con: `✅ Tarea completada | ➡️ Próxima tarea`. Si se necesita decisión de Carlos: UNA pregunta sí/no.

---

## 🧠 PRINCIPIOS KARPATHY — IRROMPIBLES

**1. Pensar antes de codificar.** Declarar supuestos. Si hay varias interpretaciones, presentarlas; no elegir en silencio. Si algo no está claro → DETENER y preguntar.

**2. Simplicidad primero.** Código mínimo. Sin features no pedidas, sin abstracciones de un solo uso, sin "configurabilidad" no solicitada. Si son 200 líneas y podrían ser 50 → reescribir.

**3. Cambios quirúrgicos.** No "mejorar" código adyacente. Coincidir con el estilo existente. Código muerto ajeno → mencionarlo en 1 línea, no borrarlo. Cada línea modificada debe trazar al pedido.

**4. Ejecución orientada a objetivos.** Criterios verificables antes de escribir código:
- "Que cargue rápido" → "Lighthouse móvil Slow 4G: LCP ≤ 2.5 s, captura del reporte"
- "Guardar el contacto" → "`POST /api/lead` válido → fila en `leads` visible con `SELECT`; inválido → `422` con `issues`"
- "Animación de la ola" → "Con `prefers-reduced-motion: reduce` la ola está quieta y el contenido visible al cargar"

Planes de varios pasos: `1. [qué] → verifico con: [check]`.

**5. Cero fachadas.** Prohibido: botones sin acción, endpoints con datos falsos, valores hardcodeados presentados como reales, `console.error` silenciados. Lo incompleto se DECLARA antes del commit.

---

## 🏗️ PROYECTO

**synti.dev** — sitio de marca de SYNTIdev (solucionador de sistemas para negocios) + panel privado "la esponja" que registra visitas, eventos, clics a WhatsApp y contactos.

| | |
|---|---|
| Local | `C:\laragon\www\syntidev-plus\` |
| Repo | `github.com/syntidev/syntidev-plus` · rama `main` |
| VPS | `187.124.241.213` · `/var/www/syntidev` · PM2 `syntidev` |
| Puerto | **3005**, escuchando SOLO en `127.0.0.1` (`HOST=127.0.0.1`). Nginx es la única puerta de entrada. |
| Producción | `synti.dev` + `www` desde este VPS (desde 2026-11-19) |
| Staging | `nuevo.synti.dev` (mismo proceso, `noindex`) |
| Sitio anterior | `syntidev-astro` en Hostinger: solo respaldo de rollback, no se toca |

### Documentación (leer en este orden)
```
1. CLAUDE.md               → gobernanza y reglas
2. .doc/SYSTEM_MAP.md      → estado real y fases (árbitro del avance)
3. .doc/AGENTS.md          → protocolo multi-agente y skills
4. .doc/BRAND_OLA.md       → identidad, tokens, movimiento, tono
5. DESIGN.md               → resumen de identidad para herramientas de diseño (Hallmark, Stitch)
```
**Si no leíste estos 4 archivos, cualquier acción es potencialmente destructiva.**

---

## 🔧 STACK SELLADO — NO NEGOCIABLE

```
Astro 7.x            → Framework. Público prerenderizado (HTML puro, 0 KB JS por defecto)
@astrojs/node        → Modo standalone, solo para /api/* y /panel/*  (prerender = false)
TypeScript 5.x       → strict, nunca `any`, interfaces en src/types/
CSS + tokens         → src/styles/tokens.css + <style> con scope de Astro. Sin Tailwind.
Prisma 7.x + MySQL 8 → instancia del VPS (es MySQL 8.0, no MariaDB). DB propia: syntidev · usuario propio: syntidev_app
Zod 4.x              → validación en endpoints (.issues, NO .errors)
argon2               → hash de la contraseña del panel
jose                 → sesión del panel, HS256 fail-closed (sin secretos de respaldo)
Gráficos del panel   → librería liviana SOLO dentro de /panel
```

**PROHIBIDO:** Laravel, PHP, React o cualquier framework de UI en el sitio público, Tailwind, Bootstrap, jQuery, GSAP completo, Three.js, Lottie, Google Analytics, píxeles de terceros, emojis en la UI.

---

## 🚨 REGLAS CRÍTICAS

### 1. VERDAD DEL CONTENIDO (la más importante del sitio)
El sitio vende confianza. Un dato falso destruye más que cualquier bug.
- **Todo texto vive en `src/content/`**, nunca escrito dentro de un componente.
- **Prohibido inventar:** cifras, porcentajes, métricas (MTTR, uptime, latencia), ciudades, nombres de clientes, certificaciones (ISO, PCI, SOC), credenciales, coordenadas, testimonios, "registros técnicos", estándares (ISO 8583…).
- **Prohibido prometer lo no construido:** "funciona sin internet", "offline-first", "imprime sin conexión", "24/7".
- Lo que falte se escribe literal `[PENDIENTE: descripción]` y se VE en pantalla hasta que Carlos lo apruebe.
- **Sitio global:** ninguna ciudad en hero ni secciones. Dirección solo en el pie, con texto aprobado por Carlos.
- Casos por **sector + región amplia** ("Llanos venezolanos", "México"). Nombre de cliente solo con permiso escrito.
- Si un agente duda de un dato: **no lo escribe**, deja `[PENDIENTE]` y pregunta.

### 2. TypeScript
`strict: true` · cero `any` · tipos explícitos en props, returns y parámetros · Zod 4 en todo endpoint.

### 3. CSS y diseño
- Valores visuales SOLO desde `src/styles/tokens.css`. **Ningún hex, rgba ni px suelto en componentes.** Si el token no existe → crearlo primero, luego consumirlo. Nunca duplicar valores.
- `<style>` con scope de Astro por componente. Sin estilos inline.
- Leer `.doc/BRAND_OLA.md` completo antes de tocar cualquier estilo o animación.
- Touch targets ≥ 44px. Sin scroll horizontal en 390px.

### 4. Movimiento
- Lento, continuo, orgánico (ola, no rebote). Solo `transform`, `opacity` y `stroke-dashoffset`.
- CSS primero (scroll-driven animations, View Transitions). JS solo si CSS no alcanza.
- **Siempre** `prefers-reduced-motion: reduce` → sin animación y sin perder contenido.

### 5. Presupuesto de rendimiento (criterio de aceptación)
| Métrica | Límite |
|---|---|
| JS total del sitio público | ≤ 25 KB comprimido |
| LCP Lighthouse móvil (Slow 4G) | ≤ 2.5 s |
| CLS | ≤ 0.05 |
| Peso de la home | ≤ 600 KB con imágenes |
| Fuentes | autoalojadas, woff2, subset latino, `font-display: swap` |
| Imágenes | AVIF/WebP con `<Picture>`, dimensiones explícitas |

Si una animación rompe el presupuesto, cae la animación, no el presupuesto.

### 6. Privacidad de "la esponja"
- Solo registro propio de lo que el visitante hace en el sitio. **Sin fingerprinting, sin leer sesiones de terceros, sin píxeles.**
- IP solo como hash con sal + país/ciudad aproximados. Bots filtrados antes de guardar.
- Nombre/correo solo si el visitante lo escribe o elige "Continuar con Google".
- Formulario con consentimiento + enlace a política de privacidad.

### 7. Seguridad
- Sesión del panel: jose HS256 fail-closed, cookie `httpOnly` + `secure` + `sameSite=lax`.
- Rate limiting en `/api/lead`, `/api/e` y login del panel.
- Todo dato del cliente validado con Zod; texto a Prisma siempre como parámetro.
- Ningún borrado en el panel sin modal de confirmación.

### 8. Base de datos
- **Desde el día 1: migraciones versionadas** (`prisma migrate dev` en local → `prisma migrate deploy` en VPS). **Prohibido `db push` en el VPS** (lección de ActivoPOS: deja drift y bloquea migraciones futuras).

---

## 🤖 PROTOCOLO MULTI-AGENTE

```
CLI-A → Backend: Prisma, /api/*, sesión, deploy           carpeta: syntidev-plus
CLI-B → Frontend público: secciones, tokens, movimiento   carpeta: syntidev-plus-b
CLI-C → Calidad: auditoría, seguridad, rendimiento        carpeta: syntidev-plus-c   (SOLO reporta, corrige P0)
CLI-D → Panel /panel + Playwright E2E                     carpeta: syntidev-plus-d
```
Scope exclusivo: CLI-B no toca APIs; CLI-A no toca CSS ni componentes. Scope declarado al inicio de cada prompt: `# CLI-X — [SCOPE]`. Skills obligatorias por CLI: ver `.doc/AGENTS.md`.

### Graphify — obligatorio antes de tocar cualquier archivo (desde F1)
```
graphify query "[qué conecta X con Y]"
graphify explain "[componente clave]"
graphify path "[origen]" "[destino]"
graphify update .        ← al finalizar, post-commit
```

### Al iniciar cada sesión CLI
```
/instinct-status
/emil-design-eng          ← CLI-B y CLI-D
```

---

## 🗂️ ESTRUCTURA

```
src/
├── components/
│   ├── sections/      ← una sección = un componente .astro
│   └── ui/            ← botón, etiqueta, ola, trazo
├── content/           ← TODO el texto del sitio
├── layouts/Base.astro
├── lib/server/        ← prisma.ts, session.ts, rate-limit.ts, track.ts
├── pages/
│   ├── index.astro
│   ├── api/           ← lead.ts, e.ts (prerender = false)
│   ├── go/wa.ts       ← registra clic y redirige a WhatsApp
│   └── panel/         ← privado (prerender = false)
├── scripts/           ← JS mínimo del público (medición, movimientos que CSS no cubre)
├── styles/tokens.css · global.css
└── types/
prisma/schema.prisma · prisma/migrations/
public/fonts/ · public/img/
tests/                 ← Playwright
```

---

## 🚀 COMANDOS

```powershell
# Local
npm run dev
# Verificación antes de commit — ambos en verde
npx astro check          # 0 errores
npm run build            # sin errores ni warnings
```

```bash
# Deploy VPS (patrón ActivoPOS con lock para el healthcheck)
cd /var/www/syntidev
git fetch origin && git merge origin/main --no-ff
npm ci
npx prisma generate
npx prisma migrate deploy
touch /var/lock/syntidev-deploy.lock
pm2 stop syntidev
npm run build
pm2 restart syntidev --update-env && pm2 save
rm -f /var/lock/syntidev-deploy.lock     # SIEMPRE, también si el build falló
```
NUNCA `git stash` en el VPS. Verificar SIEMPRE `.env` y `.env.production` del VPS al diagnosticar variables.

---

## ⛔ LO QUE NUNCA SE TOCA

- `C:\laragon\www\synticorex\`, `syntimeat\`, `activopos\` — producción activa de otros proyectos
- `C:\laragon\www\syntidev-astro\` — sitio anterior (respaldo), solo lectura
- `src/content/` — solo por instrucción explícita de Carlos
- `git stash` en el VPS

---

## 🎯 DEFINITION OF DONE

- El reporte del CLI abre con `git rev-parse --short HEAD` y `origin/main`.
- Una función no está terminada hasta estar cableada en todas sus capas: DB → API → UI → panel. Si falta una, se declara.
- Entrega visual = **captura real** en 1440px y 390px. Un reporte de texto no cierra nada.
- CLI-B reporta siempre: JS total (KB) y peso de la home (KB).

## ✅ CHECKLIST PRE-COMMIT (si uno falla, no se commitea)

- [ ] `npx astro check` → 0 errores
- [ ] `npm run build` → limpio
- [ ] Cero Tailwind, cero inline styles, cero hex/rgba/px fuera de tokens.css
- [ ] Cero textos escritos dentro de componentes (todo en `src/content/`)
- [ ] Cero datos inventados (regla crítica 1)
- [ ] Presupuesto de rendimiento cumplido (CLI-B)
- [ ] `prefers-reduced-motion` verificado (CLI-B)
- [ ] Cero fachadas
- [ ] Bloque de commit completo

## 📋 BLOQUE DE COMMIT ESTÁNDAR

```bash
git add [archivos específicos — NUNCA git add .]
git commit -m "tipo(scope): descripción concisa

- Modificado: [archivo] → [qué cambió]
- Creado: [archivo] → [propósito]
- Verificado: [qué check lo confirma]
- Pendiente: [si aplica]

🤖 Agente: CLI-X | Fase: N | Fecha: YYYY-MM-DD"
git push origin main
git log --oneline -3
```

---

## 🧩 SKILLS DE DISEÑO — PERMITIDAS Y VETADAS

Las skills están instaladas de forma global. **No se copian al repo** (duplicarlas crea dos versiones con el mismo nombre). Este listado decide cuáles aplican aquí. Toda skill queda subordinada a `.doc/BRAND_OLA.md`: si una skill dice otra cosa sobre fuentes, colores o movimiento, gana BRAND_OLA.

**Permitidas:**
| Skill | Para qué en este proyecto |
|---|---|
| impeccable (craft, animate, typeset, layout, polish, quieter, adapt, critique, audit) | Base de calidad visual y de movimiento (CLI-B) |
| emil-design-eng | Detalle y sensación del movimiento (CLI-B) |
| design-taste-frontend (v2) | Criterio anti-plantilla en landing (CLI-B) |
| high-end-visual-design | Solo espaciado y estructura; sus fuentes y colores NO aplican |
| redesign-existing-projects | Auditoría de patrones genéricos en F4 (CLI-C) |
| stitch-design-taste | Generar el DESIGN.md para mockups en Stitch |
| ui-ux-pro-max | Consulta de patrones UX |
| hallmark | Auditoría anti-plantilla (`sloplint`) y rediseño de layout, SOLO con las reglas de la sección "Hallmark en este proyecto" |

### Hallmark en este proyecto (reglas obligatorias)
1. **Primero auditar, después rediseñar.** `/hallmark audit` sobre `dist/client/index.html`. Ningún rediseño sin que Carlos apruebe los hallazgos.
2. **Identidad sellada:** NO usar ninguno de los 50 temas de Hallmark. Siempre modo **custom** leyendo `DESIGN.md` y `src/styles/tokens.css`. Colores, fuentes, isotipo y movimiento no se cambian.
3. **Fotos:** PROHIBIDAS las fotos de Wikimedia Commons. Solo fotos reales aportadas por Carlos. Si falta una foto, se deja el espacio `[PENDIENTE: foto]`.
4. **Arquitectura:** el resultado sigue siendo componentes `.astro` en `src/components/`, con TODO el texto en `src/content/site.json`. Prohibido convertir la página en un HTML suelto o escribir textos dentro de componentes.
5. **Rediseño seguro:** correr `sloplint --before` antes y `sloplint --kept` después. Si se pierde un enlace, botón o sección, el rediseño no se acepta.
6. **Presupuesto:** sigue vigente (≤ 25 KB JS, LCP ≤ 2.5 s). Si Hallmark propone algo que lo rompe, se descarta.
7. **Gates de Hallmark:** el Floor (contraste, foco, movimiento reducido, datos inventados, móvil) es obligatorio. Los "Reflex gates" solo se omiten con la razón escrita en el reporte.

**Vetadas (no invocar):**
| Skill | Por qué |
|---|---|
| gpt-taste | Exige GSAP y layouts aleatorios: rompe el stack y el presupuesto de JS |
| full-output-enforcement | Prohíbe placeholders: choca con la regla `[PENDIENTE]` de verdad del contenido |
| industrial-brutalist-ui | Estética de terminal militar: lo contrario de BRAND_OLA |
| minimalist-ui | Pide plano y monocromo: Carlos pidió explícitamente no tan plano |
| design-taste-frontend-v1 | Versión vieja de una skill permitida |
| image-to-code, imagegen-frontend-web, imagegen-frontend-mobile, brandkit | Generan imágenes de referencia o identidad: la identidad ya está sellada y las fotos deben ser reales |

---

## ⚡ ECC
ECC global en `~/.claude/`. Subagentes vía Task tool: `typescript-reviewer`, `security-reviewer`, `code-reviewer` (CLI-C), `e2e-runner` (CLI-D). En conflicto, **este CLAUDE.md gana**. Máximo 10 MCPs activos por sesión.
