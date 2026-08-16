fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Neenbyss Studios'
description 'NB Resource Boilerplate - Rename and build your script'
version '1.0.0'

dependencies {
    'oxmysql',
    'nb-bridge',
}

shared_scripts {
    'shared/config.lua',
    'shared/debugger.lua',
    'shared/locale.lua',
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'bridge/database.lua',
    'server/main.lua',
}

-- Uncomment if your script has a NUI
-- ui_page 'ui/index.html'
--
-- files {
--     'ui/index.html',
--     'ui/css/style.css',
--     'ui/js/*.js',
--     'ui/js/components/*.js',
--     'ui/img/*.*',
-- }

-- ================================================
-- ESCROW CONFIG (Tebex)
-- Files listed here are OPEN SOURCE (not encrypted).
-- Everything else is CLOSED SOURCE (encrypted).
--
-- RULE: bridges + config + UI = open (customizable)
--       client logic + server logic + database = closed (business value)
-- ================================================
escrow_ignore {
    -- shared (config + utilities, users customize these)
    'shared/config.lua',
    'shared/debugger.lua',
    'shared/locale.lua',

    -- bridge (script-specific queries)
    'bridge/database.lua',

    -- ui (open for styling and layout changes)
    -- 'ui/**/*',
}
