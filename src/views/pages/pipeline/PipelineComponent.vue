<template>
    <v-container>
        <v-row class="d-flex justify-center align-center">
            <template v-for="(stage, index) in pipelineStages">
                <v-col cols="auto" class="text-center stage-item">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon small v-if="stage.status === 'success'" color="green" class="border-success"
                                v-bind="attrs" v-on="on">mdi-check-circle</v-icon>
                            <v-icon small v-else-if="stage.status === 'failed'" class="border-failed" color="#ae1800"
                                v-bind="attrs" v-on="on">mdi-close-circle</v-icon>
                            <v-icon small v-else-if="stage.status === 'running'" class="border-running" color="blue"
                                v-bind="attrs" v-on="on">mdi-timelapse</v-icon>
                            <v-icon small v-else-if="stage.status === 'pending'" class="border-pending" color="orange"
                                v-bind="attrs" v-on="on">mdi-clock-time-nine</v-icon>
                            <v-icon small v-else-if="stage.status === 'stopped'" color="grey" v-bind="attrs"
                                class="border-terminated" v-on="on">mdi-circle-off-outline</v-icon>
                        </template>
                        <span>{{ stage.name }}: {{ stage.status }}</span>
                    </v-tooltip>
                </v-col>
                <v-col v-if="index < pipelineStages.length - 1" cols="auto" class="connector">
                    <div class="stage-connector"></div>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        pipelineStages: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {

        };
    },
};
</script>

<style scoped>
.v-row {
    margin-bottom: 20px;
}

.v-icon {
    border: 3px solid rgba(0, 0, 0, 0.1);
    /* 0.5 is the opacity value, adjust as needed */
    border-radius: 50%;
}

.stage-item {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-inline: 0px;
}

.connector {
    display: flex;
    align-items: center;
    padding-inline: 0px;
}

.stage-connector {
    height: 1px;
    width: 10px;
    background-color: grey;
    margin: 0px;
}

.stage-item .v-icon.border-success {
    border: 3px solid rgba(76, 175, 80, 0.4);
    /* Example for success */
}

.stage-item .v-icon.border-failed {
    border: 3px solid rgba(174, 24, 0, 0.4);
    /* Applying the rgba color with 0.4 opacity */
}

.stage-item .v-icon.border-running {
    border: 3px solid rgba(33, 150, 243, 0.4);
    /* Example for running */
}

.stage-item .v-icon.border-pending {
    border: 3px solid rgba(255, 165, 0, 0.4);
    /* Example for pending */
}

.stage-item .v-icon.border-terminated {
    border: 3px solid rgba(128, 128, 128, 0.4);
    /* Example for terminated */
}
</style>