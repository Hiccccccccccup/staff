import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import userManage from '@/components/userManage'
import dealCenter from '@/components/dealCenter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/userManage',
          name: 'userManage',
          component: userManage
        },
        {
          path: '/dealCenter',
          name: 'dealCenter',
          component: dealCenter
        }
      ]
    }
  ]
})
