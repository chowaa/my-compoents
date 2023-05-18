import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    // children: [
    //   {
    //     path:'homeView',
    //     name:'homeView',
    //     component: ()=> import("@/views/homeView/index.vue")
    //   },
    //   {
    //     path:'hosList',
    //     name:'hosList',
    //     component: ()=> import('@/views/hosList/index.vue'),
    //     // meta: {
    //     //   // requiresAuth: true // 需要登录才能访问
    //     // },
    //   },
    //   {
    //     path:'hospitalDetails',
    //     name:'hospitalDetails',
    //     component: ()=> import('@/views/hospitalDetails/index.vue'),
    //     // meta: {
    //     //   // requiresAuth: true // 需要登录才能访问
    //     // },
    //   }
    // ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//路由守卫
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token')
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next('/home')
//     } else {
//       next()
//     }
//   } else {
//     if (isAuthenticated && to.name === 'Login') {
//       next('/home')
//     } else {
//       next()
//     }
//   }
// })

export default router
