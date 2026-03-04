import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from './views/MainView.vue'
import ClassDetailView from './views/ClassDetailView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: MainView
  },
  {
    path: '/class/:id',
    name: 'ClassDetail',
    component: ClassDetailView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
