# Lua Patterns & Conventions

## File Load Order

```
shared/config.lua -> shared/debugger.lua -> shared/locale.lua
(server only) @oxmysql/lib/MySQL.lua -> bridge/database.lua -> server/main.lua
(client only) client/main.lua
```

`Bridge` global table is provided by `nb-bridge` dependency (loaded before this resource).

## Event Pattern

```lua
local RESOURCE_NAME = GetCurrentResourceName()

-- Server: handle client request
RegisterNetEvent(RESOURCE_NAME .. ':server:requestData', function()
    local src = source
    if not Bridge.IsAdmin(src) then return end
    local data = Bridge.DB.GetAll()
    TriggerClientEvent(RESOURCE_NAME .. ':client:receiveData', src, { items = data })
end)

-- Client: trigger server request
TriggerServerEvent(RESOURCE_NAME .. ':server:requestData')

-- Client: receive server response
RegisterNetEvent(RESOURCE_NAME .. ':client:receiveData', function(data)
    SendNUIMessage({ action = 'open', data = data })
    SetNuiFocus(true, true)
end)
```

## NUI Callbacks (Client)

```lua
-- Close UI
RegisterNUICallback('close', function(_, cb)
    SetNuiFocus(false, false)
    cb({ success = true })
end)

-- Handle action from JS
RegisterNUICallback('deleteItem', function(data, cb)
    TriggerServerEvent(RESOURCE_NAME .. ':server:delete', data.id)
    cb({ success = true })
end)
```

## Bridge.DB Pattern (Server Only)

All queries go in `bridge/database.lua`. Never put SQL in `server/main.lua`.

```lua
if not IsDuplicityVersion() then return end

Bridge = Bridge or {}
Bridge.DB = {}

function Bridge.DB.GetAll()
    local rows = MySQL.query.await('SELECT * FROM nb_example ORDER BY id ASC')
    local result = {}
    for _, row in ipairs(rows or {}) do
        result[#result + 1] = { id = row.id, name = row.name, label = row.label }
    end
    return result
end

function Bridge.DB.GetById(id)
    return MySQL.single.await('SELECT * FROM nb_example WHERE id = ?', { id })
end

function Bridge.DB.Create(name, label)
    return MySQL.insert.await('INSERT INTO nb_example (name, label) VALUES (?, ?)', { name, label })
end

function Bridge.DB.Update(id, name, label)
    MySQL.update.await('UPDATE nb_example SET name = ?, label = ? WHERE id = ?', { name, label, id })
    return true
end

function Bridge.DB.Delete(id)
    return MySQL.update.await('DELETE FROM nb_example WHERE id = ?', { id })
end
```

**oxMySQL methods:**
- `MySQL.query.await(sql, params)` - SELECT multiple rows
- `MySQL.single.await(sql, params)` - SELECT one row
- `MySQL.insert.await(sql, params)` - INSERT (returns insert ID)
- `MySQL.update.await(sql, params)` - UPDATE/DELETE (returns affected rows)
- `MySQL.scalar.await(sql, params)` - SELECT single value

## Config Pattern

```lua
Config = Config or {}
Config.AdminGroups = { 'admin', 'superadmin', 'god' }
Config.Debug = false
Config.Locale = 'en'

-- Resource-specific
Config.MyFeature = {
    Enabled = true,
    Cooldown = 5000,
}
```

## Locale Pattern

```lua
Locales['en'] = {
    ['no_permission'] = 'You do not have permission.',
    ['item_created']  = 'Item "%s" created successfully.',
}
Locales['es'] = {
    ['no_permission'] = 'No tienes permiso.',
    ['item_created']  = 'Item "%s" creado exitosamente.',
}

-- Usage:
Locale('no_permission')            --> "You do not have permission."
Locale('item_created', 'Sword')    --> 'Item "Sword" created successfully.'
```

## Debugger

```lua
-- Only prints when Config.Debug = true
-- Format: [resource][SERVER|CLIENT][Module] message
Debugger('Main', 'Loaded', #items, 'items')
-- Output: [nb-garages][SERVER][Main] Loaded 15 items
```

## Server Response Pattern

```lua
-- Standard response format to client
TriggerClientEvent(RESOURCE_NAME .. ':client:response', src, {
    success = true,              -- or false
    message = 'Created!',       -- toast message
    data = { items = items },   -- optional updated state
})
```

## SQL Schema Pattern

```sql
CREATE TABLE IF NOT EXISTS `nb_resourcename` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `label` VARCHAR(100) NOT NULL,
    `active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY `idx_resourcename_name` (`name`)
) ENGINE=InnoDB;
```

Table naming: `nb_` prefix + resource name (without `nb-`). Use `IF NOT EXISTS`.
