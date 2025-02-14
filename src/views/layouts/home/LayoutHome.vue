<template>
    <div>
        <v-app-bar app fixed elevation="0" class="navbar-blur">
            <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">
                <!-- <v-icon color="white">mdi-view-dashboard-outline</v-icon> -->
                <v-img width="30" src="/public/logo.png"></v-img>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-if="$vuetify.breakpoint.mdAndUp">

                <v-btn small :to="{ name: 'convertIPv4' }" outlined color="yellow darken-2"
                    class="mx-1 mr-2 rounded-lg font-weight-bold white--text text--darken-2">
                    Convert IPv4 to IPv6
                </v-btn>

            </template>

            <v-btn small text :to="{ name: 'dashboard' }"
                class="yellow darken-2 indigo--text text--darken-4 font-weight-bold elevation-0 rounded-lg mr-2">
                <v-icon left>mdi-view-dashboard-outline</v-icon>
                Dashboard
            </v-btn>
            <v-btn :to="{ name: 'auth' }" small
                class="white lighten-1 indigo--text text--darken-4 font-weight-bold elevation-0 rounded-lg">
                <v-icon left>mdi-login</v-icon>
                Sign in
            </v-btn>

        </v-app-bar>
        <v-navigation-drawer v-if="$vuetify.breakpoint.smAndUp" app v-model="drawer">
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Account</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>

            <router-view></router-view>

        </v-main>

        <v-footer app>
        </v-footer>
    </div>

</template>

<script>
export default {
    data: () => ({
        group: null,
        drawer: false,

    }),
    mounted() {

    },
    created() {
    },
    computed: {

    },
    methods: {
        showToast() {
            this.$emit('toast', 'warning', 'halo');
        }
    }
}
</script>

<style>
.navbar-blur {
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    background-color: rgb(6, 51, 123, 0.9) !important;
}
</style>