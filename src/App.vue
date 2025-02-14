<template>
  <v-app>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" :multi-line="true" :timeout="snackbar.timeout"
      :top="true" :right="true">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.message }}</div>
        </v-layout>
        <v-btn elevation="0" color="transparent" fab x-small dark @click="snackbar.visible = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-layout>
    </v-snackbar>
    <router-view @toast="showToast"></router-view>
  </v-app>
</template>

<script>
import eventBus from './core/eventBus.js';

export default {
  data() {
    return {
      drawer: false,
      snackbar: {
        color: null,
        icon: null,
        mode: null,
        message: null,
        timeout: 5000,
        title: null,
        visible: false,
      },
    }
  },
  mounted() {
    eventBus.$on('toast', (type, message) => {
      this.showToast(type, message);
    });
  },
  methods: {
    showToast(type, message = undefined, title = undefined) {
      if (!type) return;
      const toastConfig = {
        error: {
          color: "error",
          icon: "mdi-close-circle",
          title: title ?? "Error",
        },
        info: {
          color: "info",
          icon: "mdi-information",
          title: title ?? "Information",
        },
        success: {
          color: "success",
          icon: "mdi-check-circle",
          title: title ?? "Success",
        },
        warning: {
          color: "warning",
          icon: "mdi-alert-circle",
          title: title ?? "Warning",
        },
      };

      if (toastConfig[type]) {
        this.snackbar = {
          ...toastConfig[type],
          mode: "multi-line",
          position: "top",
          timeout: 3000,
          message,
          visible: true,
        };
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
</style>
