// ================================================
// EXAMPLE LIST COMPONENT
// Replace this with your actual components.
// Shows how to use Store, StoreActions, and NUI.post.
// ================================================

const ExampleList = {
    name: 'ExampleList',
    setup() {
        return { store: Store };
    },
    computed: {
        items() {
            return this.store.items || [];
        },
    },
    methods: {
        selectItem(item) {
            StoreActions.selectItem(item);
            StoreActions.toast('Selected: ' + item.name, 'info');
        },

        async deleteItem(item) {
            const ok = await StoreActions.showConfirm(
                'Delete Item',
                'Are you sure you want to delete "' + item.name + '"?'
            );
            if (!ok) return;

            // Send to Lua
            NUI.post('deleteItem', { id: item.id });
        },

        createItem() {
            NUI.post('createItem', { name: 'New Item', label: 'New' });
        },
    },
    template: `
        <div class="example-list">
            <div class="list-header">
                <h3>Items</h3>
                <button class="btn btn-primary btn-sm" @click="createItem">
                    <i class="icon-plus"></i>
                    Add
                </button>
            </div>

            <div class="list-empty" v-if="items.length === 0">
                <i class="icon-inbox"></i>
                <p>No items yet. Click "Add" to create one.</p>
            </div>

            <div class="list-items" v-else>
                <div
                    v-for="item in items"
                    :key="item.id"
                    class="list-item"
                    :class="{ active: store.selectedItem && store.selectedItem.id === item.id }"
                    @click="selectItem(item)"
                >
                    <div class="list-item-info">
                        <span class="list-item-name">{{ item.name }}</span>
                        <span class="list-item-label">{{ item.label }}</span>
                    </div>
                    <button class="btn btn-ghost btn-xs" @click.stop="deleteItem(item)">
                        <i class="icon-trash-2"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
};
