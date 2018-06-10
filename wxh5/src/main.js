import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mobileAdapt from './common/mobileAdapt'
import mock from './mock/index.js'
import * as UTILS from '@/common/utils'
mock()

Vue.config.productionTip = false

Vue.prototype.UTILS = UTILS

mobileAdapt()
runApp()

if (router.currentRoute.meta.isShowBottomNav === false) {
  store.dispatch('setBottomNavState', false)
} else {
  store.dispatch('setBottomNavState', true)
}
router.beforeEach((to, from, next) => {
  if (to.meta.isShowBottomNav === false) {
    store.dispatch('setBottomNavState', false)
  } else {
    store.dispatch('setBottomNavState', true)
  }
  next()
})

function runApp () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
