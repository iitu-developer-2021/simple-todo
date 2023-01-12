import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/:id?',
    component: () => import('@/views/Main.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
