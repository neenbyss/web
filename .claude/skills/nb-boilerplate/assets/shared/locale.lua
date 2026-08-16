-- ================================================
-- LOCALE (Shared: client + server)
-- Multi-language string system.
-- Usage: Locale('key')  or  Locale('key_with_format', arg1)
--
-- Add your translations below. The Locale() function
-- at the bottom is reusable - don't modify it.
-- ================================================

---@type table<string, table<string, string>>
local Locales = {}

-- ================================================
-- ENGLISH
-- ================================================
Locales['en'] = {
    ['no_permission']  = 'You do not have permission.',
    ['invalid_data']   = 'Invalid data provided.',
    ['server_error']   = 'An internal error occurred.',
    -- Add your strings here
}

-- ================================================
-- SPANISH
-- ================================================
Locales['es'] = {
    ['no_permission']  = 'No tienes permiso.',
    ['invalid_data']   = 'Datos invalidos proporcionados.',
    ['server_error']   = 'Ocurrio un error interno.',
    -- Add your strings here
}

-- ================================================
-- LOCALE FUNCTION (do not modify)
-- ================================================

---@param key string
---@param ... any
---@return string
function Locale(key, ...)
    local lang = Config.Locale or 'en'
    local str = Locales[lang] and Locales[lang][key] or Locales['en'][key] or key
    if select('#', ...) > 0 then
        return string.format(str, ...)
    end
    return str
end
