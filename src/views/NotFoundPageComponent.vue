<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <div class="text-center mt-10">
                    <h1 class="display-4 font-weight-bold">404</h1>
                    <h2>Page Not Found</h2>
                    <p>Halaman yang Anda cari tidak ditemukan.</p>
                    <v-btn color="primary" :to="{ name: 'home' }">Kembali ke halaman utama</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        name: 'NotFound',
        userRoles: [],
        companyLogo: import.meta.env.VITE_APP_LOGO_AUTH,
        appLogo: '/assets/logo/sekawan.png',
    }),
    created() {

    },
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
    methods: {
    }
};
</script>
  
<style scoped>
/* Add custom styles for the "Not Found" page here */
</style>
  