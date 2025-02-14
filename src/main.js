import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './core/store.js';
import vuetify from './plugins/vuetify';
import VueApexCharts from "vue-apexcharts";
import VueAxios from 'vue-axios'
import axios from './core/interceptors.js';
import '@mdi/font/css/materialdesignicons.css';
import eventBus from './core/eventBus';
import { rules } from './core/rules.js'


Vue.prototype.$eventBus = eventBus;
Vue.prototype.$rules = rules;


Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.use(VueAxios, axios);

const appVue = new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: (h) => h(App),
})
