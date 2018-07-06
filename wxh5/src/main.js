import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import FastClick from 'fastclick'
import mobileAdapt from './common/mobileAdapt'

import Toasted from 'vue-toasted'
import mock from './mock/index.js'
import * as UTILS from '@/common/utils'
import * as reqApi from '@/common/reqApi'

mock()

// FastClick.attach(document.body)

Vue.config.productionTip = false

let Options = {
  position: 'bottom-center',
  duration: '2000',
  fitToScreen: true,
  singleton: true,
  className: 'toast-style'
}
Vue.use(Toasted, Options)

Vue.prototype.UTILS = UTILS
Vue.prototype.REQAPI = reqApi

mobileAdapt()
runApp()

if (router.currentRoute.meta.isShowBottomNav === false) {
  store.dispatch('setBottomNavState', false)
} else {
  store.dispatch('setBottomNavState', true)
}

async function loginWithCode (code) {
  let loginRes = await reqApi.loginWithCode(code)
  store.dispatch('SET_USERINFO', loginRes)
  localStorage.setItem('loginRes', JSON.stringify(loginRes.data.data))
  return true
}

router.beforeEach(async (to, from, next) => {
  // let code = UTILS.getQueryString('code')
  let isUsedCode = sessionStorage.getItem('codeUsed')
  // if (code && !isUsedCode) {
  //   sessionStorage.removeItem('codeUsed')
  //   try {
  //     await loginWithCode(code)
  //     location.href = '/#' + to.path
  //     return next({name: to.name, query: {}})
  //   } catch (err) {
  //     location.href = '/#/'
  //     return next({name: 'home'})
  //   }
  // }
  if (to.meta.isShowBottomNav === false) {
    store.dispatch('setBottomNavState', false)
  } else {
    store.dispatch('setBottomNavState', true)
  }
  if (to.meta.needLogin && !isUsedCode) {
    let loginResStr = localStorage.getItem('loginRes')
    let loginRes = JSON.parse(loginResStr)
    console.log('needLogin', loginResStr)
    if (!loginRes) {
      // 微信授权
      // location.href = '/#/login'
      let wxUrl = UTILS.makeAccessWXUrl({
        reUrl: location.origin + '/#' + to.path
      })
      location.href = wxUrl
      return false
    }
  }
  next()
})

async function runApp () {
  let code = UTILS.getQueryString('code')
  sessionStorage.setItem('codeUsed', true)
  if (code) {
    try {
      await loginWithCode(code)
      location.href = '/#' + router.currentRoute.path
      console.log('location.href', location.href)
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    } catch (e) {
      console.error('e', JSON.stringify(e))
      location.href = '/#' + router.currentRoute.path
      console.log('location.href', location.href)
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
