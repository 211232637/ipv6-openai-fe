import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    login({ commit }, userData) {
      commit('setUser', userData.user);
    },
    logout({ commit }) {
      commit('setUser', null);
    },
  },
  plugins: [vuexLocal.plugin],

});
