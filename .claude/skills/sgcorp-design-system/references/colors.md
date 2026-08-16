# Paleta SGCORP — Referencia completa

Todos los colores oficiales con su uso recomendado. **No usar colores fuera de esta paleta** sin justificación.

## Backgrounds

| Variable | Hex | RGB | Uso |
|---|---|---|---|
| `--color-bg-base` | `#070607` | `7,6,7` | Fondo del juego (la tablet va encima). Casi negro neutro. |
| `--color-bg-soft` | `#130618` | `19,6,24` | Fondo con tinte morado para áreas grandes. |
| `--color-bg-panel-1` | `#1A1020` | `26,16,32` | Paneles primarios (cards, modales). |
| `--color-bg-panel-2` | `#24122D` | `36,18,45` | Filas dentro de paneles, hover sutil. |

## Morados (graduación oscuro → claro)

| Variable | Hex | Uso |
|---|---|---|
| `--color-purple-dark` | `#5C1E65` | Bordes oscuros, acentos discretos. |
| `--color-purple-main` | `#7B218A` | **Color principal de acción**. Botones, gradients. |
| `--color-purple-mid` | `#962BA7` | Estados hover de elementos morados. |
| `--color-purple-light` | `#B034C5` | Gradient con purple-main para botones (gradient 135°). |
| `--color-purple-neon` | `#A52CDF` | Acento neón para llamar la atención (badges, glow). |

## Lilas

| Variable | Hex | Uso |
|---|---|---|
| `--color-lilac` | `#CE69F7` | **Acento principal**. Bordes 1px de paneles, kickers, links. |
| `--color-lilac-soft` | `#DA9FF1` | Texto secundario en avatares, labels suaves. |

## Texto

| Variable | Hex | Uso |
|---|---|---|
| `--color-text-primary` | `#FCFCFC` | Texto principal, títulos. |
| `--color-text-soft` | `#CFCFCF` | Texto de body normal. |
| `--color-text-muted` | `#949494` | Texto secundario, metadata. |

**Nivelación con opacidad** (uso preferente sobre crear nuevos colores):
- `rgba(255,255,255,.85)` — body claro
- `rgba(255,255,255,.65)` — body normal
- `rgba(255,255,255,.45)` — muted
- `rgba(255,255,255,.32)` — disabled / decoraciones

## Estados semánticos

| Variable | Hex | Uso |
|---|---|---|
| `--color-success` | `#38d996` | Verde para "Activo", "Servicio", "Pagado". |
| `--color-danger` | `#ff4d6d` | Rojo para "Cerrado", "Error", "Despedir". |
| `--color-warning` | `#f7c948` | Ámbar para "Revisar", "Pendiente". |

## Severidades de sanción (warns)

Únicos colores aprobados para clases `.sev-leve`, `.sev-media`, `.sev-grave`:

| Severidad | Hex texto | Background | Border |
|---|---|---|---|
| Leve | `#FFCB8A` | `rgba(255,170,80,.20)` | `rgba(255,170,80,.40)` |
| Media | `#FFB088` | `rgba(255,120,80,.25)` | `rgba(255,120,80,.45)` |
| Grave | `#F5B5BE` | `rgba(212,83,109,.22)` | `rgba(212,83,109,.50)` |

## Bordes lila

Solo 4 variantes oficiales según jerarquía:
- `rgba(206,105,247,.10)` — paneles internos, separadores sutiles.
- `rgba(206,105,247,.18)` — borde de la tablet container.
- `rgba(206,105,247,.22)` — bordes de inputs, paneles secundarios.
- `rgba(206,105,247,.30)` — modales flotantes (más visible).
- `rgba(206,105,247,.55)` — focus de inputs.

## Combinaciones aprobadas

### Gradient principal (botones primarios)
```css
background: linear-gradient(135deg, #B034C5, #7B218A);
```

### Gradient de panel
```css
background: linear-gradient(180deg, #130618, #1A1020);
```

### Gradient banner severidad grave
```css
background: linear-gradient(90deg, rgba(212,83,109,.18), rgba(212,83,109,.08));
```

### Gradient botón danger
```css
background: linear-gradient(135deg, #D4536D, #A32D2D);
```

## Combinaciones prohibidas

❌ Texto blanco puro (`#FFFFFF`) sobre fondo claro. Siempre `#FCFCFC` o con alpha.
❌ Verde/rojo brillantes (Bootstrap-style). Usar los semánticos de la paleta.
❌ Gradients con más de 2 stops o de más de 180° de variación de tono.
❌ Cualquier hex fuera de esta lista sin discusión previa.
