<template>
    <v-container class="mt-5 px-5" fluid>

        <v-form ref="formPlaybook" v-model="formPlaybook" lazy-validation>
            <v-text-field v-model="form.playbook_name" label="Plabook Name" outlined :rules="$rules.required"
                dense></v-text-field>

            <small>Playbook</small>
            <v-textarea v-model="form.playbook" outlined :rules="$rules.required" dense auto-grow></v-textarea>


            <div class="d-flex justify-center">
                <v-btn @click="$router.go(-1)" color="primary" width="120px" class="mr-2" text dark>
                    Back
                </v-btn>
                <v-btn @click="dialogConfirmation = true" :disabled="!formPlaybook" class="primary" width="120px" >
                    Save
                </v-btn>
            </div>

        </v-form>

        <v-dialog v-model="dialogConfirmation" persistent max-width="330">
            <v-card>
                <v-card-title class="text-h6">
                    Confirmation
                </v-card-title>
                <v-card-text class="py-5 text-center">Are you sure you want to save this playbook?</v-card-text>
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
            form: {
                playbook_name: '',
                playbook: '',
            },
                formPlaybook: true,
                playbookId: null,
        }
    },
    created() {
        this.playbookId = this.$route.params.id;
        if (this.playbookId) {
            this.axios.get(`/playbooks/${this.playbookId}`)
                .then(response => {
                    this.form = response;
                })
                .catch(error => {
                    console.log(error);
                    this.$eventBus.$emit('toast', 'error', 'Failed to fetch playbook data');
                });
        }
    },
    mounted() {
    },
    methods: {

        submitForm() {
            // Handle form submission, e.g., send the form data to an API
            console.log("Form submitted:", this.form);
            let url = '/playbooks';
            const valid = this.$refs.formPlaybook.validate();
            let formData = new FormData();
            const options = {
                indices: true,
                nullsAsUndefineds: false,
                booleansAsIntegers: false,
                allowEmptyArrays: false,
                noFilesWithArrayNotation: false,
                dotsForObjectNotation: false,
            };
            formData = serialize(this.form, options);
            if (this.playbookId){
                formData.delete('_id');
                formData.delete('__v');
                url = `/playbooks/${this.playbookId}`;
            }
            if (valid) {
                const requestMethod = this.playbookId ? 'put' : 'post';
                this.axios[requestMethod](url, formData)
                    .then(response => {
                        console.log(response);
                        this.dialogConfirmation = false;
                        this.$eventBus.$emit('toast', 'success', 'Successfully saved playbook');

                        this.$router.push('/playbook');
                    })
                    .catch(error => {
                        this.$eventBus.$emit('toast', 'error', 'Failed to save playbook');
                        console.log(error);
                    });
            }
        }
    }
};
</script>