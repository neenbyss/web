// ================================================
// APP INITIALIZATION
// Creates the Vue app, registers components,
// and sets up the message router.
//
// Load order: nui.js -> store.js -> components -> app.js
// ================================================

const app = Vue.createApp({
    setup() {
        return { store: Store };
    },
    methods: {
        close() {
            StoreActions.close();
        },
    },
});

// ============================================
// REGISTER COMPONENTS
// Add your components here.
// ============================================

// Reusable (always include)
app.component('toast-container', ToastContainer);
app.component('confirm-modal', ConfirmModal);

// Your components
app.component('example-list', ExampleList);

// Mount
app.mount('#app');

// ============================================
// MESSAGE ROUTER
// Routes messages from Lua (SendNUIMessage)
// to the appropriate StoreAction.
// ============================================

NUI.onMessage((data) => {
    switch (data.action) {
        case 'open':
            StoreActions.open(data.data);
            break;

        case 'response':
            StoreActions.handleResponse(data.data);
            break;

        // Add your custom actions here:
        // case 'myAction':
        //     StoreActions.myAction(data.data);
        //     break;
    }
});

// ============================================
// ESCAPE KEY HANDLER
// Always close confirm first, then UI.
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (Store.confirm) {
            StoreActions.resolveConfirm(false);
        } else if (Store.visible) {
            StoreActions.close();
        }
    }
});
