<template>
  <v-app-bar elevation="0" dense class="white" style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)!important;">
    <v-chip class="font-weight-bold rounded-lg" color="indigo lighten-5 indigo--text text--darken-3" label><span class="font-weight-bold"> Net AI Copilot</span></v-chip>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.mdAndDown" @click.stop="onDrawerClicked"></v-app-bar-nav-icon>
    <v-toolbar-title class="font-weight-bold" :class="'pl-0'">
      <v-avatar v-if="!$vuetify.breakpoint.mdAndDown" tile width="75" class="mr-3">
      <img :src="'https://upload.wikimedia.org/wikipedia/id/thumb/7/7a/UII_LOGO.svg/1200px-UII_LOGO.svg.png'" alt="UII Logo" width="100%" style="vertical-align: middle" class="my-3" />
      </v-avatar>
      <v-avatar v-if="!$vuetify.breakpoint.mdAndDown" width="100px" height="20px" tile class="mr-2"> 
      <img src="/images/isif_logo.png" alt="">
      </v-avatar>
    </v-toolbar-title>
    <!-- <small class="mr-2" v-if="$vuetify.breakpoint.mdAndUp">{{ 'User' }}</small> -->
    <!-- <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <div v-if="false">
            <v-avatar size="30" color="grey">
              <v-img :src="$store.getters.getUser.avatar"></v-img>
            </v-avatar>
          </div>
          <div v-else>
            <v-icon style="color:indigo darken-4"> mdi-account</v-icon>
          </div>
        </v-btn>
      </template>
      <v-list dense class="rounded-lg">
        <v-list-item>
          <v-list-item-title class="font-weight-bold">{{ 'User' }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-icon left>mdi-account-outline</v-icon>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
         <v-list-item>
          <v-icon left>mdi-help-circle-outline</v-icon>
          <v-list-item-title>Help</v-list-item-title>
        </v-list-item> -
        <v-list-item @click="logout" color="primary">
          <v-icon left>mdi-logout</v-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </v-app-bar>
</template>

<script>
export default {
  props: {
    drawer: Boolean,
  },
  created() {
  },
  methods: {
    onDrawerClicked() {
      this.$emit("onDrawerClicked", !this.drawer);
    },
    logout() {
      this.axios.post("auth/logout").then((response) => {
        this.$store.dispatch('logout');
        this.$router.push({ name: "home", params: {} });
      });
    },
  },
};
</script>