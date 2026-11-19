# AGENTS.md — protocolo multi-agente syntidev-plus

## Flujo único

```
Carlos trae la tarea
   ↓
Claude Web diseña, decide y genera el prompt del CLI
   ↓
Carlos pega el prompt en el CLI correspondiente
   ↓
El CLI lee CLAUDE.md + SYSTEM_MAP.md → ejecuta → reporta con captura
   ↓
Claude Web revisa → "LISTO" o corrección
   ↓
Commit + push → deploy → SYSTEM_MAP.md actualizado
```

## Mapa fijo: un agente = una carpeta (git worktree)

| Agente | Carpeta | Rol | Toca |
|---|---|---|---|
| **CLI-A** | `syntidev-plus` | Backend: Prisma, `/api/*`, sesión del panel, deploy | `src/pages/api/`, `src/lib/server/`, `prisma/` |
| **CLI-B** | `syntidev-plus-b` | Frontend público: secciones, tokens, movimiento | `src/components/`, `src/styles/`, `src/layouts/`, `src/pages/index.astro` |
| **CLI-C** | `syntidev-plus-c` | Calidad: auditoría, seguridad, rendimiento. **Solo reporta; corrige únicamente P0** | Lectura; P0 con autorización |
| **CLI-D** | `syntidev-plus-d` | Panel `/panel` + pruebas E2E con Playwright | `src/pages/panel/`, `tests/` |

Ningún agente toca carpetas de otro. `src/content/` (textos) solo se modifica por instrucción explícita de Carlos.

## Al iniciar cada sesión (todos)

```
/instinct-status
Leer CLAUDE.md completo
Leer .doc/SYSTEM_MAP.md
Leer .doc/BRAND_OLA.md (CLI-B y CLI-D obligatorio)
```

## Skills obligatorias por agente (prompt sin estas = inválido)

| Agente | Skills |
|---|---|
| CLI-A | `/instinct-status` `/code-review` `/security-review` `/api-design` `/software-architecture` `/database-migrations` `/deployment-patterns` `/ponytail ultra` |
| CLI-B | `/instinct-status` `/emil-design-eng` `/impeccable craft` `/frontend-design` `/animate` `/typeset` `/ui-ux-pro-max` `/coding-standards` `/ponytail ultra` |
| CLI-C | `/instinct-status` `/code-review` `/security-review` `/web-quality-audit` `/core-web-vitals` `/accessibility` → agentes `typescript-reviewer`, `security-reviewer` |
| CLI-D | `/instinct-status` `/e2e-testing` `/impeccable craft` `/frontend-design` → agente `e2e-runner` |

## Regla del Policía — certificación por fase

Ninguna fase arranca sin que la anterior esté certificada. Criterio de certificación:

1. Funciona con datos reales (no mocks) donde aplique
2. Flujo completo probado en navegador real
3. Base de datos verificada con query (fases con datos)
4. Playwright en verde
5. Auditoría CLI-C sin P0 ni P1 abiertos
6. Presupuesto de rendimiento cumplido (CLAUDE.md §5)
7. **Aprobación visual de Carlos con captura de pantalla real**

"Se ve bien" o "funciona" sin evidencia = **no certificado**.

## Formato de reporte de cada CLI

```
TAREA: [nombre]
ARCHIVOS: [rutas exactas creadas/modificadas]
VERIFICACIÓN: [comando + salida real]
CAPTURA: [ruta del screenshot 1440px y 390px]
PESO: [JS total KB · peso página KB] (CLI-B)
PENDIENTES: [lo que no se hizo y por qué]
✅ Tarea completada | ➡️ Próxima tarea
```
