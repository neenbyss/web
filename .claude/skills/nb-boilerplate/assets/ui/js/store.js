// ================================================
// STATE MANAGEMENT
// Centralized reactive state using Vue.shallowReactive()
//
// Pattern: Store holds state, StoreActions mutates it.
// Components read from Store, call StoreActions methods.
//
// The toast/confirm system is reusable - copy as-is.
// Add your resource-specific state and actions below.
// ================================================

const Store = Vue.shallowReactive({
    // --- Always present (reusable) ---
    visible: false,
    loading: false,
    toasts: [],
    confirm: null,

    // --- Your resource-specific state ---
    items: [],
    selectedItem: null,
});

/**
 * Deep-clone a reactive object to plain JS.
 * Use when passing reactive data to NUI.post or storing snapshots.
 */
function toPlain(obj) {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj !== 'object') return obj;
    return JSON.parse(JSON.stringify(obj));
}

const StoreActions = {
    // ============================================
    // REUSABLE ACTIONS (copy to every resource)
    // ============================================

    /**
     * Open the UI with data from Lua
     */
    open(data) {
        Store.items = data.items || [];
        Store.visible = true;
        Store.selectedItem = null;
    },

    /**
     * Close the UI and notify Lua
     */
    close() {
        Store.visible = false;
        Store.selectedItem = null;
        NUI.post('close');
    },

    /**
     * Show a toast notification
     * @param {string} message
     * @param {'success'|'error'|'warning'|'info'} type
     */
    toast(message, type = 'success') {
        const id = Date.now();
        Store.toasts = [...Store.toasts, { id, message, type }];
        setTimeout(() => {
            Store.toasts = Store.toasts.filter(t => t.id !== id);
        }, 3000);
    },

    /**
     * Show a confirm dialog (returns Promise<boolean>)
     * @param {string} title
     * @param {string} message
     */
    showConfirm(title, message) {
        return new Promise((resolve) => {
            Store.confirm = { title, message, resolve };
        });
    },

    /**
     * Resolve the confirm dialog
     * @param {boolean} result
     */
    resolveConfirm(result) {
        if (Store.confirm) {
            Store.confirm.resolve(result);
            Store.confirm = null;
        }
    },

    /**
     * Handle a server response ({ success, message, data })
     */
    handleResponse(response) {
        if (!response) return;

        if (response.success) {
            StoreActions.toast(response.message, 'success');
        } else {
            StoreActions.toast(response.message, 'error');
            return;
        }

        const data = response.data;
        if (!data) return;

        // Update state from server response
        if (data.items) {
            Store.items = data.items;
        }
    },

    // ============================================
    // YOUR RESOURCE-SPECIFIC ACTIONS
    // ============================================

    selectItem(item) {
        Store.selectedItem = toPlain(item);
    },
};
