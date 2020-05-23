import Vue from 'vue'
import App from './App.vue'
import BralcoHelpers from './bralcohelpers'
import router from './router'
import store from './stores'

require('./vuikit');

Vue.use(BralcoHelpers);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
