---
name: nb-bridge
description: FiveM framework bridge (ESX/QBCore) API reference for Neenbyss scripts. Use when writing FiveM Lua scripts that need framework functions (player data, money, inventory, vehicles, notifications, callbacks, licenses, progress bars) or when the code uses the Bridge global table or nb-bridge exports.
---

# nb-bridge - Framework Abstraction Layer

Unified API for ESX and QBCore. All Neenbyss FiveM scripts use `nb-bridge` instead of calling framework APIs directly.

## When to Use

- Writing any FiveM Lua script that interacts with player data, money, jobs, inventory, vehicles, notifications, callbacks, licenses, or progress bars
- Code references `Bridge.*` functions or `exports['nb-bridge']`
- Migrating a script from direct ESX/QBCore calls to the bridge

## Setup in Consumer Scripts

### fxmanifest.lua

```lua
dependencies {
    'oxmysql',
    'nb-bridge',
}
```

Do NOT include bridge module files in your fxmanifest. The `Bridge` global table is available automatically.

### server.cfg Order

```cfg
ensure oxmysql
ensure es_extended  -- or qb-core
ensure nb-bridge    -- BEFORE any nb-* resource
ensure nb-garages
```

## Core Usage Pattern

Use `Bridge.*` as a global table. Never call ESX/QBCore APIs directly.

```lua
-- SERVER
RegisterCommand('bonus', function(source)
    local name = Bridge.GetPlayerName(source)
    Bridge.AddMoney(source, 'bank', 5000, 'bonus')
    Bridge.Notify(source, name .. ' received $5,000!', 'success')
end)

-- CLIENT
Bridge.OnJobUpdate(function(job)
    print('New job: ' .. job.name)
end)
```

### Alternative: Exports

```lua
local name = exports['nb-bridge']:GetPlayerName(source)
```

Both `Bridge.*` and `exports['nb-bridge']:*` work identically.

## Callbacks

Register on server, trigger from client. Always namespace with your resource name.

```lua
-- SERVER
Bridge.CreateCallback('nb-myresource:getData', function(source, respond, arg1)
    local data = doSomething(arg1)
    respond(data)
end)

-- CLIENT
Bridge.TriggerServerCallback('nb-myresource:getData', function(result)
    print(result)
end, arg1)
```

## Configuration Cascade

Consumer script `Config` table takes priority over `BridgeConfig`:

```lua
-- In your script: if Config.AdminGroups exists, Bridge uses it
-- Otherwise falls back to BridgeConfig.AdminGroups
Config = {
    Debug = true,
    AdminGroups = { 'admin', 'superadmin' },
}
```

## Key Rules

1. **Never call ESX/QBCore directly** - always use `Bridge.*`
2. **Namespace callbacks** - use `'resourcename:callbackName'` format
3. **Bridge loads first** - safe to use immediately in your script
4. **Keep script-specific bridges** - files like `bridge/database.lua` or `bridge/garage.lua` stay in your script; only generic framework calls go through nb-bridge
5. **Auto-detection** - inventory, notification, license, and progress systems are detected automatically (ox_lib, ox_inventory, qb-inventory, etc.)
6. **Database** - nb-bridge uses `oxmysql` (`MySQL.insert.await`, `MySQL.scalar.await`, etc.)

## Quick API Reference

### Server Functions
| Function | Purpose |
|----------|---------|
| `Bridge.GetPlayer(src)` | Get framework player object |
| `Bridge.GetIdentifier(src)` | Get license (ESX) / citizenid (QBCore) |
| `Bridge.GetPlayerName(src)` | Get character full name |
| `Bridge.IsAdmin(src)` | Check admin status |
| `Bridge.AddMoney(src, type, amount, reason)` | Add cash/bank |
| `Bridge.RemoveMoney(src, type, amount, reason)` | Remove cash/bank |
| `Bridge.GetMoney(src, type)` | Get balance |
| `Bridge.GetJob(src)` | Get normalized `{name, label, grade, grade_name, ...}` |
| `Bridge.GetGang(src)` | Get normalized gang (QBCore only, nil on ESX) |
| `Bridge.GetAccounts(src)` | Get `{cash = N, bank = N}` |
| `Bridge.SetJob(src, job, grade, onDuty)` | Set job |
| `Bridge.Notify(src, msg, type)` | Send notification |
| `Bridge.AddItem(src, item, count, meta?)` | Add inventory item |
| `Bridge.RemoveItem(src, item, count, meta?)` | Remove inventory item |
| `Bridge.HasItem(src, item, count?)` | Check item ownership |
| `Bridge.CreateCallback(name, cb)` | Register server callback |
| `Bridge.CreateBill(src, target, amount, desc, job)` | Create invoice |

### Client Functions
| Function | Purpose |
|----------|---------|
| `Bridge.GetPlayerData()` | Get raw local player data |
| `Bridge.GetJob()` | Get normalized `{name, label, grade, grade_name, ...}` |
| `Bridge.GetGang()` | Get normalized gang (QBCore only, nil on ESX) |
| `Bridge.GetMoney(type)` | Get cash/bank balance |
| `Bridge.GetAccounts()` | Get `{cash = N, bank = N}` |
| `Bridge.GetIdentifier()` | Get license/citizenid |
| `Bridge.GetPlayerName()` | Get character full name |
| `Bridge.GetGroup()` | Get permission group |
| `Bridge.OnPlayerLoaded(cb)` | Callback on player load (no args) |
| `Bridge.OnJobUpdate(cb)` | Callback with normalized job |
| `Bridge.OnGangUpdate(cb)` | Callback with normalized gang (QBCore) |
| `Bridge.ShowNotification(msg, type)` | Show local notification |
| `Bridge.TriggerServerCallback(name, cb, ...)` | Call server callback |
| `Bridge.OpenStash(stashId)` | Open stash UI |
| `Bridge.GetItemCount(item)` | Get item count |
| `Bridge.SpawnVehicle(model, coords, heading, props?, plate?, cb)` | Spawn vehicle |
| `Bridge.Progress(duration, label, anim?)` | Show progress bar |

## Detailed API

- **Server API**: See [references/api-server.md](references/api-server.md)
- **Client API**: See [references/api-client.md](references/api-client.md)
- **Integration patterns**: See [references/integration-guide.md](references/integration-guide.md)
