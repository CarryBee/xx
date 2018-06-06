import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'
import UserInfo from './views/UserInfo'
import Partner from './views/Partner'
import Login from './views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/partner',
      name: 'partner',
      component: Partner,
      meta: {}
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: UserInfo,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isShowBottomNav: false
      }
    }
  ],
})
