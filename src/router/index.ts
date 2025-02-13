import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UsersView from '@/views/UsersView.vue';
import ContactInfo from '@/components/ContactInfo.vue';
import FoodDetail from '@/components/FoodDetail.vue';
import ViewMenu from '../views/ViewMenu.vue';

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
      component: ContactInfo,
    },
    {
      path: '/details',
      name: 'details',
      component: FoodDetail,
    },
    {
      path: '/menu',
      name: 'menu',
      component: ViewMenu,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
