import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mobileAdapt from './common/mobileAdapt'

Vue.config.productionTip = false;

mobileAdapt()
runApp()

function runApp() {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
}
