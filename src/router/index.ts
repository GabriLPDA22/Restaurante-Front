import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ContactPage from '@/views/ContactPage.vue';
import FoodDetail from '@/components/FoodDetail.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ShoppingCart from '@/views/ShoppingCart.vue';
import ThanksViewReservation from '@/views/ThanksReservationView.vue';
import OrdersView from '@/views/OrdersView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import CheckoutView from '@/views/CheckoutView.vue';
import ThanksOrderView from '@/views/ThanksOrderView.vue';
import ApiTestView from '@/views/ApiTestView.vue';
import ProfileView from '@/views/ProfileView.vue';
import ApiUserView from '@/views/ApiUserTest.vue'
import LoginAdminView from '@/views/LoginAdminView.vue';
import AdminDashboardView from '@/views/AdminDashboardView.vue';
import Unauthorized401View from '@/views/Unauthorized401View.vue';
import { adminAuthStore } from '@/stores/adminAuthStore';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactPage },
  { path: '/details', name: 'details', component: FoodDetail },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/cart', name: 'cart', component: ShoppingCart },
  { path: '/reservation', name: 'reservation', component: () => import('@/views/ReservationView.vue') },
  { path: '/thanks', name: 'thanks', component: ThanksViewReservation },
  { path: '/profile', name: 'profile', component: ProfileView },
  { path: '/orders', name: 'orders', component: OrdersView },
  { path: '/checkout', name: 'checkout', component: CheckoutView },
  { path: '/thanks-order', name: 'thanks-order', component: ThanksOrderView },
  { path: '/api-test', name: 'api-test', component: ApiTestView },
  { path: '/api-user', name: 'api-user', component: ApiUserView },
  { path: '/admin', name: 'login-admin', component: LoginAdminView },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: AdminDashboardView,
    beforeEnter: (to, from, next) => {
      // Guardia de navegación a nivel de ruta
      const store = adminAuthStore();
      store.loadAdmin();

      if (store.isAuthenticated()) {
        next(); // Permitir acceso si está autenticado
      } else {
        next({ name: 'unauthorized' }); // Redirigir a la página 401 en lugar de al login
      }
    }
  },
  // Ruta para el error 401 - No autorizado
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized401View
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