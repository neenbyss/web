-- ================================================
-- CLIENT MAIN
-- Primary client-side logic for this resource.
-- ================================================

local RESOURCE_NAME = GetCurrentResourceName()

-- ================================================
-- EXAMPLE: Request data from server when NUI opens
-- ================================================

-- RegisterCommand('mycommand', function()
--     TriggerServerEvent(RESOURCE_NAME .. ':server:requestData')
-- end, false)

-- ================================================
-- EXAMPLE: Receive data from server
-- ================================================

-- RegisterNetEvent(RESOURCE_NAME .. ':client:receiveData', function(data)
--     Debugger('Main', 'Received data:', #data.items, 'items')
--     SendNUIMessage({
--         action = 'open',
--         data = data,
--     })
--     SetNuiFocus(true, true)
-- end)

-- ================================================
-- EXAMPLE: NUI callback to close UI
-- ================================================

-- RegisterNUICallback('close', function(_, cb)
--     SetNuiFocus(false, false)
--     cb({ success = true })
-- end)

-- ================================================
-- EXAMPLE: Response handler from server
-- ================================================

-- RegisterNetEvent(RESOURCE_NAME .. ':client:response', function(response)
--     SendNUIMessage({
--         action = 'response',
--         data = response,
--     })
-- end)

print('[' .. RESOURCE_NAME .. '] Client loaded')
