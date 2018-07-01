import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import FastClick from 'fastclick'
import mobileAdapt from './common/mobileAdapt'

import mock from './mock/index.js'
import * as UTILS from '@/common/utils'
import * as reqApi from '@/common/reqApi'

import {Toast} from 'mint-ui'
import 'mint-ui/lib/style.css'
mock()

// FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.UTILS = UTILS
Vue.prototype.REQAPI = reqApi
// Vue.prototype.$toast = Toast
Vue.prototype.$toast = (option) => {
  if (typeof option === 'string') {
    return Toast({
      message: option,
      className: 'adapt-toast',
    })
  }
  Toast({
    className: 'adapt-toast',
    ...option
  })
}

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
  let code = UTILS.getQueryString('code')
  let isUsedCode = sessionStorage.getItem('codeUsed')
  if (code && !isUsedCode) {
    sessionStorage.removeItem('codeUsed')
    try {
      await loginWithCode(code)
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
    // let loginToken = localStorage.getItem('loginRes')
    // if (!loginToken) {
    //   location.href = '/#/login'
    // }
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
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    } catch (e) {
      console.error('e', e)
      location.href = '/#' + router.currentRoute.path
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
