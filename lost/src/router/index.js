import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/user/index'
import adminIndex from '@/components/admin/index'
import Goods from '@/components/user/goods'
import GoodsDetails from '@/components/user/goodsdetails'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'login'
    },
    {
      path:'/login',
      name:'Lgoin',
      component:Login
    },
    {
      path:'/index',
      name:'Index',
      component:Index
    },
    {
      path:'/adminIndex',
      name:'adminIndex',
      component:adminIndex
    },
    {
      path:'/goods',
      name:'goods',
      component:Goods
    },
    {
      path:'/goods/goodsdetails',
      name:'goodsdetails',
      component:GoodsDetails
    }
  ]
})
