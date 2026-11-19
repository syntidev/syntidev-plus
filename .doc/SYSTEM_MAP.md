# SYSTEM_MAP.md — syntidev-plus
# Árbitro único del estado real. Se actualiza al cerrar cada fase.
# Última actualización: 2026-11-19 (tarde) · Fase actual: F1 en producción

---

## Estado

- Repo: `github.com/syntidev/syntidev-plus` · rama `main` · commit inicial 7104015 (solo README)
- Local: `C:\laragon\www\syntidev-plus` — creada, git inicializado
- **synti.dev EN PRODUCCIÓN desde el VPS (2026-11-19):** PM2 `syntidev` en 127.0.0.1:3005, Nginx vhost `synti.dev` + `www`, Let's Encrypt (vence 2027-02-17, renovación automática). Cloudflare en DNS only.
- Staging: `nuevo.synti.dev` (mismo proceso, Nginx con X-Robots-Tag noindex).
- Sitio viejo: sigue en Hostinger (82.198.236.90) como respaldo. Rollback = devolver el A de synti.dev en Cloudflare a esa IP. Borrar solo tras unos días estable.
- Deploy: `/var/www/syntidev/deploy.sh` (pendiente de su primera ejecución real).
- Puerto VPS: **3005** (libre, verificado 2026-11-19), solo 127.0.0.1
- Staging: `nuevo.synti.dev` → VPS
- DB: MySQL 8.0 del VPS (no MariaDB) · base `syntidev` · usuario `syntidev_app`
- F0 local: certificada y aprobada ("LISTO F0") · pendiente: deploy esqueleto en staging

## Regla del Policía

```
F0 Fundación (scaffold + tokens + deploy esqueleto)   ✅ certificada
F1 Sitio público (secciones + movimiento)             🟢 en producción · pendiente aprobación visual final
F2 La esponja (registro de visitas, eventos, leads)   🔒
F3 Panel privado (/panel)                              🔒
F4 Calidad + corte de DNS desde Hostinger             🔒
```

## Fases

### F0 — Fundación
Astro 7 + node adapter + TS strict + tokens.css + fuentes autoalojadas + estructura de carpetas + `src/content/` con textos `[PENDIENTE]` + página vacía con layout base + deploy esqueleto en VPS.
**Cierra cuando:** `npm run build` limpio, la home vacía responde en el VPS con SSL, 0 KB de JS en el público.

### F1 — Sitio público
Secciones como componentes `.astro`: Header · Hero (horizonte) · Quién está detrás (firma + oficios) · Cómo trabajamos (pasos + formas) · Cuaderno de campo (entradas de casos) · Piezas probadas · Principio + acción social · Contacto · Footer. Los 7 movimientos firma de BRAND_OLA.
**Cierra cuando:** captura 1440px y 390px aprobadas por Carlos, presupuesto de rendimiento cumplido, `prefers-reduced-motion` verificado.

### F2 — La esponja
Prisma: `Visit`, `Event`, `Lead`, `WaClick`. Endpoints: `POST /api/e` (eventos con `sendBeacon`), `POST /api/lead`, `GET /go/wa` (registra y redirige a WhatsApp con código). Filtro de bots, IP con hash, consentimiento. Aviso de lead nuevo por n8n.
**Cierra cuando:** un lead real de prueba aparece en la base con su fuente, y el aviso llega.

### F3 — Panel
`/panel` con login de un usuario (sesión en cookie firmada, contraseña con argon2). Embudo de leads (nuevo → contactado → visita → propuesta → cliente / descartado), tablero de visitas y fuentes, detalle de cada lead con su recorrido.
**Cierra cuando:** Carlos opera un lead real de principio a fin sin abrir el correo.

### F4 — Calidad y lanzamiento
Auditoría CLI-C, Playwright completo, Lighthouse, SEO (sitemap, OG, schema Organization), política de privacidad, corte de DNS de Hostinger al VPS.

## Pendientes operativos

- Reactivar proxy de Cloudflare con SSL Full (strict)
- Primera ejecución real de deploy.sh
- finca.synti.dev (HTML estático) sigue en Hostinger vía comodín: migrar al VPS antes de dar de baja Hostinger
- Certificados vencidos ajenos en el VPS (lleva.app-0001, ordena.menu, socialia, syntiweb.com-0001)
- F2: la esponja debe leer la IP real desde CF-Connecting-IP cuando el proxy esté activo

## Decisiones abiertas (Carlos)

1. Texto definitivo de la cita firmada
2. Dirección del pie de página
3. Fotos reales para hero y casos
4. Qué casos entran al "cuaderno de campo" y si alguno puede ir con nombre (permiso escrito)
