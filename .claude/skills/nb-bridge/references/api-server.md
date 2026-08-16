# Server API Reference

Complete server-side `Bridge.*` functions from nb-bridge.

## Table of Contents
- [Framework / Player Management](#framework--player-management)
- [Money](#money)
- [Jobs](#jobs)
- [Permissions](#permissions)
- [Notifications](#notifications)
- [Inventory](#inventory)
- [Stash Management](#stash-management)
- [Vehicles](#vehicles)
- [Callbacks](#callbacks)
- [Licenses](#licenses)
- [Billing](#billing)
- [Events](#events)

## Framework / Player Management

### Bridge.GetPlayer(source)
Returns the raw framework player object (xPlayer for ESX, Player for QBCore).

### Bridge.GetIdentifier(source)
Returns `string` - player's `license` (ESX) or `citizenid` (QBCore).

### Bridge.GetSSN(source)
Returns `string|nil` - SSN from ESX identity. Returns `nil` on QBCore.

### Bridge.GetPlayerName(source)
Returns `string` - character's full name (firstname + lastname).

## Money

All money functions accept `type` as `'cash'` or `'bank'`.

### Bridge.AddMoney(source, type, amount, reason)
Add money. `reason` is optional string for logs.

### Bridge.RemoveMoney(source, type, amount, reason)
Remove money. Returns nothing (framework handles insufficient funds).

### Bridge.SetMoney(source, type, amount, reason)
Set exact money amount.

### Bridge.GetMoney(source, type)
Returns `number` - current balance for the account type.

### Bridge.GetAccounts(source)
Returns normalized table of all player money accounts:
```lua
{ cash = 5000, bank = 25000 }
```
ESX: maps `'money'` account to `'cash'`. QBCore: returns `PlayerData.money` directly.

## Jobs

### Bridge.GetJob(source)
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

### Bridge.SetJob(source, job, grade, onDuty)
Set player's job. `onDuty` is QBCore only.

### Bridge.GetGang(source)
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

## Permissions

### Bridge.GetGroup(source)
Returns `string` - permission group (e.g., 'admin', 'user').

### Bridge.SetGroup(source, group)
ESX only. Sets permission group.

### Bridge.IsAdmin(source)
Returns `boolean`. Checks `Config.AdminGroups` first, then `BridgeConfig.AdminGroups`.
Default admin groups: `{'admin', 'superadmin', 'god'}`.

## Notifications

### Bridge.Notify(source, message, type)
Send notification to a player. Types: `'success'`, `'error'`, `'info'`, `'warning'`.
Auto-detects: ox_lib > framework native > GTA native.

## Inventory

Auto-detects: `ox_inventory` > `qb-inventory` > `qs-inventory` > framework default.
System stored in `Bridge.InventorySystem`.

### Bridge.AddItem(source, item, count, metadata?, slot?)
Add item to player inventory. `metadata` and `slot` are optional.

### Bridge.RemoveItem(source, item, count, metadata?, slot?)
Remove item from player inventory.

### Bridge.HasItem(source, item, count?)
Returns `boolean`. Check if player has item. `count` defaults to 1.
Also accepts a table of items: `Bridge.HasItem(src, {'water', 'bread'})`.

### Bridge.CanCarry(source, item, count?, metadata?)
Returns `boolean`. Check if player can carry the item.

### Bridge.GetAllItems()
Returns table of all registered items in the inventory system.

### Bridge.ForceOpenPlayerInventory(source, targetServerId)
Open another player's inventory for inspection.

## Stash Management

### Bridge.RegisterStash(stashId, label, jobName?, coords?)
Register a stash. Uses `BridgeConfig.Stash.Slots` and `BridgeConfig.Stash.MaxWeight`.

### Bridge.IsStashRegistered(stashId)
Returns `boolean`. Check if stash is already registered.

### Bridge.ForceOpenStash(source, stashId)
Force open a stash for a specific player.

## Vehicles

### Bridge.NormalizePlate(plate)
Returns `string` - plate with trailing spaces trimmed. Works on both sides.

### Bridge.GeneratePlate()
Returns `string` - random 8-character uppercase alphanumeric plate.

### Bridge.GiveVehicle(source, model, props?)
Insert vehicle into player's owned vehicles in database.
- ESX: inserts into `owned_vehicles`
- QBCore: inserts into `player_vehicles`

### Bridge.GetVehicleOwnerName(plate)
Returns `string|nil` - full name of the vehicle owner by plate.

## Callbacks

### Bridge.CreateCallback(name, cb)
Register a server callback. Callback signature: `function(source, respond, ...)`
Must call `respond(...)` to send data back to client.

```lua
Bridge.CreateCallback('nb-shop:getItems', function(source, respond, category)
    local items = getItemsByCategory(category)
    respond(items)
end)
```

## Licenses

Auto-detects: `bcs_licensemanager` > `okokLicenses` > `esx_license` > QBCore metadata > ESX default.

### Bridge.GetIdentity(source)
Returns table:
```lua
{ firstname = "John", lastname = "Doe", dob = "1990-01-15", sex = "m" }
```

### Bridge.GetDriverLicense(source)
Returns `{ hasLicense = true/false, label = "Driver License" }`.

### Bridge.GetWeaponLicense(source)
Returns `{ hasLicense = true/false, label = "Weapon License" }`.

## Billing

### Bridge.CreateBill(src, targetId, amount, description, jobName)
Create an invoice/bill. Auto-detects: `esx_billing` > `qb-billing` > `okokBilling`.

## Events

### Bridge.OnPlayerLoaded(cb)
Register callback for when a player loads into the server.
- ESX: `cb(playerId, identifier)`
- QBCore: `cb(src, citizenid)`

### Extended Utilities

These work on both frameworks unless noted:

- `Bridge.SetCoords(source, coords)` - teleport player (ESX: xPlayer.setCoords, QBCore: SetEntityCoords native)
- `Bridge.GetCoords(source)` - get position as `vector3` (ESX: xPlayer.getCoords, QBCore: GetEntityCoords native)
- `Bridge.SetMeta(source, index, value, subIndex?)` - set metadata (ESX: xPlayer.setMeta, QBCore: player.Functions.SetMetaData)
- `Bridge.GetMeta(source, index?, subIndex?)` - get metadata (ESX: xPlayer.getMeta, QBCore: player.PlayerData.metadata)
- `Bridge.ClearMeta(source, index, subIndex?)` - clear metadata (both frameworks)
- `Bridge.TriggerClientEvent(source, event, ...)` - trigger client event

**ESX-only** (return `nil`/`false` on QBCore):
- `Bridge.GetPlayTime(source)` - playtime in seconds
- `Bridge.PlayerVar(source, key, value?)` - get/set xPlayer variables
- `Bridge.ExecuteCommand(source, command)` - execute command as player
