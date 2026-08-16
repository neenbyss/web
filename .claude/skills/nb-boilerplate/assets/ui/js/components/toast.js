// ================================================
// TOAST COMPONENT (Reusable)
// Shows temporary notifications at top-right.
// DO NOT MODIFY - copy to every NB resource.
//
// Usage from JS: StoreActions.toast('Message', 'success')
// Types: 'success', 'error', 'warning', 'info'
// ================================================

const ToastContainer = {
    name: 'ToastContainer',
    setup() {
        return { store: Store };
    },
    template: `
        <div class="toast-container">
            <transition-group name="toast">
                <div
                    v-for="toast in store.toasts"
                    :key="toast.id"
                    class="toast"
                    :class="'toast-' + toast.type"
                >
                    <i :class="toastIcon(toast.type)"></i>
                    <span>{{ toast.message }}</span>
                </div>
            </transition-group>
        </div>
    `,
    methods: {
        toastIcon(type) {
            const icons = {
                success: 'icon-check-circle',
                error: 'icon-alert-circle',
                warning: 'icon-alert-triangle',
                info: 'icon-info',
            };
            return icons[type] || 'icon-info';
        },
    },
};
