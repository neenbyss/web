---
name: nb-fivem-patterns
description: Reusable FiveM Lua code patterns for Neenbyss scripts - marker systems, external resource detection, permission checks, NUI callbacks, caching, bitwise permissions. Use when writing FiveM Lua that needs client threads, server validation, bridge abstractions, or common game mechanics.
---

# FiveM Lua Patterns (Neenbyss)

Production-tested patterns extracted from nb-jobscreator. Apply these when building new nb-* resources.

## Client Patterns

### Two-Thread Marker System

Split marker rendering into a **scanner** (250ms-1000ms) and a **drawer** (0ms when visible, 1000ms idle). Scanner pre-filters by distance; drawer only loops pre-filtered list + handles input.

**Why two threads:** Avoids 60+ distance calculations/sec. Scanner does heavy work at 4Hz; drawer runs at frame rate but only iterates visible markers.

See [references/client-patterns.md](references/client-patterns.md) for full implementation.

### Blip Management

Data-driven blip creation from config. Always:
1. `ClearBlips()` before recreating
2. Filter by job + grade access
3. Respect metadata flags (`showBlip == false`)
4. Config-driven appearance (`Config.Markers.Blips[type]`)

### Job Data with Type Coercion

ESX returns grade as number, QBCore as table. Always coerce:

```lua
local grade = data.job.grade
if type(grade) == 'table' then
    grade = tonumber(grade.level) or 0
else
    grade = tonumber(grade) or 0
end
```

## Server Patterns

### External Resource Detection

Non-blocking detection with 1000ms delay. Uses global flag + config tri-state (`true`/`false`/`'auto'`).

```lua
-- Global for cross-file access
nbBillingsAvailable = false

CreateThread(function()
    if Config.Billing.UseNbBillings == false then return end
    Wait(1000)
    local state = GetResourceState('nb-billings')
    if state == 'started' then
        nbBillingsAvailable = true
        print('[' .. RESOURCE_NAME .. '] nb-billings detected')
    elseif Config.Billing.UseNbBillings == true then
        print('[' .. RESOURCE_NAME .. '] ^1ERROR: nb-billings required but not found^0')
    end
end)
```

**Key decisions:**
- `Wait(1000)` lets dependencies boot first
- `false` = disabled, `true` = required (error if missing), `'auto'` = use if available
- Global variable so other server files can branch on it

### Permission Check Tuple

Return `(allowed, contextData, reason)` from permission checks:

```lua
local function CanDoAction(src)
    if not Config.Feature.Enabled then
        return false, nil, Locale('feature_disabled')
    end
    local playerJob = Bridge.GetJob(src)
    if not playerJob then
        return false, nil, Locale('wrong_job')
    end
    local permissions = Bridge.DB.GetGradePermissions(playerJob.name, grade)
    if not HasPermission(permissions, Permissions.SOME_FLAG) then
        return false, nil, Locale('no_permission')
    end
    return true, playerJob.name, nil
end
```

Callers use: `if not allowed then return Bridge.Notify(src, reason, 'error') end`

### Export with Fallback Delegation

Exports that delegate to external resource if available, otherwise handle internally:

```lua
exports('createThing', function(...)
    if externalAvailable then
        local result = exports['nb-external']:createThing({...})
        return result and result.id or nil
    end
    -- Internal fallback
    return Bridge.DB.CreateThing({...})
end)
```

### Event Validation Pattern

Every `RegisterNetEvent` handler: capture `source`, validate early, return structured response.

```lua
RegisterNetEvent('nb-resource:server:action', function(data)
    local src = source
    if not Bridge.IsAdmin(src) then return end
    if not data or not ValidateInput(data.field) then
        return TriggerClientEvent('nb-resource:client:response', src, {
            success = false, message = Locale('invalid_input')
        })
    end
    -- ... do work ...
    TriggerClientEvent('nb-resource:client:response', src, {
        success = true, message = Locale('action_done'), data = result
    })
end)
```

## Shared Patterns

### Bitwise Permissions

Single integer stores up to 32 flags. O(1) check with bitwise AND.

```lua
Permissions = {
    FLAG_A = 1,   -- bit 0
    FLAG_B = 2,   -- bit 1
    FLAG_C = 4,   -- bit 2
}
Permissions.ALL = FLAG_A | FLAG_B | FLAG_C

function HasPermission(perms, flag) return (perms & flag) ~= 0 end
function AddPermission(perms, flag) return perms | flag end
function RemovePermission(perms, flag) return perms & ~flag end
```

### Debugger Convention

`Debugger(category, action, ...contextualData)` - structured, greppable, respects `Config.Debug`.

```lua
Debugger('Billing', 'createInvoice | src:', src, '| amount:', amount)
Debugger('Markers', 'Created', #blips, 'blips for job:', playerJob)
```

## References

- [references/client-patterns.md](references/client-patterns.md) - Full marker system, blip management, NUI callbacks, interaction router
- [references/server-patterns.md](references/server-patterns.md) - Caching/sync, transaction logging, online player lookup, retry polling
- [references/config-patterns.md](references/config-patterns.md) - Config structure, validation functions, hierarchical organization
