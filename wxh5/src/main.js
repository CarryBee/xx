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
import axios from 'axios'

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

router.beforeEach(async (to, from, next) => {
  let isUsedCode = sessionStorage.getItem('codeUsed')
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

if (router.currentRoute.meta.isShowBottomNav === false) {
  store.dispatch('setBottomNavState', false)
} else {
  store.dispatch('setBottomNavState', true)
}

async function loginWithCode (code) {
  let loginRes = await reqApi.loginWithCode(code)
  store.dispatch('SET_USERINFO', loginRes)
  localStorage.setItem('loginRes', JSON.stringify(loginRes.data.data))
  axios.defaults.headers.common['loginToken'] = loginRes.auth || ''
  return true
}

async function runApp () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

  let loginResStr = localStorage.getItem('loginRes') || '{}'
  let loginRes = false
  try {
    loginRes = JSON.parse(loginResStr)
    store.dispatch('setUserInfo', loginRes)
  } catch (err) {}

  axios.defaults.headers.common['loginToken'] = loginRes.auth || ''

  let code = UTILS.getQueryString('code')

  // 有code时进行code登录
  if (code) {
    sessionStorage.setItem('codeUsed', true)
    try {
      await loginWithCode(code)
      location.href = '/#' + router.currentRoute.path
      console.log('location.href', location.href)
    } catch (e) {
      console.error('e', JSON.stringify(e))
      location.href = '/#' + router.currentRoute.path
      console.log('location.href', location.href)
    }
    return true
  }

  // 没有code切页面需要登录则进行微信授权
  let isUsedCode = sessionStorage.getItem('codeUsed')
  if (router.currentRoute.meta.needLogin && !isUsedCode && !loginRes) {
    let loginResStr = localStorage.getItem('loginRes')
    let loginRes = JSON.parse(loginResStr)
    console.log('needLogin', loginResStr)
    if (!loginRes) {
      // 微信授权
      // location.href = '/#/login'
      console.log('router', router)
      let wxUrl = UTILS.makeAccessWXUrl({
        reUrl: location.origin + '/#' + router.path
      })
      location.href = wxUrl
      return false
    }
  }
}
