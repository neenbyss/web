# Server Patterns

## Caching + Client Sync

Load data into memory at startup. Sync to individual players on request, broadcast to all on change.

```lua
local cachedJobs = {}
local cachedMarkers = {}

local function LoadJobs()
    cachedJobs = Bridge.DB.GetAllJobs()
    Debugger('Jobs', 'Loaded', #cachedJobs, 'jobs')
end

local function LoadMarkers()
    cachedMarkers = Bridge.DB.GetAllMarkers()
    Debugger('Markers', 'Loaded', #cachedMarkers, 'markers')
end

-- Sync to one player (on join/request)
RegisterNetEvent('nb-resource:server:requestData', function()
    local src = source
    TriggerClientEvent('nb-resource:client:syncData', src, cachedMarkers)
end)

-- Broadcast to all (after create/update/delete)
local function SyncMarkersToClients()
    TriggerClientEvent('nb-resource:client:syncData', -1, cachedMarkers)
end

-- Reload + broadcast after mutation
local function OnDataChanged()
    LoadMarkers()
    SyncMarkersToClients()
end
```

**Key:** Minimize DB queries. Cache frequently-read data. Reload cache only after mutations.

## Transaction Logging

Standardized schema for all money movements:

```lua
Bridge.DB.LogTransaction({
    job_name = jobName,
    player_identifier = Bridge.GetIdentifier(src),
    player_name = Bridge.GetPlayerName(src),
    type = 'deposit',       -- deposit, withdraw, invoice_payment, salary
    amount = amount,
    reason = 'Boss menu deposit',
})
```

Always log before sending success notification. Include `type` enum for filtering.

## Online Player Lookup (O(1))

Build lookup table from `GetPlayers()` instead of nested loops:

```lua
local function BuildOnlineLookup()
    local onlinePlayers = {}
    for _, playerId in ipairs(GetPlayers()) do
        local id = tonumber(playerId)
        if id then
            local identifier = Bridge.GetIdentifier(id)
            if identifier then
                onlinePlayers[identifier] = id
            end
        end
    end
    return onlinePlayers
end

-- Usage: enrich DB rows with online status
local onlinePlayers = BuildOnlineLookup()
for _, row in ipairs(dbRows) do
    row.online = onlinePlayers[row.identifier] ~= nil
    row.source = onlinePlayers[row.identifier] or nil
end
```

## Notify Online Player by Identifier

Find and notify a player by their identifier (not source):

```lua
for _, playerId in ipairs(GetPlayers()) do
    local id = tonumber(playerId)
    if id then
        local ident = Bridge.GetIdentifier(id)
        if ident == targetIdentifier then
            Bridge.Notify(id, message, 'success')
            break
        end
    end
end
```

## Retry Polling for Eventual Consistency

When framework updates haven't propagated to DB yet:

```lua
for attempt = 1, 5 do
    Wait(500)
    local rows = Bridge.DB.GetData(key)
    local found = false
    for _, row in ipairs(rows) do
        if row.identifier == targetIdentifier then
            found = true
            break
        end
    end
    if found then break end
end
```

Use sparingly. Only when async framework operations (job assignment, etc.) need time to propagate.

## Stash Registration Pattern

Server registers stash with inventory system, then tells client to open:

```lua
-- Server: register + notify client
RegisterNetEvent('nb-resource:server:openStash', function(stashId, label, jobName, coords, minGrade)
    local src = source
    -- Validate job + grade access
    local playerJob = Bridge.GetJob(src)
    if not playerJob or playerJob.name ~= jobName then return end

    Bridge.RegisterStash(stashId, label, Config.Stash.Slots, Config.Stash.MaxWeight)
    TriggerClientEvent('nb-resource:client:stashReady', src, stashId)
end)

-- Client: open after server confirms registration
RegisterNetEvent('nb-resource:client:stashReady', function(stashId)
    Bridge.OpenStash(stashId)
end)
```

**Why two-step:** Inventory systems (ox_inventory, qb-inventory) require server-side stash registration before client can open.

## Input Validation Functions

Centralize validation for reuse across events and exports:

```lua
local function ValidateJobName(name)
    return type(name) == 'string' and #name > 0 and #name <= 50
        and name:match('^[a-z0-9_]+$') ~= nil
end

local function ValidateJobLabel(label)
    return type(label) == 'string' and #label > 0 and #label <= 50
end

local function ValidateAmount(amount, max)
    amount = tonumber(amount)
    return amount and amount > 0 and amount <= (max or math.huge)
end
```

## Admin-Gated CRUD Event Template

```lua
RegisterNetEvent('nb-resource:server:createThing', function(data)
    local src = source
    if not Bridge.IsAdmin(src) then return end

    if not data or not ValidateInput(data.name) then
        return TriggerClientEvent('nb-resource:client:response', src, {
            success = false,
            message = Locale('invalid_input'),
        })
    end

    -- Check duplicates
    local existing = Bridge.DB.GetThingByName(data.name)
    if existing then
        return TriggerClientEvent('nb-resource:client:response', src, {
            success = false,
            message = Locale('already_exists', data.name),
        })
    end

    Bridge.DB.CreateThing(data)
    ReloadCache()

    TriggerClientEvent('nb-resource:client:response', src, {
        success = true,
        message = Locale('thing_created', data.name),
        action = 'created',
        data = { name = data.name },
    })
end)
```

Response shape: `{ success, message, action?, data? }` - client NUI can handle uniformly.
