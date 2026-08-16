# NUI Patterns (Vue 3)

## Tech Stack

- Vue 3 CDN (no build tools)
- Lucide Icons (font)
- Inter + JetBrains Mono (Google Fonts)
- No npm, no bundler - plain JS files

## Script Load Order

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="js/nui.js"></script>         <!-- Lua<->JS bridge -->
<script src="js/store.js"></script>       <!-- State management -->
<script src="js/components/toast.js"></script>
<script src="js/components/confirm-modal.js"></script>
<script src="js/components/my-component.js"></script>  <!-- Your components -->
<script src="js/app.js"></script>         <!-- Vue init (ALWAYS LAST) -->
```

## NUI Bridge (nui.js) - DO NOT MODIFY

```javascript
// Send to Lua (triggers RegisterNUICallback)
NUI.post('eventName', { key: 'value' });

// Listen from Lua (receives SendNUIMessage)
NUI.onMessage((data) => { /* data.action, data.data */ });

// CRITICAL: Strip Vue reactivity before sending
NUI.post('save', deepToRaw(reactiveObject));
```

`deepToRaw()` is defined in `nui.js`. Always use it before `NUI.post()`.

## Store Pattern (store.js)

```javascript
// State: Vue.shallowReactive
const Store = Vue.shallowReactive({
    visible: false,       // UI visibility (always present)
    loading: false,       // Loading state (always present)
    toasts: [],           // Toast queue (always present)
    confirm: null,        // Confirm dialog (always present)
    // Resource-specific state:
    items: [],
    selectedItem: null,
});

// Actions: plain object with methods
const StoreActions = {
    open(data) {
        Store.items = data.items || [];
        Store.visible = true;
    },
    close() {
        Store.visible = false;
        NUI.post('close');
    },
    toast(message, type = 'success') { /* auto-dismiss 3s */ },
    showConfirm(title, message) { /* returns Promise<boolean> */ },
    resolveConfirm(result) { /* resolves the promise */ },
    handleResponse(response) { /* { success, message, data } */ },
};
```

**`toPlain(obj)`** - Deep-clone reactive object to plain JS. Use for snapshots.

## Component Structure

```javascript
const MyComponent = {
    name: 'MyComponent',
    setup() {
        return { store: Store };  // Access global state
    },
    data() {
        return { form: {}, loading: false };  // Local state
    },
    computed: {
        filteredItems() {
            return this.store.items.filter(i => i.active);
        }
    },
    methods: {
        async save() {
            NUI.post('save', deepToRaw(this.form));
        },
        async deleteItem(item) {
            const ok = await StoreActions.showConfirm('Delete', 'Are you sure?');
            if (!ok) return;
            NUI.post('deleteItem', { id: item.id });
        },
    },
    template: `
        <div class="my-component">
            <!-- HTML here -->
        </div>
    `
};
```

## Registering Components (app.js)

```javascript
const app = Vue.createApp({
    setup() { return { store: Store }; },
    methods: { close() { StoreActions.close(); } },
});

// Always include these reusable components
app.component('toast-container', ToastContainer);
app.component('confirm-modal', ConfirmModal);

// Your components
app.component('my-component', MyComponent);

app.mount('#app');
```

## Message Router (app.js)

```javascript
NUI.onMessage((data) => {
    switch (data.action) {
        case 'open':
            StoreActions.open(data.data);
            break;
        case 'response':
            StoreActions.handleResponse(data.data);
            break;
        // Add custom actions here
    }
});

// Escape key: close confirm first, then UI
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (Store.confirm) StoreActions.resolveConfirm(false);
        else if (Store.visible) StoreActions.close();
    }
});
```

## Reusable Components (DO NOT MODIFY)

**Toast**: `StoreActions.toast('Message', 'success|error|warning|info')` - Auto-dismiss 3s.

**Confirm Modal**: `const ok = await StoreActions.showConfirm('Title', 'Question?')` - Returns boolean.

Both must always be present in `index.html`:
```html
<toast-container></toast-container>
<confirm-modal></confirm-modal>
```

## HTML Shell Pattern

```html
<div id="app" v-cloak>
    <transition name="fade">
        <div class="app-shell" v-if="store.visible">
            <!-- Your layout here -->
        </div>
    </transition>
    <toast-container></toast-container>
    <confirm-modal></confirm-modal>
</div>
```

## Key Rules

1. Always use `deepToRaw()` before `NUI.post()`
2. Use `<teleport to="body">` for modals
3. Use `<transition>` for enter/leave animations
4. Confirm destructive actions with `StoreActions.showConfirm()`
5. Components read `Store`, call `StoreActions` methods - never mutate Store directly
6. `v-cloak` on `#app` prevents flash of uncompiled template
