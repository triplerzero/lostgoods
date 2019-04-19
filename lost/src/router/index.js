import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/user/index'
import adminIndex from '@/components/admin/index'
import GoodsDetails from '@/components/user/goodsdetails'
import Addgoods from '@/components/user/addgoods'
import Goodslist from '@/components/user/goodslist'
import Report from '@/components/admin/report'
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
      path:'/goodsdetails',
      name:'goodsdetails',
      component:GoodsDetails
    },
    {
      path:'/addgoods',
      name:'addgoods',
      component:Addgoods 
    },
    {
      path:'/goodslist',
      name:'goodslist',
      component:Goodslist
    },
    {
      path:'/report',
      name:'report',
      component:Report
    }
  ]
})
