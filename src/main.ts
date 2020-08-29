import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify';
import router from './router'
import VueCompositionApi from "@vue/composition-api";

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueCompositionApi);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
