import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistedstate from "vuex-persistedstate";
import auth from './auth';
import workspace from './workspace';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    workspace: workspace,
  },
  plugins: [
    VuexPersistedstate({
      key: 'KabanApp',
      paths: ['workspace'],
      storage: window.sessionStorage
    }),
    VuexPersistedstate({
      key: 'KabanApp',
      paths: ['auth'],
      storage: window.localStorage
    }),
  ]
})
