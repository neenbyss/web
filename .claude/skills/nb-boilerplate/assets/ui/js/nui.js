// ================================================
// NUI BRIDGE - Lua <-> JavaScript messaging
// DO NOT MODIFY - shared across all NB resources.
//
// Usage:
//   NUI.post('eventName', { key: 'value' })  -- sends to Lua
//   NUI.onMessage((data) => { ... })          -- receives from Lua
// ================================================

const _resourceName = (() => {
    try {
        return window.invokeNative ? window.GetParentResourceName() : 'nb-boilerplate';
    } catch (_) {
        return 'nb-boilerplate';
    }
})();

/**
 * Strips Vue reactivity from objects before sending to Lua.
 * Without this, reactive objects serialize as "[object Object]".
 */
function deepToRaw(obj) {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj !== 'object') return obj;
    const raw = Vue?.toRaw ? Vue.toRaw(obj) : obj;
    if (Array.isArray(raw)) return raw.map(deepToRaw);
    const result = {};
    for (const key in raw) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
            result[key] = deepToRaw(raw[key]);
        }
    }
    return result;
}

const NUI = {
    /**
     * Send data to Lua (triggers RegisterNUICallback on client)
     * @param {string} event - Event name matching RegisterNUICallback
     * @param {object} data - Payload (auto-stripped of Vue reactivity)
     * @returns {Promise<any>} Response from Lua cb()
     */
    post(event, data = {}) {
        const payload = deepToRaw(data);
        return fetch(`https://${_resourceName}/${event}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(r => r.json()).catch(() => null);
    },

    /**
     * Listen for messages from Lua (SendNUIMessage)
     * @param {function} handler - Receives data object with { action, data }
     */
    onMessage(handler) {
        window.addEventListener('message', (e) => handler(e.data));
    },
};
