<template>
    <v-container fluid class="px-5">
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="columns" :items="rows" class="elevation-0" disable-sort>
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Inventory</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark class="mb-2" @click="onClickAddInventory()">
                                <v-icon left>mdi-plus</v-icon>
                                Add Inventory
                            </v-btn>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.no="{ item, index }">
                        {{ index + 1 }}
                    </template>
                    <template v-slot:item.environments="{ item }">
                        {{ item.environments }}
                        <!-- <v-treeview :items="item"></v-treeview> -->
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <div class="d-flex justify-between">
                            <v-icon class="mx-1" @click="onClickEditRow(item)">mdi-pencil</v-icon>
                            <v-icon class="mx-1" @click="onClickDetailRow(item)">mdi-eye</v-icon>
                            <v-icon class="mx-1" @click="onClickDeleteRow(item)">mdi-delete</v-icon>
                        </div>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>

        <v-dialog v-model="dialogDetail" max-width="55vw">
            <v-card>
                <v-card-title class="white--text primary text-h6 py-2">
                    Playbook Detail
                    <v-spacer></v-spacer>
                    <v-btn icon @click="onCloseDialogDetail()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text class="mt-4" style="height: 500px; overflow-y: auto;">
                    <pre type="json">{{ selectedRow.environments }}</pre>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" text @click="onCloseDialogDetail()">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="dialogDelete" persistent max-width="330">
            <v-card>
                <v-card-title class="text-h5">
                    Confirmation
                </v-card-title>
                <v-card-text class="py-5">Are you sure to delete this inventory?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" text @click="onCloseDeleteRow()">
                        No, cancel
                    </v-btn>
                    <v-btn color="red white--text" @click="deleteInventory()">
                        Yes, delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>

</template>

<script>
export default {
    data() {
        return {
            dialogDelete: false,
            dialogDetail: false,
            selectedRow: {},
            columns: [
                { text: 'No.', value: 'no' },
                { text: 'Name', value: 'inventory_name' },
                { text: 'Inventory', value: 'environments' },
                { text: 'Actions', value: 'actions' },
            ],
            rows: []
        }
    },
    mounted() {
        this.retrieveInventory();
    },
    methods: {
        retrieveInventory() {
            this.axios.get('/inventories')
                .then(response => {
                    this.rows = response.data;
                })
                .catch(error => {
                    console.log(error);
                    this.$eventBus.$emit('toast', 'error', 'Failed to fetch inventory data');
                });
        },
        onClickAddInventory() {
            this.$router.push({ name: 'create-inventory' })
        },
        onClickDetailRow(item) {
            this.selectedRow = item;
            this.dialogDetail = true
        },
        onClickEditRow(item) {
            this.selectedRow = item;
            this.$router.push({ name: 'update-inventory', params: { id: item._id } });
        },
        onCloseDialogDetail() {
            this.selectedRow = {}
            this.dialogDetail = false
        },
        onClickDeleteRow(item){
            this.selectedRow = item;
            this.dialogDelete = true;
        },
        onCloseDeleteRow(){
            this.selectedRow = {}
            this.dialogDelete = false;
        },
        deleteInventory(){
            this.axios.delete(`/inventories/${this.selectedRow._id}`)
                .then(response => {
                    this.$eventBus.$emit('toast', 'success', 'Successfully deleted inventory');
                    this.retrieveInventory();
                    this.onCloseDeleteRow();
                })
                .catch(error => {
                    this.$eventBus.$emit('toast', 'error', 'Failed to delete inventory');
                    console.log(error);
                });
        }

    }
};
</script>