# BRAND_OLA.md — Identidad de SYNTIdev
# Reemplaza a "Cyber Infra Dark" (abril 2026). Esa guía queda retirada.

---

## 1. La esencia: "en la ola"

SYNTIdev no es una consultora de corbata ni una startup de pantalla negra.
Es alguien que **está en el agua**: va a donde está el problema, lee el movimiento del negocio y lo surfea con calma y oficio.

| Es | No es |
|---|---|
| Calma con dominio: sabe lo que hace | Prisa, urgencia falsa, "¡OFERTA!" |
| Cálido, cercano, de buena vibra | Frío, corporativo, impersonal |
| Oficio: detrás hay 25+ años | Hype de IA, "revolucionario", "disruptivo" |
| Diverso: carnicería, helados, bicis, flota | Encasillado en un sector |
| Honesto: dice lo que no sabe | Cifras infladas, promesas imposibles |

**La sensación que debe dejar:** *"Este tipo está en la ola. Es él. Vamos con él."*

### Arquetipo
**El ingeniero que surfea.** Mezcla de *Sabio* (oficio, criterio) y *Explorador* (va a donde está el problema). Nunca *Mago* (no promete milagros).

---

## 2. Logo

Se conserva el sistema de doble corchete `[[ ]]` (padre) → corchete simple `[ ]` (producto).
Archivos: `syntidev-logo-positive.svg` (sobre arena) y `syntidev-logo-negative.svg` (sobre mar noche).
**Pendiente:** recolorear los SVG a los tokens nuevos.

---

## 3. Color — "Caribe al mediodía"

```css
/* src/styles/tokens.css */
--arena:        #F6F1E7;  /* fondo principal */
--arena-2:      #ECE4D4;  /* superficies secundarias */
--espuma:       #FBF8F2;  /* superficies elevadas, tarjetas */
--tinta:        #14212B;  /* texto principal */
--grafito:      #55606A;  /* texto secundario */
--linea:        #DCD3C1;  /* trazos de 1px */
--caribe:       #0B5D7A;  /* color de marca */
--caribe-claro: #2E8BA8;  /* hovers, estados */
--mar-noche:    #0E2F3D;  /* bandas oscuras (caso, contacto, pie) */
--coral:        #C9442A;  /* SOLO acciones principales */
--coral-hondo:  #A93720;  /* hover del coral */
--sol:          #E9B44C;  /* destello mínimo: 1 detalle por pantalla como máximo */
```

Reglas:
- **Coral solo en botones de acción.** Si aparece en otro lado, pierde el efecto de "aquí haz clic".
- **Sol** es el guiño de buena vibra: un subrayado, un punto, un brillo de la ola. Nunca fondo, nunca texto largo.
- Contrastes verificados: tinta/arena, caribe/arena, blanco/coral y arena/mar-noche cumplen WCAG AA.

---

## 4. Tipografía

| Uso | Fuente | Detalle |
|---|---|---|
| Títulos | **Source Serif 4** semibold | Editorial, con autoridad. Óptico grande en hero. |
| Texto | **IBM Plex Sans** 17px / 1.6 | Legible, técnico sin ser frío |
| Etiquetas, años, estados | **IBM Plex Mono** 12px, mayúsculas, +0.08em | El "cuaderno de campo" |
| Citas de clientes | **Source Serif 4 itálica** | La voz del dueño del negocio |

Autoalojadas en `public/fonts/`, woff2, subset latino.
**Prohibido:** Inter, Poppins, Space Grotesk, Montserrat (se ven a plantilla).

---

## 5. Movimiento — "la ola"

### Principio
Todo se mueve como el agua: **continuo, sin rebote, sin prisa**. El movimiento acompaña la lectura, nunca compite con ella.

### Curvas y tiempos (tokens)
```css
--ola-suave:   cubic-bezier(.22, .61, .36, 1);   /* entradas */
--ola-marea:   cubic-bezier(.45, .05, .25, 1);   /* cambios de estado */
--t-rapido:    240ms;   /* hovers */
--t-medio:     600ms;   /* entradas de elementos */
--t-lento:     900ms;   /* revelados grandes */
--t-marea:     24s;     /* ciclos ambientales (olas del hero) */
```

### Los 7 movimientos firma
1. **El horizonte (hero):** 3 líneas de ola en SVG, finas (1–1.5px), en caribe y sol con opacidad baja, desplazándose en bucle de 24–40 s a velocidades distintas. Se siente el mar sin que distraiga.
2. **El oleaje del título:** las líneas del titular entran de abajo con desfase de 80 ms, como una ola que llega. Una sola vez, al cargar.
3. **El trazo que te lleva:** una línea continua (SVG) recorre el margen izquierdo de la página y **se dibuja con el scroll** (`stroke-dashoffset` + `animation-timeline: scroll()`), pasando por los números de sección. Es el hilo de la historia.
4. **Marea al aparecer:** cada bloque entra con `opacity 0→1` y `translateY 16px→0` cuando cruza el viewport (`animation-timeline: view()`). Solo una vez.
5. **El cuaderno de campo:** las entradas de casos tienen un balanceo mínimo (rotación ±0.4°, desplazamiento 2–3px) al pasar el cursor, como papel flotando. Nunca en móvil.
6. **El botón que crece como ola:** al pasar el cursor, el botón coral sube 2px y aparece debajo un subrayado ondulado en sol que se desliza.
7. **Transición entre páginas:** View Transitions de Astro con fundido cruzado de 300 ms.

### Prohibido
Rebotes (`bounce`, `elastic`), parallax agresivo, partículas, cursores personalizados, texto que se escribe solo, contadores que suben, carruseles automáticos, cualquier cosa que tarde más en animarse que en leerse.

### Accesibilidad
Con `prefers-reduced-motion: reduce`: olas quietas, contenido visible de inmediato, trazo ya dibujado.

---

## 6. Textura (para que no sea plano)

- **Grano de papel:** ruido SVG al 3–4% de opacidad sobre la arena. Da calidez de papel sin pesar (< 2 KB).
- **Trazos de 1px** como estructura (no cajas con sombra).
- **Una sombra única** para elementos elevados: `0 1px 0 var(--linea), 0 12px 32px -16px rgba(14,47,61,.18)`.
- **Esquinas:** 2px en cajas, 999px solo en etiquetas de estado.
- **Fotografía real** (Carlos en negocios, pantallas en mostradores) con un tratamiento cálido leve. Nunca stock, nunca ilustración de IA.

---

## 7. Tono de voz

- Tuteo venezolano, cálido y directo. Nunca voseo.
- Frases cortas. Verbos de acción: *vamos, resolvemos, entendemos*.
- Habla de **negocios**, no de tecnología: margen, caja, inventario, cobranza, clientes.
- Humor ligero permitido, nunca a costa del cliente.
- La marca habla en plural (*SYNTIdev*). Carlos habla en primera persona solo en su cita firmada.

### Palabras que sí
oficio · criterio · a tu medida · funcionando · tus números · vamos · en la calle · de verdad

### Palabras que no
revolucionario · disruptivo · de clase mundial · soluciones integrales · sinergia · potenciar · el futuro es hoy · IA de última generación
