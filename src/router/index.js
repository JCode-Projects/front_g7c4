import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Redirect',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    // route level code-splitting
    // this generates a separate chunk (registro.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "registro" */ '../views/SingUp.vue')
  },
  {
    path: '/inicio',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
    // route level code-splitting
    // this generates a separate chunk (productos.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "productos" */ '../views/Products.vue')
  },
  {
    path: '/publicacion/:id',
    name: 'Producto',
    // route level code-splitting
    // this generates a separate chunk (producto.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "producto" */ '../views/Product.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    // route level code-splitting
    // this generates a separate chunk (logout.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
