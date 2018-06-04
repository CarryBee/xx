import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import UserInfo from './views/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        isShowBottomNav: false
      }
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: UserInfo,
      meta: {
        needLogin: true
      }
    }
  ],
})
