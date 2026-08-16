---
name: nb-boilerplate
description: Scaffold new FiveM resources following Neenbyss Studios conventions (Lua54, oxMySQL, nb-bridge, Vue 3 NUI, escrow-ready). Use when creating a new nb-* FiveM script, setting up a FiveM resource from scratch, or the user says "nuevo script/recurso".
---

# NB Boilerplate - FiveM Resource Scaffolding

Scaffold production-ready FiveM resources with: Lua54, oxMySQL, nb-bridge, Vue 3 NUI, dark-only design system, escrow support.

## When to Use

- Creating a new FiveM resource from scratch
- User says "new script", "new resource", "crear script", "nuevo recurso"
- Setting up client/server/bridge/NUI structure for Neenbyss projects

## Scaffolding Workflow

1. **Ask the user for:**
   - Resource name (e.g., `nb-garages`)
   - Brief description
   - Features needed: Database? NUI? Inventory? Vehicles?

2. **Create directory structure** using template files from `assets/`

3. **Customize generated files:**
   - Replace `nb-boilerplate` with resource name in all files
   - Update `fxmanifest.lua` description
   - Update `shared/config.lua` with resource-specific settings
   - Update `shared/locale.lua` with resource-specific strings
   - Copy `assets/sql/boilerplate.sql` to `[sql]/resourcename.sql` in the target resource
   - If NUI needed: uncomment `ui_page` and `files` blocks in fxmanifest
   - If NUI needed: uncomment `'ui/**/*'` in `escrow_ignore`

4. **Start writing business logic** in `client/main.lua` and `server/main.lua`

## Directory Structure

```
nb-resourcename/
├── fxmanifest.lua              -- Resource manifest + escrow config
├── shared/
│   ├── config.lua              -- Resource configuration (CUSTOMIZE)
│   ├── debugger.lua            -- Debug utility (DO NOT MODIFY)
│   └── locale.lua              -- i18n EN/ES minimum (CUSTOMIZE)
├── bridge/
│   └── database.lua            -- SQL queries via oxMySQL (CUSTOMIZE)
├── client/
│   └── main.lua                -- Client logic (CUSTOMIZE)
├── server/
│   └── main.lua                -- Server logic (CUSTOMIZE)
├── [sql]/
│   └── resourcename.sql        -- Database schema (CUSTOMIZE)
└── ui/                         -- Only if NUI needed
    ├── index.html              -- Vue app mount point
    ├── css/style.css           -- Design system CSS
    └── js/
        ├── app.js              -- Vue init + message router (CUSTOMIZE)
        ├── nui.js              -- Lua<->JS bridge (DO NOT MODIFY)
        ├── store.js            -- State management (CUSTOMIZE)
        └── components/
            ├── toast.js        -- Toast notifications (DO NOT MODIFY)
            └── confirm-modal.js -- Confirm dialog (DO NOT MODIFY)
```

## Key Conventions

### Event Naming
```lua
RESOURCE_NAME .. ':server:actionName'  -- server events
RESOURCE_NAME .. ':client:actionName'  -- client events
```
Always use `GetCurrentResourceName()`, never hardcode resource names.

### Database
All SQL in `bridge/database.lua` under `Bridge.DB.*`. Use oxMySQL with parameterized queries (`?`) only. Table naming: `nb_resourcename`.

### Framework Bridge
Use `Bridge.*` from nb-bridge dependency. Never call ESX/QBCore directly. Refer to the `/nb-bridge` skill for the full API.

### NUI Communication Flow
```
Client JS (NUI.post) -> Client Lua (RegisterNUICallback)
  -> Server Lua (TriggerServerEvent) -> Bridge.DB.* (oxMySQL)
  -> TriggerClientEvent -> SendNUIMessage -> Vue Store -> re-render
```

### Escrow Rules (Tebex)
- **Open** (escrow_ignore): config, debugger, locale, database bridge, UI
- **Closed**: client/main.lua, server/main.lua (business logic)

### Pre-publish Checklist
- `Config.Debug = false`
- All queries use `?` parameters (never string concat)
- `escrow_ignore` lists correct files
- SQL schema in `[sql]/`
- Locale includes EN and ES minimum
- No hardcoded resource names

## References

- **Lua patterns**: [references/lua-patterns.md](references/lua-patterns.md) - Events, Bridge.DB, Config, Locale, Debugger
- **NUI patterns**: [references/nui-patterns.md](references/nui-patterns.md) - Vue 3 components, NUI bridge, Store, message router
- **Design system**: [references/design-system.md](references/design-system.md) - CSS tokens, component styles, rules
- **Template files**: All boilerplate source files are in `assets/`
