import index from '@/views/index.vue'
import login from '@/views/login.vue'
import wecolme from '@/views/weclome.vue'
import artlist from '@/views/artlist.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'





Vue.use(VueRouter)

// 引入登录页
var router = new VueRouter({
  routes: [
    // 登录页面配置路由
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'index',
      path: '/index',
      component: index,
      redirect: {
        name: 'wecolme'
      },
      children: [{
        name: 'wecolme',
        path: 'wecolme',
        component: wecolme
      },
      {
        name: 'artlist',
        path: 'artlist',
        component: artlist
      }
      ]


    }
  ]
})

// 导航守卫

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('heima_40_back_token')
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

// router.beforeEach((to, from, next) => {
//   // 判断跳转的目标页是否需要验证,除了登陆页之后的页面都需要先登陆
//   if (to.path === '/login') { // 如果是登陆页
//     next()
//   } else { // 否则：如果不是进入到登陆页，就需要进行是否有token值的判断
//     // 获取token
//     let token = localStorage.getItem('heima_40_back_token')
//     if (token) {
//       next()
//     } else {
//       next({ path: '/login' })
//     }
//   }
// })


export default router
