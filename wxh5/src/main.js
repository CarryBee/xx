import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mobileAdapt from './common/mobileAdapt'
import mock from './mock/index.js'
import * as UTILS from '@/common/utils'
import * as reqApi from '@/common/reqApi'
mock()

Vue.config.productionTip = false

Vue.prototype.UTILS = UTILS
Vue.prototype.REQAPI = reqApi

mobileAdapt()
runApp()

if (router.currentRoute.meta.isShowBottomNav === false) {
  store.dispatch('setBottomNavState', false)
} else {
  store.dispatch('setBottomNavState', true)
}

router.beforeEach(async (to, from, next) => {
  if (UTILS.getQueryString('code')) {
    try {
      let loginRes = await reqApi.loginWithCode(code)
      localStorage.setItem('loginRes', JSON.stringify(loginRes))
      location.href = '/#' + to.path
      return next({name: to.name, query: {}})
    } catch (err) {
      location.href = '/#' + to.path
      return next({name: to.name})
    }
  }
  if (to.meta.isShowBottomNav === false) {
    store.dispatch('setBottomNavState', false)
  } else {
    store.dispatch('setBottomNavState', true)
  }
  if (to.meta.needLogin) {
    let loginToken = localStorage.getItem('loginToken')
    if (!loginToken) {
      location.href = '/#/login'
    }
  }
  next()
})

async function runApp () {

  let code = UTILS.getQueryString('code')
  if (code) {
    try {
      let loginRes = await reqApi.loginWithCode(code)
      localStorage.setItem('loginRes', loginRes)
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    } catch (e) {
      console.error('run App', e)
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    }
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
