import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules';
import Notifications from 'vue-notification'
import vSelect from 'vue-select'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// import './assets/css/bootstrap/bootstrap.css'
import './assets/css/main.css'
import 'vue-select/dist/vue-select.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$http = http
Vue.config.productionTip = false

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('v-select', vSelect)
Vue.use(Notifications)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
