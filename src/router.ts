import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/LoginView.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/MainView.vue')
  },
  {
    path: '/sub-webview',
    name: 'SubWebView',
    component: () => import('./views/SubWebViewTest.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
