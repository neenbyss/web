-- ================================================
-- SERVER MAIN
-- Primary server-side logic for this resource.
-- ================================================

local RESOURCE_NAME = GetCurrentResourceName()

-- ================================================
-- STARTUP
-- ================================================

CreateThread(function()
    -- Load initial data from database here
    -- local items = Bridge.DB.GetAll()
    print('[' .. RESOURCE_NAME .. '] Server loaded')
end)

-- ================================================
-- EXAMPLE: Handle data request from client
-- ================================================

-- RegisterNetEvent(RESOURCE_NAME .. ':server:requestData', function()
--     local src = source
--     if not Bridge.IsAdmin(src) then return end
--
--     local data = Bridge.DB.GetAll()
--     TriggerClientEvent(RESOURCE_NAME .. ':client:receiveData', src, {
--         items = data,
--     })
-- end)

-- ================================================
-- EXAMPLE: Handle create action from client
-- ================================================

-- RegisterNetEvent(RESOURCE_NAME .. ':server:create', function(data)
--     local src = source
--     if not Bridge.IsAdmin(src) then return end
--
--     if not data or not data.name then
--         return TriggerClientEvent(RESOURCE_NAME .. ':client:response', src, {
--             success = false, message = Locale('invalid_data'),
--         })
--     end
--
--     Bridge.DB.Create(data.name, data.label)
--
--     TriggerClientEvent(RESOURCE_NAME .. ':client:response', src, {
--         success = true,
--         message = 'Created successfully.',
--         data = { items = Bridge.DB.GetAll() },
--     })
-- end)

-- ================================================
-- EXPORTS
-- Expose functions for other resources to use.
-- ================================================

-- exports('getItems', function()
--     return Bridge.DB.GetAll()
-- end)
