import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/ShoppingCart'
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path:'ShoppingCart',
        name:'ShoppingCart',
        component: ()=> import("@/views/shoppingCart/ShoppingCart.vue")
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
