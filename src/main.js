import Vue from 'vue'
import App from './App.vue'
import BralcoHelpers from './bralcohelpers'
import router from './router'
import store from './stores'
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
 
require('./croppie');
require('./vuikit');

Vue.use(BralcoHelpers);
Vue.component('vue-phone-number-input', VuePhoneNumberInput);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
