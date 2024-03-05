import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
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
      // alias: '/manage',
      name: 'manage',
      component: () => import('@/views/ManageView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manage',
      redirect: { name: 'manage' }
    },
    {
      name: 'song',
      path: '/song/:id',
      component: () => import('@/views/SongView.vue')
    },
    {
      path: '/:catchAll(.*)*', // path does not exist
      name: 'error404',
      component: Error404
    }
  ],
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const userStore = useUserStore()
  if (userStore.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
