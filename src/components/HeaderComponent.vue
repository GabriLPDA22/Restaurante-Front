<template>
  <header class="header">
    <!-- BARRA MÓVIL -->
    <div class="header__mobile">
      <button class="header__burger" aria-label="Toggle Menu" @click="toggleMenu">
        <span v-if="!isMenuOpen" class="header__burger-icon">☰</span>
        <span v-else class="header__close">✖</span>
      </button>

      <div class="header__logo-mobile">
        <router-link to="/" aria-label="Ir a la página de inicio">
          <div class="header__logo-animation">
            <svg class="header__logo-svg" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f3cc74" />
                  <stop offset="50%" stop-color="#d1a75f" />
                  <stop offset="100%" stop-color="#9f7835" />
                </linearGradient>
              </defs>
              <text x="50%" y="50%" text-anchor="middle" class="header__logo-text-main"
                fill="url(#goldGradient)">ELIXIUM FOODS</text>
              <text x="50%" y="75%" text-anchor="middle" class="header__logo-text-restaurant"
                fill="url(#goldGradient)">RESTAURANT</text>
            </svg>
          </div>
        </router-link>
      </div>

      <div class="header__icons-mobile">
        <!-- Dropdown del usuario si está autenticado -->
        <div class="header__user-dropdown" v-if="isAuthenticated">
          <div class="header__avatar-container" @click="toggleDropdown">
            <img :src="userImage" alt="User Avatar" class="header__avatar" />
            <span class="header__avatar-name">{{ currentUser?.Nombre }}</span>
            <font-awesome-icon :icon="['fas', 'chevron-down']" class="header__avatar-icon" />
          </div>

          <transition name="slide-fade">
            <div class="header__dropdown-menu" v-if="isDropdownOpen">
              <div class="header__dropdown-header">
                <img :src="userImage" alt="User Avatar" class="header__dropdown-avatar" />
                <div class="header__dropdown-info">
                  <p class="header__dropdown-name">{{ currentUser?.Nombre }}</p>
                  <p class="header__dropdown-email">{{ currentUser?.Correo }}</p>
                </div>
              </div>
              <div class="header__dropdown-links">
                <router-link to="/profile" class="header__dropdown-link">
                  <font-awesome-icon :icon="['fas', 'user']" />
                  <span>Mi Perfil</span>
                </router-link>
                <router-link to="/orders" class="header__dropdown-link">
                  <font-awesome-icon :icon="['fas', 'receipt']" />
                  <span>Mis Pedidos</span>
                </router-link>
                <router-link to="/favorites" class="header__dropdown-link">
                  <font-awesome-icon :icon="['fas', 'heart']" />
                  <span>Favoritos</span>
                </router-link>
              </div>
              <v-btn @click="handleLogout" elevation="2" class="header__logout-btn">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="header__logout-icon" />
                Cerrar Sesión
              </v-btn>
            </div>
          </transition>
        </div>

        <!-- Si NO está autenticado, icono normal que redirige a /login -->
        <router-link v-else to="/login" class="header__icon" aria-label="User">
          <font-awesome-icon :icon="['fas', 'user']" class="icon" />
        </router-link>
      </div>
    </div>

    <!-- MENÚ DESPLEGABLE MÓVIL -->
    <transition name="menu-reveal">
      <div class="header__mobile-menu" v-if="isMenuOpen" @click="closeMenu">
        <nav class="header__nav-mobile" @click.stop>
          <!-- El título RESTAURANT se ha eliminado -->
          <ul class="header__nav-list">
            <li class="header__nav-item">
              <router-link to="/cart" class="header__nav-link" @click="closeMenu">
                <div class="header__nav-icon-box">
                  <i class="fas fa-utensils header__nav-icon"></i>
                </div>
                <span class="header__nav-text">Menu</span>
              </router-link>
            </li>
            <li class="header__nav-item">
              <a class="header__nav-link">
                <div class="header__nav-icon-box">
                  <i class="fas fa-glass-cheers header__nav-icon"></i>
                </div>
                <span class="header__nav-text">Events</span>
              </a>
            </li>
            <li class="header__nav-item">
              <router-link to="/about" class="header__nav-link" @click="closeMenu">
                <div class="header__nav-icon-box">
                  <i class="fas fa-info-circle header__nav-icon"></i>
                </div>
                <span class="header__nav-text">About Us</span>
              </router-link>
            </li>
            <li class="header__nav-item">
              <router-link to="/reservation" class="header__nav-link" @click="closeMenu">
                <div class="header__nav-icon-box">
                  <i class="far fa-calendar-alt header__nav-icon"></i>
                </div>
                <span class="header__nav-text">Reservation</span>
              </router-link>
            </li>
            <li class="header__nav-item">
              <router-link to="/contact" class="header__nav-link" @click="closeMenu">
                <div class="header__nav-icon-box">
                  <i class="fas fa-phone-alt header__nav-icon"></i>
                </div>
                <span class="header__nav-text">Contact Us</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </transition>

    <!-- BARRA SUPERIOR (ESCRITORIO) -->
    <div class="header__top">
      <div class="header__container">
        <div class="header__schedule-wrapper">
          <p class="header__schedule">
            MONDAY – SUNDAY: 9:00AM – 12PM 
          </p>
        </div>
        <div class="header__top-right">
          <div class="header__icons">
            <button class="header__icon header__icon--search" aria-label="Search">
              <font-awesome-icon :icon="['fas', 'search']" class="icon" />
            </button>

            <!-- User dropdown para desktop -->
            <div class="header__user-dropdown header__user-dropdown--desktop" v-if="isAuthenticated">
              <div class="header__avatar-container" @click="toggleDropdown">
                <img :src="userImage" alt="User Avatar" class="header__avatar" />
                <span class="header__avatar-name">{{ currentUser?.Nombre }}</span>
                <font-awesome-icon :icon="['fas', 'chevron-down']" class="header__avatar-icon" />
              </div>

              <transition name="slide-fade">
                <div class="header__dropdown-menu" v-if="isDropdownOpen">
                  <div class="header__dropdown-header">
                    <img :src="userImage" alt="User Avatar" class="header__dropdown-avatar" />
                    <div class="header__dropdown-info">
                      <p class="header__dropdown-name">{{ currentUser?.Nombre }}</p>
                      <p class="header__dropdown-email">{{ currentUser?.Correo }}</p>
                    </div>
                  </div>
                  <div class="header__dropdown-links">
                    <router-link to="/profile" class="header__dropdown-link">
                      <font-awesome-icon :icon="['fas', 'user']" />
                      <span>Mi Perfil</span>
                    </router-link>
                    <router-link to="/orders" class="header__dropdown-link">
                      <font-awesome-icon :icon="['fas', 'receipt']" />
                      <span>Mis Pedidos</span>
                    </router-link>
                    <router-link to="/favorites" class="header__dropdown-link">
                      <font-awesome-icon :icon="['fas', 'heart']" />
                      <span>Favoritos</span>
                    </router-link>
                  </div>
                  <v-btn @click="handleLogout" elevation="2" class="header__logout-btn">
                    <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="header__logout-icon" />
                    Cerrar Sesión
                  </v-btn>
                </div>
              </transition>
            </div>

            <!-- Si NO está autenticado, icono normal que redirige a /login -->
            <router-link v-else to="/login" class="header__icon" aria-label="User Profile">
              <font-awesome-icon :icon="['fas', 'user']" class="icon" />
            </router-link>
          </div>
        </div>
      </div>
    </div>


    <!-- BARRA INFERIOR (ESCRITORIO) -->
    <div class="header__bottom">
      <div class="header__container">
        <nav class="header__nav-left">
          <ul class="header__desktop-nav-list">
            <li class="header__desktop-nav-item">
              <router-link to="/cart" class="header__desktop-nav-link">Menu</router-link>
            </li>
            <li class="header__desktop-nav-item">
              <a class="header__desktop-nav-link">Events</a>
            </li>
            <li class="header__desktop-nav-item">
              <router-link to="/about" class="header__desktop-nav-link">About us</router-link>
            </li>
          </ul>
        </nav>

        <div class="header__logo header__logo--desktop">
          <router-link to="/" aria-label="Ir a la página de inicio">
            <div class="header__logo-animation">
              <svg class="header__logo-svg-desktop" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="goldGradientDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f3cc74" />
                    <stop offset="50%" stop-color="#d1a75f" />
                    <stop offset="100%" stop-color="#9f7835" />
                  </linearGradient>
                </defs>
                <text x="50%" y="50%" text-anchor="middle" class="header__logo-desktop-text-main"
                  fill="url(#goldGradientDesktop)">ELIXIUM FOODS</text>
                <text x="50%" y="75%" text-anchor="middle" class="header__logo-desktop-text-restaurant"
                  fill="url(#goldGradientDesktop)">RESTAURANT</text>
              </svg>
            </div>
          </router-link>
        </div>

        <nav class="header__nav-right">
          <ul class="header__desktop-nav-list">
            <li class="header__desktop-nav-item">
              <router-link to="/reservation" class="header__desktop-nav-link">Reservation</router-link>
            </li>
            <li class="header__desktop-nav-item">
              <router-link to="/contact" class="header__desktop-nav-link">Contact Us</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VBtn } from 'vuetify/components';
