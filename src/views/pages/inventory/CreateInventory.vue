<template>
    <v-container fluid class="px-5 mt-5">

        <v-form ref="formInventory" v-model="formInventory" lazy-validation>
           

            <v-text-field v-model="form.inventory_name" label="Inventory Name" outlined :rules="$rules.required"
                dense></v-text-field>

            <v-text-field v-model="form.environments.groups.group_name" label="Group Name" outlined
                :rules="$rules.required" dense></v-text-field>

            <v-text-field v-model="form.environments.environment_name" label="Environment Name" outlined :rules="$rules.required"
            dense></v-text-field>


            <v-card outlined class="mb-4">
                <v-card-title>
                    <h4>Hosts</h4>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex justify-between  mb-4 " v-for="(host, index) in form.environments.groups.hosts">
                        <v-card color="grey lighten-4" flat width="100%">
                            <v-card-title>
                                <h5>Host {{ form.environments.groups.hosts.length > 1 ? index + 1 : '' }}</h5>
                            </v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="host.brand" label="Brand" outlined
                                            :rules="$rules.required" hide-details dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-select :items="selectOptions.type" v-model="host.type" dense outlined :rules="$rules.required"
                                            label="Type" hide-details>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="host.series" label="Series/OS" outlined
                                            :rules="$rules.required" hide-details dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="host.hostname" label="Hostname" outlined
                                            :rules="$rules.required" hide-details dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="host.host" label="Host" outlined :rules="$rules.required"
                                            hide-details dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="host.user" label="User" outlined :rules="$rules.required"
                                            hide-details dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="host.connection" label="Connection" outlined
                                            :rules="$rules.required" hide-details dense></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="host.port" label="Port" outlined :rules="$rules.required"
                                            hide-details dense></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>


                        <v-card flat width="80px">
                            <v-btn @click="onClickDeleteHost(index)" class="mx-3 mb-3" color="red" dark>
                                <v-icon>mdi-delete</v-icon></v-btn>
                            <v-btn @click="onClickAddHost()" color="green" class="mx-3" dark
                                :disabled="index + 1 !== form.environments.groups.hosts.length">
                                <v-icon>mdi-plus</v-icon></v-btn>
                        </v-card>

                    </div>

                </v-card-text>
            </v-card>


            <div class="d-flex justify-between mb-4">
                <v-card outlined width="100%">
                    <v-card-title>
                        <h4>Variables </h4>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialogAddVariables" width="500">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="green" dark v-bind="attrs" v-on="on">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add Variable
                                </v-btn>
                            </template>

                            <v-card>
                                <v-card-title class="text-h6 py-2 grey lighten-2">
                                    Add Variable
                                </v-card-title>

                                <v-card-text class="mt-4">
                                    <v-row>
                                        <v-col cols="6" md="6">
                                            <v-text-field v-model="temporaryVariable.key" 
                                                label="Key" outlined hide-details dense></v-text-field>
                                        </v-col>
                                        <v-col cols="6" md="6">
                                            <v-text-field v-model="temporaryVariable.value" 
                                                label="Value" outlined hide-details dense></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-divider></v-divider>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="onCancleVariables()">
                                        Cancel
                                    </v-btn>
                                    <v-btn color="primary" width="80px" @click="onSaveVariables()">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </v-card-title>
                    <v-card-text>
                        <div class="d-flex justify-between"
                            v-for="(variable, index) in form.environments.variables" :key="index">
                            <v-row>
                                <v-col cols="6" md="6">
                                    <v-text-field v-model="variable.key" label="Key" outlined hide-details
                                        dense></v-text-field>
                                </v-col>
                                <v-col cols="6" md="6">
                                    <v-text-field v-model="variable.value" label="Value" outlined hide-details
                                        dense></v-text-field>
                                </v-col>
                            </v-row>
                            <div>
                                <v-btn @click="onClickDeleteVariable(index)" class="mx-3 mb-3" color="red" dark>
                                    <v-icon>mdi-delete</v-icon></v-btn>
                            </div>
                        </div>
                        <span v-if="form.environments.variables.length == 0">Click add variable to add
                            variable</span>
                    </v-card-text>
                </v-card>


            </div>



            <div class="d-flex justify-center">
                <v-btn @click="$router.go(-1)" color="primary" width="120px" class="mr-2" text dark>
                    Back
                </v-btn>
                <v-btn @click="dialogConfirmation = true" color="primary" width="120px" dark>
                    Save
                </v-btn>
            </div>
        </v-form>


        <v-dialog v-model="dialogConfirmation" persistent max-width="330">
            <v-card>
                <v-card-title class="text-h6">
                    Confirmation
                </v-card-title>
                <v-card-text class="py-5 text-center">Are you sure you want to save this inventory?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" text @click="dialogConfirmation = false">
                        No, cancel
                    </v-btn>
                    <v-btn color="primary white--text" @click="submitForm()">
                        Yes, save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>

