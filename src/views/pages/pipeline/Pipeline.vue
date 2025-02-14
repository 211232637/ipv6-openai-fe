<template>
    <v-container fluid class="px-5">
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="columns" :items="rows" class="elevation-0" disable-sort>
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Pipeline</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark class="mb-2" @click="onClickAddPipeline()">
                                <v-icon left>mdi-plus</v-icon>
                                Add Pipeline
                            </v-btn>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.pipeline="{ item }">
                        <a color="blue darken-4" @click.prevent="onClickDescription(item)">
                            {{ item.description }}<br>
                            <span class="mr-2">{{ item.tag }}</span>
                            <v-chip label x-small><v-icon x-small left>mdi-tag</v-icon> {{ item.version }}</v-chip>
                        </a>
                    </template>
                    <template v-slot:item.status="{ item }">

                        <div v-if="item.stages[item.stages.length - 1].status == 'success'">
                            <v-chip small class="ma-2 mb-0" color="green lighten-4 green--text text--darken-2"
                                text-color="white">
                                <v-avatar small left>
                                    <v-icon small color="green">mdi-check-circle</v-icon>
                                </v-avatar>
                                Success
                            </v-chip><br>
                            <v-chip x-small class="ma-2 my-0 grey--text text--darken-3" color="transparent">
                                <v-icon x-small left color="grey">mdi-timer</v-icon>
                                {{ item.duration }}
                            </v-chip><br>
                            <v-chip x-small class="ma-2 mt-0 grey--text text--darken-3" color="transparent">
                                <v-icon x-small left color="grey">mdi-calendar</v-icon>
                                {{ item.date }}
                            </v-chip>
                        </div>

                        <v-row v-else-if="item.stages[item.stages.length - 1].status == 'running'">
                            <v-col>
                                <v-chip small class="ma-2 mb-0" color="blue lighten-4 blue--text text--darken-2"
                                    text-color="white">
                                    <v-avatar small left>
                                        <v-icon small color="blue">mdi-timelapse</v-icon>
                                    </v-avatar>
                                    Running
                                </v-chip><br>
                                <v-chip x-small class="ma-2 my-0 grey--text text--darken-3" color="transparent">
                                    <v-icon x-small left color="grey">mdi-timer</v-icon>
                                    {{ item.duration }}
                                </v-chip><br>
                                <v-chip x-small class="ma-2 mt-0 grey--text text--darken-3" color="transparent">
                                    <v-icon x-small left color="grey">mdi-calendar</v-icon>
                                    {{ item.date }}
                                </v-chip>
                            </v-col>
                        </v-row>

                        <div v-else-if="item.stages[item.stages.length - 1].status == 'pending'">
                            <v-chip small class="ma-2 mb-0" color="orange lighten-4 orange--text text--darken-4"
                                text-color="white">
                                <v-avatar small left>
                                    <v-icon small color="orange darken-3">mdi-clock-time-nine</v-icon>
                                </v-avatar>
                                Pending
                            </v-chip><br>
                            <v-chip x-small class="ma-2 my-0 grey--text text--darken-3" color="transparent">
                                <v-icon x-small left color="grey">mdi-timer</v-icon>
                                {{ item.duration }}
                            </v-chip><br>
                            <v-chip x-small class="ma-2 mt-0 grey--text text--darken-3" color="transparent">
                                <v-icon x-small left color="grey">mdi-calendar</v-icon>
                                {{ item.date }}
                            </v-chip>
                        </div>

                        <div v-else-if="item.stages[item.stages.length - 1].status == 'failed'">
                            <v-chip small class="ma-2 mb-0 red--text text--darken-4" color="rgba(174, 24, 0, 0.2)"
                                text-color="white">
                                <v-avatar small left>
                                    <v-icon small color="#ae1800">mdi-close-circle</v-icon>
                                </v-avatar>
                                Failed
                            </v-chip><br>
                            <v-chip x-small class="ma-2 my-0 grey--text text--darken-3" color="transparent">
                                <v-icon x-small left color="grey">mdi-timer</v-icon>
                                {{ item.duration }}
                            </v-chip><br>
                            <v-chip x-small class="ma-2 mt-0 grey--text text--darken-3" color="transparent">
                                <v-icon x-small left color="grey">mdi-calendar</v-icon>
                                {{ item.date }}
                            </v-chip>
                        </div>

                        <div v-else-if="item.stages[item.stages.length - 1].status == 'stopped'">
                            <v-chip small class="ma-2 mb-0" color="grey lighten-3 grey--text text--darken-2"
                                text-color="white">
                                <v-avatar small left>
                                    <v-icon small color="grey">mdi-circle-off-outline</v-icon>
                                </v-avatar>
                                Terminated
                            </v-chip><br>
                            <v-chip x-small class="ma-2 my-0 grey--text text--darken-3" color="transparent">
                                <v-icon x-small left color="grey">mdi-timer</v-icon>
                                {{ item.duration }}
                            </v-chip><br>
                            <v-chip x-small class="ma-2 mt-0 grey--text text--darken-3" color="transparent">
                                <v-icon x-small left color="grey">mdi-calendar</v-icon>
                                {{ item.date }}
                            </v-chip>
                        </div>

                    </template>
                    <template v-slot:item.stages="{ item }">
                        <Pipeline :pipelineStages="item.stages" />
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <div class="d-flex justify-end" v-if="item.stages[item.stages.length - 1].status == 'running'">
                            <v-btn small text class="error" dark @click="onClickDialogTerminate(item)"><v-icon small>mdi-circle-off-outline</v-icon></v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>

        <v-dialog v-model="dialogConfirmation" persistent max-width="330">
            <v-card>
                <v-card-title class="text-h5">
                    Confirmation
                </v-card-title>
                <v-card-text class="py-5">Are you sure to terminate this pipeline?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" text @click="dialogConfirmation = false">
                        No, cancel
                    </v-btn>
                    <v-btn color="red white--text" @click="onTerminate()">
                        Yes, terminate
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDetail" max-width="55vw">
            <v-card>
                <v-card-title class="white--text primary text-h6 py-2">
                    Pipeline Detail
                    <v-spacer></v-spacer>
                    <v-btn icon @click="onCloseDialogDetail()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text class="mt-4" style="height: 500px; overflow-y: auto;">
                    <table>
                        <tr>
                            <td class="font-weight-bold">Description</td>
                            <td>&ensp;:&emsp;</td>
                            <td>{{ selectedRow.description }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Status</td>
                            <td>&ensp;:&emsp;</td>
                            <td>{{ selectedRow.status }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Type</td>
                            <td>&ensp;:&emsp;</td>
                            <td>{{ selectedRow.type }}</td>
                        </tr>
                        <tr v-if="selectedRow.cron">
                            <td class="font-weight-bold" style="vertical-align: top;">Cron</td>
                            <td style="vertical-align: top;">&ensp;:&emsp;</td>
                            <td>
                                <ol>
                                    <li>Minute: {{ selectedRow.cron.minute }}</li>
                                    <li>Hour: {{ selectedRow.cron.hour }}</li>
                                    <li>Day of Month: {{ selectedRow.cron.dayOfMonth }}</li>
                                    <li>Month: {{ selectedRow.cron.month }}</li>
                                    <li>Day of Week: {{ selectedRow.cron.dayOfWeek }}</li>
                                </ol>
                            </td>
                        </tr>
                        <tr  v-if="selectedRow.cron">
                            <td class="font-weight-bold" style="vertical-align: top;"> Next Run</td>
                            <td style="vertical-align: top;">&ensp;:&emsp;</td>
                            <td>
                                <ol>
                                    <li v-for="date in getNextCronRunDate(selectedRow.cron)">
                                        {{ new Date(date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
                                    </li>
                                </ol>
                            </td>
                        </tr>
                        <tr v-if="selectedRow.datetime">
                            <td class="font-weight-bold">Datetime</td>
                            <td>&ensp;:&emsp;</td>
                            <td>{{ new Date(selectedRow.datetime).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Tag</td>
                            <td>&ensp;:&emsp;</td>
                            <td>{{ selectedRow.tag }}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold">Version</td>
                            <td>&ensp;:&emsp;</td>
                            <td>{{ selectedRow.version }}</td>
                        </tr>
                    </table>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" text @click="onCloseDialogDetail()">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>

</template>

<script>
import Pipeline from './PipelineComponent.vue'
import parser from 'cron-parser'
export default {
    components: {
        Pipeline,
    },
    data() {
        return {
            dialogDetail: false,
            dialogConfirmation: false,
            selectedRow: {},
            columns: [
                { text: 'Status', value: 'status' },
                { text: 'Pipeline', value: 'pipeline' },
                { text: 'Type', value: 'type' },
                { text: 'Stages', value: 'stages', align: 'center' },
                { text: 'Actions', value: 'actions', align: 'end' },
            ],
            rows: [
                // {
                //     pipeline: 'Running Playbook Terminate All Hosts',
                //     tag: '#2321',
                //     type: 'Execute once',
                //     stages: [
                //         {
                //             name: 'Playbook 1',
                //             status: 'success'
                //         },
                //         {
                //             name: 'Playbook 1',
                //             status: 'success'
                //         },
                //         {
                //             name: 'Playbook 2',
                //             status: 'running'
                //         }
                //     ],
                //     duration: '00:16:32',
                //     tag: '#177',
                //     version: '0.0.2',
                //     date: ' 2 hours ago',
                //     status: 'Success'
                // },
                // {
                //     pipeline: 'Running Playbook Ping to All Hosts',
                //     tag: '#2321',
                //     type: 'Execute now',
                //     stages: [
                //         {
                //             name: 'Playbook 1',
                //             status: 'success'
                //         },
                //         {
                //             name: 'Playbook 2',
                //             status: 'success'
                //         },
                //         {
                //             name: 'Playbook 3',
                //             status: 'success'
                //         },
                //         {
                //             name: 'Playbook 4',
                //             status: 'success'
                //         }
                //     ],
                //     duration: '00:16:32',
                //     tag: '#176',
                //     version: '0.0.2',
                //     date: ' 4 hours ago',
                //     status: 'Success'
                // },
                // {
                //     pipeline: 'Running Playbook Ping to All Hosts',
                //     tag: '#2321',
                //     type: 'Execute now',
                //     stages: [
                //         {
                //             name: 'Playbook 1',
                //             status: 'pending'
                //         },
                //         {
                //             name: 'Playbook 2',
                //             status: 'pending'
                //         },
                //         {
                //             name: 'Playbook 3',
                //             status: 'pending'
                //         }
                //     ],
                //     duration: '00:16:32',
                //     tag: '#175',
                //     version: '0.0.2',
                //     date: ' 4 hours ago',
                //     status: 'Success'
                // },
                // {
                //     pipeline: 'Running Playbook Ping to All Hosts',
                //     tag: '#2321',
                //     type: 'Execute now',
                //     stages: [
                //         {
                //             name: 'Playbook 1',
                //             status: 'success'
                //         },
                //         {
                //             name: 'Playbook 2',
                //             status: 'success'
                //         },
                //         {
                //             name: 'Playbook 3',
                //             status: 'terminated'
                //         }
                //     ],
                //     duration: '00:16:32',
                //     tag: '#174',
                //     version: '0.0.2',
                //     date: ' 4 hours ago',
                //     status: 'Success'
                // },
            ]
        }
    },
    mounted() {
        this.retrievePipeline();
    },
    methods: {
        retrievePipeline() {
            this.axios.get('/pipelines')
                .then(response => {
                    this.rows = response.data.map((item, index) => {
                        if (item.datetime){
                        const date = new Date(item.datetime);
                        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                        item.date = date.toLocaleDateString('id-ID', options);
                    } else {
                        item.date = '-';
                    }
                        if (item.duration = "00:00:00"){
                            const now = new Date();
                            const duration = Math.abs(now - new Date(item.datetime));
                            const hours = Math.floor(duration / 36e5);
                            const minutes = Math.floor((duration % 36e5) / 60000);
                            const seconds = Math.floor((duration % 60000) / 1000);
                            item.duration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                        }
                        return item
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onClickAddPipeline() {
            this.$router.push({ name: 'create-pipeline' })
        },
        onClickDialogTerminate(item) {
            this.selectedRow = item;
            this.dialogConfirmation = true
        },
        onClickDescription(item){
            this.selectedRow = item;
            this.dialogDetail = true
        },
        onCloseDialogDetail(){
            this.dialogDetail = false;
            this.selectedRow = {};
        },
        onTerminate() {
            this.axios.patch('/pipelines/'+this.selectedRow._id+'/stop',)
                .then(response => {
                    this.retrievePipeline();
                    this.dialogConfirmation = false;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getNextCronRunDate(cron) {
            try {
                const interval = parser.parseExpression(`${cron.minute} ${cron.hour} ${cron.dayOfMonth} ${cron.month} ${cron.dayOfWeek}`);
                console.log(interval);

                let executions = [];
                for (let i = 0; i < 5; i++) {
                    executions.push(interval.next().toString());
                }
               return  executions;
                
            } catch (error) {
                console.error("Invalid cron expression:", error);
            }
        }
    }
};
</script>