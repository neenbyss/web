# Config & Shared Patterns

## Hierarchical Config Structure

Organize by feature domain. Each top-level key = one feature area:

```lua
Config = {}

Config.Debug = false

Config.Markers = {
    Types = { 'bossmenu', 'garage', 'stash', 'duty', 'clothing' },
    DefaultRadius = 2.0,
    DrawDistance = 15.0,
    InteractionKey = 38, -- E key
    Blips = {
        bossmenu = { sprite = 280, color = 5, scale = 0.8 },
        garage   = { sprite = 357, color = 3, scale = 0.8 },
        stash    = { sprite = 478, color = 2, scale = 0.7 },
    },
    Marker3D = {
        type = 27,
        scale = vector3(1.0, 1.0, 0.5),
        color = { r = 93, g = 182, b = 229, a = 150 },
        bobUpAndDown = true,
        rotate = true,
    },
}

Config.Billing = {
    Enabled = true,
    UseNbBillings = 'auto',   -- true | false | 'auto'
    UseExternal = false,
    MaxAmount = 1000000,
    MoneyType = 'bank',
    Command = 'invoice',
    MyInvoicesCommand = 'myinvoices',
}
```

**Conventions:**
- Tri-state for optional dependencies: `true` (required), `false` (disabled), `'auto'` (use if available)
- `vector3()` literals for spatial configs
- Key names match marker/feature types for easy lookup (`Config.Markers.Blips[m.type]`)

## Default Template Pattern

Provide defaults for new entities:

```lua
Config.DefaultGrade = {
    grade = 0,
    name = 'recruit',
    label = 'Recruit',
    salary = 0,
}
```

Clone this when creating new jobs to guarantee minimum structure.

## Bitwise Permission Definitions

Define in shared file so both client and server can reference:

```lua
Permissions = {
    BOSS_MENU       = 1,    -- bit 0
    INVOICE_CREATE  = 2,    -- bit 1
    EMPLOYEE_INVITE = 4,    -- bit 2
    EMPLOYEE_FIRE   = 8,    -- bit 3
    EMPLOYEE_GRADE  = 16,   -- bit 4
    SOCIETY_WITHDRAW = 32,  -- bit 5
    SOCIETY_DEPOSIT  = 64,  -- bit 6
}

-- Convenience mask
Permissions.ALL = 0
for _, v in pairs(Permissions) do
    if type(v) == 'number' then
        Permissions.ALL = Permissions.ALL | v
    end
end

function HasPermission(permissions, flag)
    return (permissions & flag) ~= 0
end

function AddPermission(permissions, flag)
    return permissions | flag
end

function RemovePermission(permissions, flag)
    return permissions & ~flag
end
```

**Why bitwise:** Single integer column in DB stores all permissions. O(1) check. Scales to 32 flags per integer.

## Locale Helper

Use `Locale()` for all user-facing strings. Supports format args:

```lua
Locale('invoice_created', amount, targetName)
-- Resolves: "Invoice for $%s created for %s"
```

Define in `locales/en.lua` (or equivalent). Never hardcode user-facing text.

## Debugger Convention

```lua
-- Category first, action second, context after
Debugger('Billing', 'createInvoice | src:', src, '| amount:', amount)
Debugger('DB', 'CreateJob', name, '| framework:', Bridge.Framework)
Debugger('Markers', 'Created', #blips, 'blips for job:', playerJob)
```

Use `|` as separator for greppability. Category matches file/feature name.

## JSON Metadata in Database

Store flexible metadata as JSON string:

```lua
-- Insert
local metadataJson = metadata and json.encode(metadata) or nil
MySQL.insert.await('INSERT INTO table (..., metadata) VALUES (..., ?)', { metadataJson })

-- Read
local row = MySQL.single.await('SELECT * FROM table WHERE id = ?', { id })
if row and row.metadata then
    row.metadata = json.decode(row.metadata)
end
```

Useful for extensible fields without schema migrations (marker metadata, grade config, etc.).

## Upsert Pattern (MySQL)

```lua
MySQL.insert.await([[
    INSERT INTO nb_society_money (job_name, amount)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE amount = amount + VALUES(amount)
]], { jobName, amount })
```

Avoids select-then-insert/update race conditions.