</template>

<script>
import { serialize } from 'object-to-formdata';
export default {
    data() {
        return {
            dialogConfirmation: false,
            dialogAddVariables: false,
            temporaryVariable: {
                key: '',
                value: ''
            },
            selectOptions: {
                type: ['PC', 'Server', 'Router', 'Switch', 'Access point']
            },
            selectedEnvironment: '',
            form: {
                inventory_name: '',
                environments: {
                    environment_name: '',
                    groups: {
                        group_name: '',
                        hosts: [
                            {
                                brand: '',
                                type: '',
                                series: '',
                                hostname: '',
                                host: '',
                                user: '',
                                connection: '',
                                port: ''
                            }
                        ],
                    },
                    variables: []
                },

            },
            defaultHost: {
                brand: '',
                type: '',
                series: '',
                hostname: '',
                host: '',
                user: '',
                connection: '',
                port: ''
            },
            defaultVariable: {
                key: 'value',
            },
            formDataUser: {},
            inventoryId: null,
            formInventory: true,
        }
    },
    created() {
        this.inventoryId = this.$route.params.id;
        if (this.inventoryId) {
            this.axios.get(`/inventories/${this.inventoryId}`)
                .then(response => {
                    this.form = response;
                })
                .catch(error => {
                    console.log(error);
                    this.$eventBus.$emit('toast', 'error', 'Failed to fetch inventory data');
                });
        }
    },
    mounted() {
        this.initForm();
    },
    methods: {
        initForm() {
            // To set data form from stored data API
            // if (this.formDataUser){
            //     this.form = this.formDataUser;
            // }
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        },
        onClickDeleteHost(index) {
            this.form.environments.groups.hosts.splice(index, 1)
            if (this.form.environments.groups.hosts.length == 0) {
                this.form.environments.groups.hosts.push(this.defaultHost);
            }
        },
        onClickAddHost() {
            this.form.environments.groups.hosts.push(this.defaultHost);
            console.log(this.form.environments.groups.hosts);
        },
        onClickDeleteVariable(index) {
            this.form.environments.variables.splice(index, 1);
        },
        onCancleVariables() {
            this.temporaryVariable = {
                key: '',
                value: ''
            };
            this.dialogAddVariables = false;
        },
        onSaveVariables() {
            this.form.environments.variables.push({
                key: this.temporaryVariable.key,
                value: this.temporaryVariable.value
            })
            this.temporaryVariable = {
                key: '',
                value: ''
            };
            this.dialogAddVariables = false;

        },
        submitForm() {
            let url = '/inventories';
            console.log("Form submitted:", this.form);
            const valid = this.$refs.formInventory.validate();

            if (this.inventoryId){
                delete this.form._id;
                delete this.form.__v;
                delete this.form.createdAt;
                delete this.form.updatedAt;
                delete this.form.environments._id;
                delete this.form.environments.groups._id;
                this.form.environments.groups.hosts.forEach(host => {
                    delete host._id;
                });
                this.form.environments.variables.forEach(variable => {
                    delete variable._id;
                });
            }
            
            let formData = new FormData();
            const options = {
                indices: true,
                nullsAsUndefineds: true,
                booleansAsIntegers: false,
                allowEmptyArrays: false,
                noFilesWithArrayNotation: false,
                dotsForObjectNotation: false,
            };
            const formattedForm = { }
            formData = serialize(this.form, options);
            if (this.inventoryId) {
                this.form.environments.groups.hosts.forEach((host, index) => {
                    formData.delete(`environments.groups.hosts[${index}]._id`);
                });

                url = `/inventories/${this.inventoryId}`;
            }
            if (valid) {
                const requestMethod = this.inventoryId ? 'put' : 'post';
                this.axios[requestMethod](url, formData)
                    .then(response => {
                        console.log(response);
                        this.dialogConfirmation = false;
                        this.$eventBus.$emit('toast', 'success', 'Successfully saved inventory');
                        this.$router.push('/inventory');
                    })
                    .catch(error => {
                        this.$eventBus.$emit('toast', 'error', 'Failed to save inventory');
                        console.log(error);
                    });
            }
        }
    }
};
</script>