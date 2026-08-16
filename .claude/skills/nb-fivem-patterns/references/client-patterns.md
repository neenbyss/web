# Client Patterns

## Two-Thread Marker System (Full Implementation)

### Scanner Thread (250ms-1000ms)

Pre-filters markers by distance. Updates `markersToDraw` and `nearestMarker` for the drawer.

```lua
local markers = {}
local nearestMarker = nil
local markersToDraw = {}
local drawDistance = Config.Markers.DrawDistance

CreateThread(function()
    while true do
        markersToDraw = {}
        nearestMarker = nil
        local jobName, jobGrade = GetPlayerJobData()
        local ped = PlayerPedId()
        local playerCoords = GetEntityCoords(ped)

        for _, m in ipairs(markers) do
            if m.active and m.job_name == jobName and CanAccessMarker(m, jobGrade) then
                local dist = #(playerCoords - vector3(m.x, m.y, m.z))
                if dist <= drawDistance then
                    markersToDraw[#markersToDraw + 1] = m
                    if dist <= m.radius then
                        nearestMarker = m
                    end
                end
            end
        end

        -- Near markers: 4 scans/sec. Far: 1 scan/sec
        Wait(#markersToDraw > 0 and 250 or 1000)
    end
end)
```

### Drawer Thread (0ms/1000ms)

Only draws pre-filtered markers. Handles interaction prompts and key input.

```lua
local marker3d = Config.Markers.Marker3D
local interactionKey = Config.Markers.InteractionKey

CreateThread(function()
    while true do
        local sleep = 1000
        if #markersToDraw > 0 then
            sleep = 0
            for _, m in ipairs(markersToDraw) do
                DrawMarker(
                    marker3d.type,
                    m.x, m.y, m.z - 0.9,
                    0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0,
                    marker3d.scale.x, marker3d.scale.y, marker3d.scale.z,
                    marker3d.color.r, marker3d.color.g, marker3d.color.b, marker3d.color.a,
                    marker3d.bobUpAndDown, false, 2, marker3d.rotate, nil, nil, false
                )
            end
            if nearestMarker then
                ShowHelpText(GetPromptForType(nearestMarker.type))
                if IsControlJustPressed(0, interactionKey) then
                    HandleMarkerInteraction(nearestMarker)
                end
            end
        end
        Wait(sleep)
    end
end)
```

**Adaptation notes:**
- Replace `m.job_name == jobName` filter with your own access logic
- `CanAccessMarker` checks `m.metadata.minGrade` - extend for other conditions
- Add new marker types by extending `HandleMarkerInteraction` and prompt lookup

## Blip Management

```lua
local blips = {}

local function ClearBlips()
    for _, blip in ipairs(blips) do
        if DoesBlipExist(blip) then RemoveBlip(blip) end
    end
    blips = {}
end

local function CreateMarkerBlips()
    ClearBlips()
    local _, grade = GetPlayerJobData()
    for _, m in ipairs(markers) do
        if m.active and m.job_name == playerJob and CanAccessMarker(m, grade) then
            if m.metadata and m.metadata.showBlip == false then goto continue end
            local cfg = Config.Markers.Blips[m.type]
            if cfg then
                local blip = AddBlipForCoord(m.x, m.y, m.z)
                SetBlipSprite(blip, cfg.sprite)
                SetBlipColour(blip, cfg.color)
                SetBlipScale(blip, cfg.scale)
                SetBlipAsShortRange(blip, true)
                BeginTextCommandSetBlipName('STRING')
                AddTextComponentSubstringPlayerName(m.label)
                EndTextCommandSetBlipName(blip)
                blips[#blips + 1] = blip
            end
            ::continue::
        end
    end
end
```

**Key:** Always clear before recreate. Use `goto continue` for skip conditions inside loops.

## Interaction Router

Type-based dispatch. Extend with new `elseif` branches per marker type:

```lua
local function HandleMarkerInteraction(m)
    if m.type == 'bossmenu' then
        TriggerEvent('nb-resource:client:openBossMenu', m)
    elseif m.type == 'garage' then
        if IsPedInAnyVehicle(PlayerPedId(), false) then
            Bridge.StoreVehicle(garageId, garageType, m.job_name)
        else
            Bridge.OpenGarage(garageId, garageType, m.job_name, coords)
        end
    elseif m.type == 'stash' then
        TriggerServerEvent('nb-resource:server:openStash', stashId, m.label, m.job_name)
    end
end
```

## NUI Callback Patterns

### Lightweight Pass-Through

Client does no validation - just relays to server:

```lua
RegisterNUICallback('depositMoney', function(data, cb)
    TriggerServerEvent('nb-resource:server:depositMoney', data.jobName, data.amount)
    cb('ok')
end)
```

### Stateful Menu Management

Prevent duplicate opens with a boolean flag:

```lua
local isMenuOpen = false

RegisterNetEvent('nb-resource:client:openMenu', function(data)
    if isMenuOpen then return end
    isMenuOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({ action = 'openMenu', data = data })
end)

RegisterNUICallback('closeMenu', function(_, cb)
    isMenuOpen = false
    SetNuiFocus(false, false)
    cb('ok')
end)
```

## Help Text Helper

Wraps GTA native sequence:

```lua
local function ShowHelpText(text)
    BeginTextCommandDisplayHelp('STRING')
    AddTextComponentSubstringPlayerName(text)
    EndTextCommandDisplayHelp(0, false, true, -1)
end
```

## Resource Init + Player Load

Request data on both resource start and player load:

```lua
AddEventHandler('onResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        TriggerServerEvent('nb-resource:server:requestData')
    end
end)

Bridge.OnPlayerLoaded(function()
    TriggerServerEvent('nb-resource:server:requestData')
end)
```
