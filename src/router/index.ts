import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ContactPage from '@/views/ContactPage.vue';
import FoodDetail from '@/components/FoodDetail.vue';
import ViewMenu from '@/views/ViewMenu.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ShoppingCart from '@/views/ShoppingCart.vue';
import ThanksView from '@/views/ThanksView.vue';
import ProfileView from '@/views/ProfileView.vue';
import OrdersView from '@/views/OrdersView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactPage },
  { path: '/details', name: 'details', component: FoodDetail },
  { path: '/menu', name: 'menu', component: ViewMenu },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCart
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: () => import('@/views/ReservationView.vue')
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: ThanksView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;