<template>
  <v-navigation-drawer app permanent clipped-right v-if="$vuetify.breakpoint.mdAndUp" height="100%" expand-on-hover>
    <v-list>
      <router-link :to="{ name: 'dashboard' }" style="text-decoration: none;">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-icon left color="indigo darken-4">mdi-view-dashboard-outline</v-icon>
          </v-list-item-avatar>
        </v-list-item>
      </router-link>
    </v-list>
    <v-list nav dense>
      <v-list-item active-class="indigo darken-4 white--text rounded-lg" link :to="{ name: 'convertIPv4' }">
        <v-list-item-icon>
          <v-icon>mdi-rocket-launch</v-icon>
        </v-list-item-icon>
        <v-list-item-title>AI Playground</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="indigo darken-4 white--text rounded-lg" link :to="{ name: 'pipeline' }">
        <v-list-item-icon>
          <v-icon>mdi-auto-fix</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Pipelines</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="indigo darken-4 white--text rounded-lg" link :to="{ name: 'inventory' }">
        <v-list-item-icon>
          <v-icon>mdi-package</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Inventory</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="indigo darken-4 white--text rounded-lg" link :to="{ name: 'playbook' }">
        <v-list-item-icon>
          <v-icon>mdi-book-open</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Playbook</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="indigo darken-4 white--text rounded-lg" link :to="{ name: 'settings' }">
        <v-list-item-icon>
          <v-icon>mdi-cog-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import eventBus from '@/core/eventBus.js';
export default {
  props: {
    drawer: Boolean,
  },
  data: () => ({
    isOpen: true,
    companyLogo: import.meta.env.VITE_APP_LOGO_AUTH,
    appLogo: '/assets/logo/sekawan.png',

    isLoading: false,
  }),
  created() {

  },
  watch: {
    drawer: {
      immediate: true,
      handler(newVal, oldVal) {
        this.isOpen = newVal;
      },
    },
  },
  mounted() {
    eventBus.$on('getAllBadge', () => {
      this.retrieveAllBadge();
    });
  },
  methods: {
    onClickHome() {
      this.$router.push({ name: 'home' })
    },
  }
};
</script>

<style>
.list-item-custom {
  color: #85A7BB !important;
}
</style>