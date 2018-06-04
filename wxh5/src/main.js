import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mobileAdapt from './common/mobileAdapt'
import mock from './mock/index.js'
import * as reqApi from './common/reqApi'
mock()

Vue.config.productionTip = false

mobileAdapt()
runApp()
router.beforeEach((to, from, next) => {
  if (to.meta.isShowBottomNav === false) {
    store.dispatch('setBottomNavState', false)
  } else {
    store.dispatch('setBottomNavState', true)
  }
  next()
})

function runApp () {
  let test = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  reqApi.getUserInfo().then((res) => {
    console.log(res)
    console.log('store', test)
  })
}
