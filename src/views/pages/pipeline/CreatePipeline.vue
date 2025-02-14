<template>
    <v-container class="mt-5 px-5" fluid>
        <v-card flat outlined>
            <v-card-text style="padding-inline: 30px;">
                <h4 class="text-h5 font-weight-bold blue--text text--darken-3 mb-5">Pipeline</h4>
                <v-form ref="formInventory" v-model="formInventoryValid" lazy-validation>

                    <v-row class="d-flex justify-between">
                        <template v-for="(pipe, index) in form.pipeline">
                            <v-col cols="12" md="5" class="px-2">
                                <label for="">Inventory</label>
                                <v-select :items="listInventory" v-model="pipe.inventory" dense outlined
                                    :loading="loading.inventory" item-text="inventory_name" item-value="_id"
                                    :rules="[v => !!v || 'Inventory is required']"></v-select>
                            </v-col>
                            <v-col cols="12" md="5" class="px-2">
                                <label for="">Playbook</label>
                                <v-select :items="listPlaybook" v-model="pipe.playbook" dense outlined
                                    :loading="loading.playbook" item-text="playbook_name" item-value="_id"
                                    :rules="[v => !!v || 'Playbook is required']"></v-select>
                            </v-col>
                            <v-col cols="12" md="2" class="px-2">
                                <div class="d-flex justify-end mt-5">
                                    <v-btn class="mr-2" color="error" dark
                                        @click="onClickRemovePipeline(index)"><v-icon>mdi-minus</v-icon></v-btn>
                                    <v-btn class="mr-2" color="green" dark
                                        @click="onClickAddPipeline()"><v-icon>mdi-plus</v-icon></v-btn>
                                </div>
                            </v-col>
                        </template>

                        <!-- <v-col cols="12" md="6">
                            <label for="">Version</label>
                            <v-text-field v-model="form.version" dense outlined :rules="$rules.required"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <label for="">Tag</label>
                            <v-text-field v-model="form.tag" dense outlined :rules="$rules.required"></v-text-field>
                        </v-col> -->
                        <!-- <v-col cols="12" md="12">
                            <label for="">Description</label>
                            <v-textarea v-model="form.description" dense outlined auto-grow :rules="$rules.required"> </v-textarea>
                        </v-col> -->
                    </v-row>
                </v-form>
            </v-card-text>
            <v-spacer></v-spacer>

        </v-card>
        <v-card-actions style="padding: 30px;">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onCLickRunJob()" :disabled="!formInventoryValid"
                style="border-radius:  7px 0  0  7px;">
                {{ typeJob }}
            </v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on" style="border-radius: 0 7px   7px 0  ">
                        <v-icon class="white--text">mdi-chevron-right</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item @click="onCLickTypeJob('Execute now')">
                        <v-list-item-title>Execute now</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="onCLickTypeJob('Run once')">
                        <v-list-item-title>Execute once</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="onCLickTypeJob('Recurrent')">
                        <v-list-item-title>Recurrent</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-actions>

        <!-- Dialog Run Once -->
        <v-dialog v-model="dialogExecuteNow" width="500">
            <v-card>
                <v-card-title class="text-h5 py-2 grey lighten-2">
                    Confirmation {{ typeJob.toLowerCase() }}
                </v-card-title>

                <v-card-text style="min-height: 100px;display: flex;justify-content: center;align-items: center;">
                    <v-row class="mt-4 ml-4">
                        Are you sure you want to this pipeline {{ typeJob.toLowerCase() }}?
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialogExecuteNow = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" @click="submitForm" :loading="loading.submit">
                        {{ typeJob }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <!-- Dialog Run Once -->
        <v-dialog v-model="dialogRunOnce" width="500">
            <v-card>
                <v-card-title class="text-h5 py-2 grey lighten-2">
                    Confirmation {{ typeJob.toLowerCase() }}
                </v-card-title>

                <v-card-text>
                    <v-row class="mt-4">
                        <v-col cols="12" sm="12" md="6">
                            <v-menu ref="menuRunOnce" v-model="menuRunOnce" :close-on-content-click="false"
                                transition="scale-transition" offset-y max-width="290px" min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="dateFormatted" label="Date" hint="DD-MM-YYYY format"
                                        persistent-hint prepend-icon="mdi-calendar" v-bind="attrs"
                                        @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title @input="menuRunOnce = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                            <v-text-field v-model="time" label="Time" value="12:30:00" type="time"
                                suffix="WIB"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialogRunOnce = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" @click="submitForm" :loading="loading.submit">
                        {{ typeJob }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Dialog Recurrent -->
        <v-dialog v-model="dialogRecurrent" width="800">
            <v-card>
                <v-card-title class="text-h5 py-2 grey lighten-2">
                    Confirmation {{ typeJob.toLowerCase() }}
                </v-card-title>

                <v-card-text>
                    <v-row justify="center" class="mt-4">
                        <v-col cols="12" md="12" class="text-left">
                            <!-- <h3>{{ cron || 'Enter a valid cron expression' }}</h3> -->
                            <p><strong>Next Execution Times:</strong></p>
                            <div class="text-left">
                           <ol>
                                <li v-for="(time, index) in nextExecutions" :key="index">
                                    {{ time }}
                                </li>
                            </ol>
                        </div>
                        </v-col>
                    </v-row>
                    <v-row justify="center" class="mt-4">
                        <v-col cols="12" md="12">
                            <v-card class="py-5 px-6">
                                <v-form ref="form" v-model="formCronvalid">
                                    <v-row align="center">
                                        <v-col>
                                            <small>minute</small>
                                            <v-text-field v-model="cron.minute" outlined
                                                :rules="[cronRules.minute]"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <small>hour</small>
                                            <v-text-field label="" v-model="cron.hour" outlined
                                                :rules="[cronRules.hour]"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <small>day (month)</small>
                                            <v-text-field label="" v-model="cron.dayOfMonth" outlined
                                                :rules="[cronRules.dayOfMonth]"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <small>month</small>
                                            <v-text-field v-model="cron.month" outlined
                                                :rules="[cronRules.month]"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <small>day (week)</small>
                                            <v-text-field v-model="cron.dayOfWeek" outlined
                                                :rules="[cronRules.dayOfWeek]"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row justify="center" class="mt-4">
                        <v-col cols="12" md="12">
                            <v-card flat class="grey lighten-4">
                                <v-card-title>
                                    Documentation
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col>
                                            <table>
                                                <tr>
                                                    <td>*</td>
                                                    <td>— any value</td>
                                                </tr>
                                                <tr>
                                                    <td>,</td>
                                                    <td>— value list separator</td>
                                                </tr>
                                                <tr>
                                                    <td>-</td>
                                                    <td>— range of values</td>
                                                </tr>
                                                <tr>
                                                    <td>/</td>
                                                    <td>— step values</td>
                                                </tr>
                                                <tr>
                                                    <td>@yearly</td>
                                                    <td>— (non-standard)</td>
                                                </tr>
                                                <tr>
                                                    <td>@annually</td>
                                                    <td>— (non-standard)</td>
                                                </tr>
                                            </table>
                                        </v-col>
                                        <v-col>
                                            <table>
                                                <tr>
                                                    <td>@monthly</td>
                                                    <td>— (non-standard)</td>
                                                </tr>
                                                <tr>
                                                    <td>@weekly</td>
                                                    <td>— (non-standard)</td>
                                                </tr>
                                                <tr>
                                                    <td>@daily</td>
                                                    <td>— (non-standard)</td>
                                                </tr>
                                                <tr>
                                                    <td>@hourly</td>
                                                    <td>— (non-standard)</td>
                                                </tr>
                                                <tr>
                                                    <td>@reboot</td>
                                                    <td>— (non-standard)</td>
                                                </tr>
                                            </table>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialogRecurrent = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" @click="submitForm" :loading="loading.submit">
                        {{ typeJob }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>

</template>

<script>
import { serialize } from 'object-to-formdata';
import parser from 'cron-parser';
export default {
    data() {
        return {
            nextExecutions: [],
            formInventoryValid: false,
            listInventory: [],
            listPlaybook: [],
            typeJob: 'Execute now',
            form: {
                pipeline: [
                    {
                        inventory: '',
                        playbook: '',
                    }
                ],
                // description: ''
            },
            dialogExecuteNow: false,
            dialogRunOnce: false,
            dialogRecurrent: false,
            date: new Date().toISOString().substr(0, 10),
            time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            menuRunOnce: false,
            dateFormatted: new Date().toISOString().substr(0, 10).split('-').reverse().join('-'),
            cron: {
                minute: "0",
                hour: "1",
                dayOfMonth: "*",
                month: "*",
                dayOfWeek: "*",
            }, cronRules: {
                minute: (value) =>
                    /^(\*|([0-5]?\d)(,\d+)*(-[0-5]?\d)*)$/.test(value) ||
                    "Invalid minute (use 0-59, *, -, or ,)",
                hour: (value) =>
                    /^(\*|([0-1]?\d|2[0-3])([-,]\d+)*(-[0-2]?\d)*)$/.test(value) ||
                    "Invalid hour (use 0-23, *, -, or ,)",
                dayOfMonth: (value) =>
                    /^(\*|([1-9]|[12]\d|3[01])([-,]\d+)*(-[1-9]|[12]\d|3[01])*)$/.test(
                        value
                    ) || "Invalid day (use 1-31, *, -, or ,)",
                month: (value) =>
                    /^(\*|([1-9]|1[0-2])([-,]\d+)*(-[1-9]|1[0-2])*)$/.test(value) ||
                    "Invalid month (use 1-12, *, -, or ,)",
                dayOfWeek: (value) =>
                    /^(\*|([0-7])([-,]\d+)*(-[0-7])*)$/.test(value) ||
                    "Invalid day (use 0-7, *, -, or ,)",
            },
            formCronvalid: false,
            loading: {
                inventory: false,
                playbook: false,
                submit: false,
            }
        }
    },
    mounted() {
        this.$refs.formInventory.validate();
        this.retrieveMasterInventory();
        this.retrieveMasterPlaybook();
    },
    computed: {
        computedDateFormatted() {
            return this.formatDate(this.date)
        },
    },

    watch: {
        date(val) {
            this.dateFormatted = this.formatDate(this.date)
        },
        cron: {
            handler(newVal) {
                this.getNextCronRunDate(newVal);
            },
            deep: true
        }
    },
    methods: {
        retrieveMasterInventory() {
            this.loading.inventory = true;
            this.axios.get('/inventories')
                .then(response => {
                    this.listInventory = response.data;
                    this.loading.inventory = false;
                })
                .catch(error => {
                    console.log(error);
                    this.loading.inventory = false;
                });
        },
        retrieveMasterPlaybook() {
            this.loading.playbook = true;
            this.axios.get('/playbooks')
                .then(response => {
                    this.listPlaybook = response.data;
                    this.loading.playbook = false;
                })
                .catch(error => {
                    console.log(error);
                    this.loading.playbook = false;
                });
        },
        formatDate(date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}-${month}-${year}`
        },
        parseDate(date) {
            if (!date) return null

            const [day, month, year] = date.split('-')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        onClickRemovePipeline(index) {
            this.form.pipeline.splice(index, 1);
            if (this.form.pipeline.length === 0) {
                this.form.pipeline.push({
                    inventory: '',
                    playbook: ''
                });
            }
        },
        onClickAddPipeline() {
            this.form.pipeline.push({
                inventory: '',
                playbook: ''
            });
        },
        onCLickTypeJob(type) {
            this.typeJob = type;
        },
        onCLickRunJob() {
            switch (this.typeJob) {
                case 'Execute now':
                    this.dialogExecuteNow = true;
                    break;
                case 'Run once':
                    this.dialogRunOnce = true;
                    break;
                case 'Recurrent':
                    this.dialogRecurrent = true;
                    break;

                default:
                    break;
            }
        },
        submitForm() {
            this.loading.submit = true;
            let formData = new FormData();
            const valid = this.$refs.formInventory.validate();
            const options = {
                indices: true,
                nullsAsUndefineds: false,
                booleansAsIntegers: false,
                allowEmptyArrays: false,
                noFilesWithArrayNotation: false,
                dotsForObjectNotation: false,
            };
            this.form['type'] = this.typeJob;
            if (this.typeJob == 'Run once' || this.typeJob == 'Execute now') {
                this.form['datetime'] = this.date + 'T' + this.time + 'Z';
            } else if (this.typeJob == 'Recurrent') {
                this.form['cron'] = this.cron;
                this.form['datetime'] = this.getNextCronRunDate(this.cron)

            }
            formData = serialize(this.form, options);
            if (valid) {
                this.axios.post('/pipelines', formData)
                    .then(response => {
                        console.log(response);
                        this.loading.submit = false;
                        this.dialogRunOnce = false;
                        this.dialogRecurrent = false;
                        this.dialogExecuteNow = false;
                        this.$router.push('/pipeline');
                    })
                    .catch(error => {
                        console.log(error);
                        this.loading.submit = false;
                    });
            } else {
                this.loading.submit = false;
            }

        },
        getNextCronRunDate(cron) {
            try {
                const interval = parser.parseExpression(`${cron.minute} ${cron.hour} ${cron.dayOfMonth} ${cron.month} ${cron.dayOfWeek}`);
                console.log(interval);

                let executions = [];
                for (let i = 0; i < 5; i++) {
                    executions.push(interval.next().toString());
                }
                this.nextExecutions = executions;
                return this.nextExecutions[0];
            } catch (error) {
                console.error("Invalid cron expression:", error);
            }
        }
    }
};
</script>