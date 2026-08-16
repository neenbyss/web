# Client API Reference

Complete client-side `Bridge.*` functions from nb-bridge.

## Table of Contents
- [Raw Player Data](#raw-player-data)
- [Normalized Getters](#normalized-getters)
- [Player Events](#player-events)
- [Notifications](#notifications)
- [Inventory](#inventory)
- [Vehicles](#vehicles)
- [Callbacks](#callbacks)
- [Progress Bars](#progress-bars)

## Raw Player Data

### Bridge.GetPlayerData()
Returns the local player's raw framework data object (not normalized).
- ESX: returns xPlayer data
- QBCore: returns PlayerData

## Normalized Getters

These mirror server-side functions and always return the same canonical format regardless of framework. Use these instead of accessing `Bridge.GetPlayerData()` directly.

### Bridge.GetJob()
Returns **canonical format** (identical on ESX and QBCore):
```lua
{
    name         = "police",     -- string: job identifier
    label        = "Police",     -- string: display name
    grade        = 3,            -- number: numeric grade level
    grade_name   = "sergeant",   -- string: grade identifier
    grade_label  = "Sergeant",   -- string: grade display name
    grade_salary = 5000,         -- number: salary for this grade
    onDuty       = true,         -- boolean: duty status
}
```

### Bridge.GetGang()
QBCore only. Returns **canonical format** or `nil` on ESX:
```lua
{
    name        = "ballas",   -- string
    label       = "Ballas",   -- string
    grade       = 0,          -- number
    grade_name  = "recruit",  -- string
    grade_label = "Recruit",  -- string
}
```

### Bridge.GetMoney(moneyType)
Returns `number` - balance for `'cash'` or `'bank'`.

```lua
local cash = Bridge.GetMoney('cash')
local bank = Bridge.GetMoney('bank')
```

### Bridge.GetAccounts()
Returns normalized table of all money accounts:
```lua
{ cash = 5000, bank = 25000 }
```

### Bridge.GetIdentifier()
Returns `string|nil` - player's `license` (ESX) or `citizenid` (QBCore).

### Bridge.GetPlayerName()
Returns `string` - character's full name (firstname + lastname). Falls back to GTA player name.

### Bridge.GetGroup()
Returns `string` - permission group. ESX: from player data. QBCore: always `'user'` (use server callback for reliable permission checks).

## Player Events

### Bridge.OnPlayerLoaded(cb)
Register callback fired when the local player loads. Callback receives **no arguments** — use `Bridge.GetJob()` etc. to read data.

```lua
Bridge.OnPlayerLoaded(function()
    local job = Bridge.GetJob()
    print('Loaded with job: ' .. job.name)
end)
```

### Bridge.OnJobUpdate(cb)
Register callback fired when the player's job changes. Callback receives **normalized job table** (same format as `Bridge.GetJob()`).

```lua
Bridge.OnJobUpdate(function(job)
    print('New job: ' .. job.name .. ' grade: ' .. job.grade)
end)
```

### Bridge.OnGangUpdate(cb)
QBCore only. Register callback fired when the player's gang changes. Callback receives **normalized gang table** (same format as `Bridge.GetGang()`). On ESX this is a no-op (callback is never called).

```lua
Bridge.OnGangUpdate(function(gang)
    print('New gang: ' .. gang.name)
end)
```

## Notifications

### Bridge.ShowNotification(message, type)
Show a local notification. Types: `'success'`, `'error'`, `'info'`, `'warning'`.
Auto-detects: ox_lib > framework native > GTA native.

```lua
Bridge.ShowNotification('Item added!', 'success')
```

## Inventory

### Bridge.OpenStash(stashId)
Open a stash UI by ID. The stash must be registered server-side first.

```lua
Bridge.OpenStash('police_evidence_1')
```

### Bridge.OpenPlayerInventory(targetServerId)
Open another player's inventory for inspection.

### Bridge.GetItemCount(item)
Returns `number` - count of the specified item in local inventory.

```lua
local water = Bridge.GetItemCount('water')
if water > 0 then
    -- player has water
end
```

### Bridge.GetImagePath()
Returns `string` - NUI image path pattern for inventory items.
Example: `nui://ox_inventory/web/images/%s.png`

Use with `string.format`:
```lua
local path = string.format(Bridge.GetImagePath(), 'water')
```

## Vehicles

### Bridge.NormalizePlate(plate)
Returns `string` - plate with trailing spaces trimmed. Works on both sides.

### Bridge.ResolveModelHash(model)
Returns `number` - converts string or number model to a GTA hash.

### Bridge.SpawnVehicle(model, coords, heading, props?, plate?, cb)
Spawn a vehicle at coordinates with optional properties and plate.

```lua
Bridge.SpawnVehicle('adder', vector3(0, 0, 0), 90.0, nil, 'ABC123', function(vehicle)
    if vehicle then
        SetPedIntoVehicle(PlayerPedId(), vehicle, -1)
    end
end)
```

- Auto-loads the model with 5-second timeout
- Applies properties and plate if provided
- Callback receives `vehicle` handle or `nil` on failure

### Bridge.GetVehicleProperties(vehicle)
Returns table - vehicle properties/mods (wraps framework function).

### Bridge.SetVehicleProperties(vehicle, props)
Apply saved properties to a vehicle (wraps framework function).

### Bridge.GetVehicleLabel(model)
Returns `string` - display name for a vehicle model hash.

## Callbacks

### Bridge.TriggerServerCallback(name, cb, ...)
Call a registered server callback and receive the response.

```lua
Bridge.TriggerServerCallback('nb-shop:getItems', function(items)
    for _, item in ipairs(items) do
        print(item.name)
    end
end, 'weapons') -- extra args passed to server
```

## Progress Bars

### Bridge.Progress(duration, label, anim?)
Show a blocking progress bar. Returns `true` if completed, `false` if cancelled.

```lua
local completed = Bridge.Progress(5000, 'Repairing vehicle...', {
    dict = 'mini@repair',
    name = 'fixing_a_player'
})

if completed then
    -- repair succeeded
else
    -- player cancelled (ox_lib only)
end
```

Parameters:
- `duration` - milliseconds
- `label` - text displayed on the progress bar
- `anim` - optional table `{ dict = "anim_dict", name = "anim_name" }`

Auto-detects: ox_lib (supports cancellation, disables movement) > native GTA animation fallback.
