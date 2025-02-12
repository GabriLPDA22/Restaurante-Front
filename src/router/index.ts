import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '@/views/UsersView.vue'
import FoodDetail from '@/components/FoodDetail.vue'
import ContactPage from '@/views/ContactPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
    },
    {
      path: '/details',
      name: 'details',
      component: FoodDetail,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
