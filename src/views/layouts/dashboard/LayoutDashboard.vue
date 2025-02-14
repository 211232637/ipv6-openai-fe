<template>
    <v-app>
        <sidebar :drawer="drawer"></sidebar>
        <v-main :class="{ 'desktop-main-class': $vuetify.breakpoint.mdAndUp }" class="white">
            <topbar @onDrawerClicked="onDrawerClicked($event)" :drawer="drawer"></topbar>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Topbar from './components/TopbarLayoutDashboard.vue';
import Sidebar from './components/SidebarLayoutDashboard.vue';
import Footer from './components/FooterLayoutDashboard.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        Topbar,
        Sidebar,
        Footer
    },
    data: () => ({
        drawer: false,
    }),
    mounted() {
        this.drawer = true;
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
        breadcrumbs() {
            let breadcrumbs = [];
            const matchedRoutes = this.$route.matched;
            matchedRoutes.forEach((route, index, array) => {
                if (route.meta.breadcrumb && !route.meta.hideBreadcrumb) {
                    breadcrumbs.push({
                        text: route.meta.breadcrumb,
                        href: route.path,
                        disabled: false
                    });
                } else if (route.meta.hideBreadcrumb) {
                    breadcrumbs = [];
                }
            });
            return breadcrumbs.map((bread, index, array) => {
                if (index == array.length - 1) {
                    bread.disabled = true;
                }
                return bread;
            });
        },
    },
    methods: {
        onDrawerClicked(value) {
            this.drawer = value;
        },
    }
}
</script>

<style>
.desktop-main-class {
    padding-left: 56px !important;
}
</style>./FooterLayoutDashboard.vue./SidebarLayoutDashboard.vue./TopbarLayoutDashboard.vue