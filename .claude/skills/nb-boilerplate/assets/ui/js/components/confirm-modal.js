// ================================================
// CONFIRM MODAL COMPONENT (Reusable)
// Shows a yes/no dialog before destructive actions.
// DO NOT MODIFY - copy to every NB resource.
//
// Usage from JS:
//   const ok = await StoreActions.showConfirm('Title', 'Are you sure?');
//   if (!ok) return;
// ================================================

const ConfirmModal = {
    name: 'ConfirmModal',
    setup() {
        return { store: Store };
    },
    template: `
        <transition name="fade">
            <div class="modal-overlay" v-if="store.confirm" @click.self="cancel">
                <div class="modal">
                    <div class="modal-header">
                        <i class="icon-alert-triangle" style="color: var(--warning)"></i>
                        <h3>{{ store.confirm.title }}</h3>
                    </div>
                    <div class="modal-body">
                        <p>{{ store.confirm.message }}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-ghost" @click="cancel">Cancel</button>
                        <button class="btn btn-danger" @click="confirm">Confirm</button>
                    </div>
                </div>
            </div>
        </transition>
    `,
    methods: {
        confirm() {
            StoreActions.resolveConfirm(true);
        },
        cancel() {
            StoreActions.resolveConfirm(false);
        },
    },
};