import { useAuthStore } from '../stores/useAuthStore';
import { useGoogleAuthStore } from '../stores/useGoogleAuthStore';

// Importar los stores que ya tienen configurada la persistencia
const authStore = useAuthStore();
const googleAuthStore = useGoogleAuthStore();

const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);
// Comprobación inicial para verificar si los stores tienen datos persistentes
onMounted(() => {
  // No es necesario hacer nada aquí, los stores ya se cargan automáticamente
  // gracias a pinia-plugin-persistedstate
  console.log('Header mounted, auth status:', isAuthenticated.value);
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;

  // Bloquear el scroll cuando el menú está abierto
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;

  // Restaurar el scroll
  document.body.style.overflow = '';
  document.body.style.height = '';
  document.body.style.position = '';
  document.body.style.width = '';
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Computed para verificar si hay un usuario autenticado
const isAuthenticated = computed(() => {
  return !!(authStore.user || googleAuthStore.user);
});

// Computed para obtener los datos del usuario actual
interface User {
  Nombre: string;
  Correo?: string;
  PictureUrl?: string;
}

// Define un tipo para los posibles usuarios de los diferentes stores
interface AuthUser {
  nombre?: string;
  Nombre?: string;
  name?: string;
  displayName?: string;
  correo?: string;
  Correo?: string;
  email?: string;
  PictureUrl?: string;
  pictureUrl?: string;
  photoURL?: string;
}

const currentUser = computed<User | null>(() => {
  const user = authStore.user || googleAuthStore.user as AuthUser | null;

  if (!user) return null;

  // Intentar obtener el nombre de múltiples formas posibles
  const nombre =
    user.nombre ||
    user.Nombre ||
    user.name ||
    user.displayName ||
    'Usuario';

  const correo =
    user.correo ||
    user.Correo ||
    user.email ||
    '';

  return {
    Nombre: nombre,
    Correo: correo,
    PictureUrl: user.PictureUrl || user.pictureUrl || user.photoURL || "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  };
});

const userImage = computed(() => {
  return currentUser.value?.PictureUrl || "https://cdn-icons-png.flaticon.com/128/149/149071.png";
});

const handleLogout = () => {
  isDropdownOpen.value = false;
  authStore.logout();
  googleAuthStore.logout();
};

// const scrollToChef = () => {
//   const element = document.getElementById('chef-special');
//   if (element) {
//     const headerOffset = 80; 
//     const elementPosition = element.getBoundingClientRect().top;
//     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
//     window.scrollTo({
//       top: offsetPosition,
//       behavior: 'smooth'
//     });
//   }
// };

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

.header {
  font-family: 'Poppins', sans-serif;
  color: #eaeaea;
  position: relative;
  z-index: 1000;
}

/* ================= MOBILE ================= */
.header__mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000;
  padding: 0.75rem 1rem;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header__burger {
  background: none;
  border: none;
  cursor: pointer;
  color: #d1a75f;
  position: relative;
  z-index: 110;
  transition: transform 0.3s ease;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__burger-icon {
  font-size: 1.8rem;
}

.header__burger:active {
  transform: scale(0.9);
}

.header__close {
  font-size: 1.8rem;
  color: #d1a75f;
}

.header__logo-mobile {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 110;
}

.header__logo-animation {
  transition: transform 0.3s ease;
}

.header__logo-animation:hover {
  transform: scale(1.02);
}

.header__logo-svg {
  width: 150px;
  height: auto;
  overflow: visible;
}

.header__logo-text-main {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  fill: url(#goldGradient);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: fill 0.3s ease, filter 0.5s ease;
}

.header__logo-text-restaurant {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  font-weight: 400;
  fill: #eaeaea;
  letter-spacing: 2px;
  transition: fill 0.3s ease;
}

.header__logo-animation:hover .header__logo-text-main {
  fill: #f3cc74;
  filter: drop-shadow(0 0 5px rgba(209, 167, 95, 0.6));
}

.header__logo-animation:hover .header__logo-text-restaurant {
  fill: #ffffff;
}

.header__icons-mobile {
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 110;
}

.header__icon {
  background: linear-gradient(to bottom, #f5f2e9, #e8e2d0);
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.header__icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.header__icon:active {
  transform: translateY(0);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}

.header__icon i,
.header__icon .icon {
  color: #073a34;
  font-size: 1rem;
}

.header__notification {
  background: linear-gradient(to bottom right, #d1a75f, #b78a3f);
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  min-width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -5px;
  border: 2px solid #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(209, 167, 95, 0.7);
  }

  70% {
    box-shadow: 0 0 0 8px rgba(209, 167, 95, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(209, 167, 95, 0);
  }
}

/* Avatar y dropdown */
.header__user-dropdown {
  position: relative;
}

.header__avatar-container {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.header__avatar-container:hover {
  transform: translateY(-2px);
}

.header__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #d1a75f;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.header__avatar-name {
  color: #eaeaea;
  font-weight: 500;
  display: none;
  /* Ocultar en móvil */
}

.header__user-dropdown--desktop .header__avatar-name {
  display: inline;
  /* Mostrar en desktop */
}

.header__avatar-icon {
  margin-left: 0.25rem;
  color: #d1a75f;
}

.header__dropdown-menu {
  position: absolute;
  right: 0;
  top: 50px;
  width: 280px;
  background: #fff;
  border-radius: 10px;
  border: #158d7f solid;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 100;
}

.header__dropdown-header {
  background: linear-gradient(45deg, #012422, #073a34);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__dropdown-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #d1a75f;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}

.header__dropdown-info {
  flex: 1;
}

.header__dropdown-name {
  color: #fff;
  font-weight: 600;
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
}

.header__dropdown-email {
  color: #d1a75f;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 300;
}

.header__dropdown-links {
  padding: 1rem;
}

.header__dropdown-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  color: #333;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.header__dropdown-link:hover {
  background: #f5f5f5;
  color: #073a34;
}

.header__dropdown-link svg {
  color: #073a34;
  width: 18px;
}

.header__logout-btn {
  margin: 0.5rem 1rem 1rem !important;
  background-color: #d1a75f !important;
  color: #000 !important;
  font-weight: 600 !important;
  padding: 0.5rem 1rem !important;
  width: calc(100% - 2rem) !important;
  border-radius: 6px !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  transition: background-color 0.3s ease, transform 0.2s ease !important;
}

.header__logout-btn:hover {
  background-color: #c09346 !important;
  transform: translateY(-2px);
}

.header__logout-btn:active {
  transform: translateY(0);
}

.header__logout-icon {
  font-size: 0.9rem;
}

/* Transiciones para dropdown */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ================= MENÚ MÓVIL MEJORADO ================= */
.header__mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  backdrop-filter: blur(5px);
}

.header__nav-mobile {
  position: relative;
  width: 90%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  background: linear-gradient(135deg, #004d40 0%, #00332b 100%);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border: 1px solid rgba(209, 167, 95, 0.2);
}

/* Añadir un título al menú */
.header__nav-mobile::before {
  content: 'MENÚ';
  display: block;
  width: 100%;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #d1a75f;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 3px;
}

.header__nav-list {
  list-style: none;
  padding: 0;
  width: 85%;
  margin: 0 0 2rem;
}

.header__nav-item {
  margin-bottom: 0.8rem;
  width: 100%;
}

.header__nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  width: 100%;
}

.header__nav-link:hover {
  background: rgba(209, 167, 95, 0.15);
  color: #d1a75f;
  transform: translateX(5px);
}

.header__nav-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(209, 167, 95, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.header__nav-link:hover .header__nav-icon-box {
  background: rgba(209, 167, 95, 0.3);
  transform: scale(1.1);
}

.header__nav-icon {
  color: #d1a75f;
  font-size: 1rem;
}

.header__social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 85%;
  justify-content: center;
}

.header__social-link {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(209, 167, 95, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d1a75f;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.header__social-link:hover {
  background: rgba(209, 167, 95, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.header__social-link--twitter {
  opacity: 0.85;
}

/* Animaciones para el menú móvil */
.menu-reveal-enter-active,
.menu-reveal-leave-active {
  transition: all 0.3s ease;
}

.menu-reveal-enter-from,
.menu-reveal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* ================= BARRA DE BÚSQUEDA ================= */
.header__search-bar {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(to right, #073a34, #052422);
  padding: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 50;
}

.header__search-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
}

.header__search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 1.5rem;
  border: none;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.95);
  font-size: 1rem;
  color: #333;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.header__search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #d1a75f, inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header__search-close {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  color: #073a34;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.header__search-close:hover {
  transform: rotate(90deg);
}

/* Animación para la barra de búsqueda */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ================= DESKTOP ================= */
.header__top,
.header__bottom {
  display: none;
}

.header__top {
  background: linear-gradient(to right, #012422, #073a34, #012422);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(209, 167, 95, 0.3);
}

.header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__schedule-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header__schedule-icon {
  color: #d1a75f;
}

.header__schedule {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 1px;
}

.header__top-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header__social-desktop {
  display: flex;
  gap: 0.8rem;
}

.header__social-desktop .header__social-link {
  width: 32px;
  height: 32px;
  font-size: 1rem;
  color: #d1a75f;
  background: transparent;
  border: 1px solid rgba(209, 167, 95, 0.3);
}

.header__social-desktop .header__social-link:hover {
  background: #d1a75f;
  color: #012422;
  border-color: #d1a75f;
}

.header__icons {
  display: flex;
  gap: 1rem;
}

.header__icon--search {
  transition: background 0.3s ease;
}

.header__icon--search:hover {
  background: #d1a75f;
}

.header__icon--search:hover .icon {
  color: #fff;
}

.header__bottom {
  background: linear-gradient(to right, #000, #041817, #000);
  padding: 1.5rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header__nav-left,
.header__nav-right {
  flex: 1;
}

.header__desktop-nav-list {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.header__nav-left .header__desktop-nav-list {
  justify-content: flex-end;
  padding-right: 2rem;
}

.header__nav-right .header__desktop-nav-list {
  justify-content: flex-start;
  padding-left: 2rem;
}

.header__desktop-nav-item {
  position: relative;
}

.header__desktop-nav-link {
  color: #eaeaea;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
}

.header__desktop-nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #d1a75f;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: right center;
}

.header__desktop-nav-link:hover {
  color: #d1a75f;
}

.header__desktop-nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left center;
}

.header__logo--desktop {
  position: relative;
  width: 300px;
}

.header__logo-svg-desktop {
  width: 305px;
  height: auto;
  overflow: visible;
}

.header__logo-desktop-text-main {
  font-family: 'Playfair Display', serif;
  font-size: 42px;
  font-weight: 700;
  fill: url(#goldGradientDesktop);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: fill 0.3s ease, filter 0.5s ease;
}

.header__logo-desktop-text-restaurant {
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 400;
  fill: #eaeaea;
  letter-spacing: 3px;
  transition: fill 0.3s ease;
}

.header__logo-animation:hover .header__logo-desktop-text-main {
  fill: #f3cc74;
  filter: drop-shadow(0 0 8px rgba(209, 167, 95, 0.7));
}

.header__logo-animation:hover .header__logo-desktop-text-restaurant {
  fill: #ffffff;
}

/* User dropdown en desktop */
.header__user-dropdown--desktop {
  display: none;
}

/* MOSTRAR BARRA SUPERIOR/INFERIOR EN ESCRITORIO, OCULTAR BARRA MÓVIL */
@media (min-width: 768px) {

  .header__mobile,
  .header__mobile-menu {
    display: none;
  }

  .header__top,
  .header__bottom {
    display: block;
  }

  .header__user-dropdown--desktop {
    display: block;
  }

  /* Ajustes para el dropdown en desktop */
  .header__user-dropdown--desktop .header__avatar-container {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 0.3rem 0.8rem;
    border: 1px solid rgba(209, 167, 95, 0.3);
  }

  .header__user-dropdown--desktop .header__avatar {
    width: 32px;
    height: 32px;
  }

  .header__user-dropdown--desktop .header__avatar-name {
    font-size: 0.9rem;
  }

  .header__user-dropdown--desktop .header__dropdown-menu {
    right: 0;
    top: 45px;
  }
}
</style>