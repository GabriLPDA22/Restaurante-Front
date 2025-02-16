import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ContactPage from '../views/ContactPage.vue';
import FoodDetail from '@/components/FoodDetail.vue';
import ViewMenu from '../views/ViewMenu.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactPage },
  { path: '/details', name: 'details', component: FoodDetail },
  { path: '/menu', name: 'menu', component: ViewMenu },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
