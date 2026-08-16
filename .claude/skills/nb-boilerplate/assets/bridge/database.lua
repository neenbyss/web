-- ================================================
-- DATABASE BRIDGE (Server only)
-- All SQL queries for this resource.
--
-- THIS FILE IS ALWAYS SCRIPT-SPECIFIC.
-- Write your queries here. Never put SQL in server/*.lua
--
-- Rules:
--   1. Always use parameterized queries (?)
--   2. Use TRIM() for plate comparisons
--   3. Return clean Lua tables, not raw DB rows
--   4. Use MySQL.query.await / MySQL.single.await /
--      MySQL.insert.await / MySQL.update.await (oxmysql)
-- ================================================

if not IsDuplicityVersion() then return end

Bridge = Bridge or {}
Bridge.DB = {}

-- ================================================
-- EXAMPLE: Replace with your actual queries
-- ================================================

-- function Bridge.DB.GetAll()
--     local rows = MySQL.query.await('SELECT * FROM my_table ORDER BY id ASC')
--     local result = {}
--     for _, row in ipairs(rows or {}) do
--         result[#result + 1] = {
--             id = row.id,
--             name = row.name,
--             label = row.label,
--         }
--     end
--     return result
-- end

-- function Bridge.DB.GetById(id)
--     return MySQL.single.await('SELECT * FROM my_table WHERE id = ?', { id })
-- end

-- function Bridge.DB.Create(name, label)
--     return MySQL.insert.await(
--         'INSERT INTO my_table (name, label) VALUES (?, ?)',
--         { name, label }
--     )
-- end

-- function Bridge.DB.Update(id, name, label)
--     MySQL.update.await(
--         'UPDATE my_table SET name = ?, label = ? WHERE id = ?',
--         { name, label, id }
--     )
--     return true
-- end

-- function Bridge.DB.Delete(id)
--     return MySQL.update.await('DELETE FROM my_table WHERE id = ?', { id })
-- end
