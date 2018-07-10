import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'
import UserInfo from './views/UserInfo'
import Partner from './views/Partner'
import Login from './views/Login'
import cardRecord from './views/cardRecord'
import myShareLink from './views/myShareLink'
import ShopIndex from './views/ShopIndex'
import Wxredirect from './views/Wxredirect'
import ShopProductDetail from './views/ShopProductDetail'
import OrderConfirm from './views/order/orderConfirm'
import Recharge from './views/recharge'
import myProduct from './views/myProduct'
import Cashier from './views/Cashier'
import PartnerIncome from './views/PartnerIncome'

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
      meta: {}
    },
    {
      path: '/cartRecord',
      name: 'cardRecord',
      component: cardRecord,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/myShareLink/:qrInfo',
      name: 'myShareLink',
      component: myShareLink,
      meta: {
        needLogin: true
      }
    },
    {
      path: '/shopIndex',
      name: 'shopIndex',
      component: ShopIndex
    },
    {
      path: '/shopProductDetail/:productId',
      name: 'shopProductDetail',
      component: ShopProductDetail
    },
    {
      path: '/order/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isShowBottomNav: false
      }
    },
    {
      path: '/wxRedirect',
      name: 'wxRedirect',
      component: Wxredirect,
      meta: {
        isShowBottomNav: false
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge
    },
    {
      path: '/myProduct',
      name: 'myProduct',
      component: myProduct
    },
    {
      path: '/cashier',
      name: 'cashier',
      component: Cashier
    },
    {
      path: '/income',
      name: 'income',
      component: PartnerIncome
    }
  ],
})
