import Vue from 'vue'
import Base from './App.vue' // 根目标
import Home from  './views/Home.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(iView);

// The routing configuration
const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  }]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(Base)
});
