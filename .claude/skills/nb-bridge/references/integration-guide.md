# Integration Guide

How to properly integrate nb-bridge into Neenbyss FiveM scripts.

## Table of Contents
- [New Script Setup](#new-script-setup)
- [Migrating Existing Scripts](#migrating-existing-scripts)
- [Common Patterns](#common-patterns)
- [Configuration Override](#configuration-override)
- [Override System](#override-system)
- [Framework Detection](#framework-detection)
- [Debugging](#debugging)

## New Script Setup

### 1. fxmanifest.lua

```lua
fx_version 'cerulean'
game 'gta5'
lua54 'yes'

dependencies {
    'oxmysql',
    'nb-bridge',
}

shared_scripts {
    '@oxmysql/lib/MySQL.lua',
    'config.lua',
}

server_scripts {
    'server/*.lua',
}

client_scripts {
    'client/*.lua',
}
```

Do NOT add any `@nb-bridge/` files. The `Bridge` table is global and auto-populated.

### 2. Use Bridge Directly

```lua
-- server/main.lua
Bridge.CreateCallback('nb-myscript:getData', function(source, respond)
    local id = Bridge.GetIdentifier(source)
    local job = Bridge.GetJob(source)
    respond({ id = id, job = job })
end)

-- client/main.lua
Bridge.TriggerServerCallback('nb-myscript:getData', function(data)
    print(data.id, data.job.name)
end)
```

## Migrating Existing Scripts

### What to Remove

Delete from fxmanifest.lua and disk:
- `bridge/framework.lua` (or `shared/bridge.lua`)
- `bridge/notify.lua`
- `bridge/inventory.lua`
- `bridge/vehicle.lua`
- `bridge/callbacks.lua`
- `bridge/licenses.lua`
- `bridge/progress.lua`
- `shared/debugger.lua`

### What to Keep

Script-specific bridge files stay in your script:
- `bridge/database.lua` - your DB queries
- `bridge/garage.lua` - garage-specific logic
- `bridge/keys.lua` - vehicle keys integration
- Any other non-generic bridge files

### Migration Checklist

1. Add `'nb-bridge'` to `dependencies {}` in fxmanifest
2. Remove old bridge file references from fxmanifest `shared_scripts`/`server_scripts`/`client_scripts`
3. Delete the old bridge files from disk
4. Verify all `Bridge.*` calls still work (API is identical)
5. Test on both ESX and QBCore if possible

## Common Patterns

### Player Action with Validation

```lua
-- Server
RegisterNetEvent('nb-myscript:doAction', function()
    local src = source
    if not Bridge.HasItem(src, 'toolkit') then
        Bridge.Notify(src, 'You need a toolkit!', 'error')
        return
    end
    Bridge.RemoveItem(src, 'toolkit', 1)
    Bridge.Notify(src, 'Action completed!', 'success')
end)
```

### Job-Restricted Feature

```lua
-- Server
Bridge.CreateCallback('nb-myscript:canAccess', function(source, respond)
    local job = Bridge.GetJob(source)
    respond(job.name == 'police' and job.grade >= 2)
end)

-- Client
Bridge.TriggerServerCallback('nb-myscript:canAccess', function(allowed)
    if not allowed then
        Bridge.ShowNotification('Insufficient rank', 'error')
        return
    end
    -- proceed
end)
```

### Vehicle Spawn with Properties

```lua
-- Client
Bridge.SpawnVehicle(model, coords, heading, savedProps, plate, function(veh)
    if not veh then
        Bridge.ShowNotification('Failed to spawn vehicle', 'error')
        return
    end
    TaskWarpPedIntoVehicle(PlayerPedId(), veh, -1)
end)
```

### Progress Bar with Animation

```lua
-- Client
local success = Bridge.Progress(3000, 'Searching...', {
    dict = 'anim@gangops@facility@servers@bodysearch@',
    name = 'player_search'
})
if success then
    TriggerServerEvent('nb-myscript:searchComplete')
end
```

## Configuration Override

Your script's `Config` table overrides `BridgeConfig` defaults:

```lua
-- config.lua (in your script)
Config = {
    Debug = false,
    AdminGroups = { 'admin', 'superadmin', 'god' },
    -- Bridge reads Config.AdminGroups before BridgeConfig.AdminGroups
}
```

BridgeConfig defaults:
- `Debug`: false
- `AdminGroups`: `{'admin', 'superadmin', 'god'}`
- `Stash.Slots`: 50
- `Stash.MaxWeight`: 100000

## Override System

Drop Lua files in `nb-bridge/overrides/client/` or `nb-bridge/overrides/server/` to replace any Bridge function:

```lua
-- overrides/server/custom_notify.lua
Bridge.Notify = function(source, message, type)
    -- custom implementation
end
```

Override files load last, so they replace existing functions.

## Framework Detection

Check `Bridge.Framework` to branch when absolutely necessary:

```lua
if Bridge.Framework == 'ESX' then
    -- ESX-specific code (avoid when possible)
elseif Bridge.Framework == 'QBCore' then
    -- QBCore-specific code
end
```

Prefer using `Bridge.*` functions which handle this internally.

## Debugging

Enable debug prints by setting `BridgeConfig.Debug = true` or `Config.Debug = true` in your script.

Use `Debugger(module, ...)` for bridge-level debug output:
```
[nb-bridge][SERVER][inventory] Adding item water x5 to player 1
```
