import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./views/store/store"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import { CardPlugin } from 'bootstrap-vue'

import VueGraph from 'vue-graph'
 
Vue.use(VueGraph)
Vue.use(CardPlugin)

Vue.use(VueMaterial)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
