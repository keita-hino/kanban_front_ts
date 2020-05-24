import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'
import store from './store'
// import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import router from './router'
// import vuex from './store/index'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
