# NB Design System

Dark-only design system for all Neenbyss FiveM NUIs. Change `--primary` per resource; everything else stays consistent.

## CSS Tokens

```css
:root {
    /* Surfaces (darkest to lightest) */
    --bg: #0f0f12;
    --surface: #18181c;
    --surface-raised: #1f1f24;
    --surface-hover: #27272c;
    --surface-active: #303036;

    /* Text */
    --fg: #fafafa;
    --fg-secondary: #a1a1aa;
    --fg-tertiary: #71717a;

    /* Brand - CHANGE PER RESOURCE */
    --primary: #6366f1;
    --primary-hover: #818cf8;
    --primary-muted: rgba(99, 102, 241, 0.15);

    /* Semantic */
    --danger: #ef4444;  --danger-hover: #f87171;  --danger-muted: rgba(239,68,68,0.15);
    --warning: #f59e0b; --warning-muted: rgba(245,158,11,0.15);
    --success: #10b981; --success-muted: rgba(16,185,129,0.15);
    --info: #3b82f6;    --info-muted: rgba(59,130,246,0.15);

    /* Borders */
    --border: rgba(255,255,255,0.06);
    --border-strong: rgba(255,255,255,0.1);

    /* Radius */
    --radius-sm: 6px;   /* inputs, buttons, badges */
    --radius-md: 10px;  /* cards, dropdowns */
    --radius-lg: 14px;  /* panels, modals */

    /* Fonts */
    --font: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Animation */
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Typography Scale

| Size    | Weight | Use                          |
|---------|--------|------------------------------|
| 10-11px | 400    | Metadata, badges, captions   |
| 12-13px | 400    | Body text                    |
| 14px    | 500-600| Subtitles, panel titles      |
| 15px    | 600    | Section titles               |
| 18px    | 600    | Large panel titles           |
| 32px    | 700    | Hero numbers (money, stats)  |

Use `--font-mono` for: coordinates, IDs, plates, money amounts.

## Spacing (multiples of 4px)

4px | 6px | 8px | 10px | 12px | 14px | 16px | 20px | 24px | 32px | 40px

## Z-Index

| Layer   | Value | Use                    |
|---------|-------|------------------------|
| base    | 1     | Stacked elements       |
| menu    | 50    | Dropdowns              |
| modal   | 100   | Modals, overlays       |
| toast   | 200   | Toast notifications    |
| overlay | 9000  | Full-screen NUI menus  |

## CSS Naming Convention

```
.component-element           -- kebab-case with parent prefix
.component-element-sub       -- deeper nesting
.component.variant           -- state/variant modifier
.btn-primary                 -- component-variant
.list-item.active            -- component + state
.badge-success               -- component-semantic
```

Utility classes for quick adjustments only:
```css
.text-secondary .text-tertiary .text-primary .text-danger .text-success
.text-sm .text-xs .text-mono
.mt-1 .mt-2 .mt-3 .mt-4 .mb-1 .mb-2 .mb-3 .mb-4
.flex .flex-col .items-center .justify-between .gap-1 .gap-2 .gap-3
```

## Animation Durations

| Duration | Use                              |
|----------|----------------------------------|
| 0.1s     | Immediate color changes          |
| 0.15s    | Hover, focus interactions        |
| 0.2s     | Fade in/out, general transitions |
| 0.3s     | Slide-in panels, modals          |

Standard: `transition: all 0.15s var(--ease);` on every interactive element.

## External Dependencies

```html
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<!-- Icons -->
<link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css">
```

Icons: `<i class="icon-name"></i>` (Lucide font). Size via `font-size`.

## Global Rules

1. Dark theme only - no light mode
2. No breakpoints - fixed resolution, use flexbox/grid
3. `body { background: transparent; overflow: hidden; user-select: none; }`
4. `-webkit-font-smoothing: antialiased` always
5. Every interactive element needs `transition: all 0.15s var(--ease)`
6. Confirm destructive actions with modal
7. Scrollbar: 4px width, `--surface-active` thumb, transparent track
