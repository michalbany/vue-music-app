import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Error404 from '@/views/Error404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/manage-music',
      name: 'manage',
      component: () => import('@/views/ManageView.vue')
    },
    {
      path: '/manage',
      redirect: { name: 'manage' }
    },
    {
      path: '/:catchAll(.*)*', // path does not exist
      name: 'error404',
      component: Error404
    }
  ],
  linkExactActiveClass: 'text-yellow-500'
})

export default router
