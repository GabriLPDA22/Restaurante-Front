<template>
  <header class="header">
    <!-- BARRA MÓVIL -->
    <div class="header__mobile">
      <button class="header__burger" aria-label="Toggle Menu" @click="toggleMenu">
        <span v-if="!isMenuOpen">☰</span>
        <span v-else class="header__close">✖</span>
      </button>

      <div class="header__logo-mobile">
        <router-link to="/" aria-label="Ir a la página de inicio">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet"
            style="width:200px;">
            <text x="50%" y="50%" text-anchor="middle"
              style="font-family: 'Poppins', sans-serif; font-size:60px; fill:#d1a75f; font-weight:700;">
              PARTOW FOODS
            </text>
            <text x="50%" y="75%" text-anchor="middle"
              style="font-family: 'Poppins', sans-serif; font-size:40px; fill:#eaeaea;">
              RESTAURANT
            </text>
          </svg>
        </router-link>
      </div>

      <div class="header__icons-mobile">
        <button class="header__icon" aria-label="Cart" @click="toggleCart">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" class="icon" />
        </button>

        <!-- 🔥 Dropdown del usuario si está autenticado -->
        <div class="header__user-dropdown" v-if="isAuthenticated">
          <!-- Contenedor que muestra el avatar y el nombre, y abre/cierra el menú -->
          <div class="header__avatar-container" @click="toggleDropdown">
            <img :src="userImage" alt="User Avatar" class="header__avatar" />
            <span class="header__avatar-name">{{ currentUser?.Nombre }}</span>
            <i class="fa fa-chevron-down header__avatar-icon"></i>
          </div>

          <!-- Menú desplegable con transición "fade" -->
          <transition name="fade">
            <div class="header__dropdown-menu" v-if="isDropdownOpen">
              <p class="header__dropdown-name">{{ currentUser?.Nombre }}</p>
              <p class="header__dropdown-email">{{ currentUser?.Correo }}</p>

              <!-- Botón de Logout con Vuetify, estilizado con clase logout-btn -->
              <v-btn @click="handleLogout" elevation="2" rounded class="logout-btn">
                Logout
              </v-btn>
            </div>
          </transition>
        </div>

        <!-- 🔥 Si NO está autenticado, icono normal que redirige a /login -->
        <router-link v-else to="/login" class="header__icon" aria-label="User">
          <font-awesome-icon :icon="['fas', 'user']" class="icon" />
        </router-link>
      </div>
    </div>

    <!-- MENÚ DESPLEGABLE MÓVIL -->
    <div :class="['header__mobile-menu', { active: isMenuOpen }]" @click="closeMenu">
      <nav class="header__nav" @click.stop>
        <ul>
          <li><router-link to="/menu" @click="closeMenu">Menu</router-link></li>
          <li><router-link to="#" @click="closeMenu">Events</router-link></li>
          <li><router-link to="#" @click="closeMenu">About Us</router-link></li>
          <li><router-link to="/reservation" @click="closeMenu">Reservation</router-link></li>
          <li><router-link to="#" @click="closeMenu">Orders</router-link></li>
          <li><router-link to="/contact" @click="closeMenu">Contact Us</router-link></li>
        </ul>
      </nav>
    </div>

    <!-- BARRA SUPERIOR (ESCRITORIO) -->
    <div class="header__top">
      <div class="header__container">
        <p class="header__schedule">
          SUNDAY – THURSDAY: 11:30AM – 11PM | FRIDAY & SATURDAY: 11:30AM – 12AM
        </p>
        <div class="header__icons">
          <button class="header__icon" aria-label="Search">
            <font-awesome-icon :icon="['fas', 'search']" class="icon" />
          </button>
          <button class="header__icon" aria-label="Favorites">
            <font-awesome-icon :icon="['fas', 'heart']" class="icon" />
            <span class="header__notification">2</span>
          </button>
          <button class="header__icon" aria-label="Cart">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" class="icon" />
            <span class="header__notification">4</span>
          </button>
          <button class="header__icon" aria-label="User Profile">
            <font-awesome-icon :icon="['fas', 'user']" class="icon" />
          </button>
        </div>
      </div>
    </div>

    <!-- BARRA INFERIOR (ESCRITORIO) -->
    <div class="header__bottom">
      <div class="header__container">
        <nav class="header__nav-left">
          <ul class="home-view__nav-list">
            <li class="home-view__nav-item">
              <a href="#" class="home-view__nav-link">Menu</a>
            </li>
            <li class="home-view__nav-item">
              <a href="#" class="home-view__nav-link">Events</a>
            </li>
            <li class="home-view__nav-item">
              <a href="#" class="home-view__nav-link">About Us</a>
            </li>
          </ul>
        </nav>

        <div class="header__logo">
          <svg class="header__svg" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet" style="width:300px;">
            <text x="50%" y="45%" text-anchor="middle" class="header__brand" style="font-size:70px;">
              PARTOW FOODS
            </text>
            <text x="50%" y="65%" text-anchor="middle" class="header__tagline" style="font-size:35px;">
              RESTAURANT
            </text>
          </svg>
        </div>

        <nav class="header__nav-right">
          <ul class="home-view__nav-list">
            <li class="home-view__nav-item">
              <a href="#" class="home-view__nav-link">Reservation</a>
            </li>
            <li class="home-view__nav-item">
              <a href="#" class="home-view__nav-link">Orders</a>
            </li>
            <li class="home-view__nav-item">
              <router-link to="/contact" class="home-view__nav-link">Contact Us</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { VBtn } from 'vuetify/components';

const isCartOpen = ref(false);
const isMenuOpen = ref(false);
const isDropdownOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.classList.toggle('no-scroll', isMenuOpen.value);
  document.documentElement.classList.toggle('no-scroll', isMenuOpen.value);
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.classList.remove('no-scroll');
  document.documentElement.classList.remove('no-scroll');
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const isAuthenticated = computed(() => !!authStore.user || !!googleAuthStore.user);

interface IUser {
  Nombre?: string;
  Correo?: string;
  PictureUrl?: string;
}

const currentUser = computed<IUser | null>(() => {
  return (authStore.user || googleAuthStore.user) as IUser | null;
});

const userImage = computed(() => {
  return currentUser.value?.PictureUrl || "https://cdn-icons-png.flaticon.com/128/149/149071.png";
});

onMounted(() => {
  authStore.fetchUserFromDB();
});

const handleLogout = () => {
  isDropdownOpen.value = false;
  authStore.logout();
  googleAuthStore.logout();
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.header {
  font-family: 'Poppins', sans-serif;
  color: #eaeaea;
}

/* ================= MOBILE ================= */
.header__mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000;
  padding: 0.75rem 1rem;
  z-index: 100;
  position: relative;
}

.header__burger {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: #d1a75f;
  position: relative;
  z-index: 110;
}

.header__close {
  font-size: 2rem;
  color: #d1a75f;
  position: relative;
  z-index: 110;
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

.header__icons-mobile {
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 110;
}

.header__icon {
  background: #f5f2e9;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Estilos específicos para los iconos dentro de los botones */
.header__icon i,
.header__icon .icon {
  color: #093B35;
  font-size: 1rem;
}

.header__notification {
  background: #d1a75f;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -5px;
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
}

.header__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.header__avatar-name {
  color: #eaeaea;
  font-weight: 500;
}

.header__avatar-icon {
  margin-left: 0.25rem;
  color: #eaeaea;
}

.header__dropdown-menu {
  position: absolute;
  right: 0;
  color: #000;
  border-radius: 4px;
  z-index: 10;
}

.header__dropdown-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.header__dropdown-email {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

/* Botón de logout con Vuetify */
.logout-btn {
  /* Reemplaza color="error" por tu color dorado */
  background-color: #d1a75f !important;
  /* color principal */
  color: #000 !important;
  /* texto negro */
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0.5rem;
  width: 100%;
  justify-content: center;
  /* Centra el texto en el v-btn */
  border: solid 5px #fff;
}

/* Transición "fade" */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ================= MENÚ MÓVIL ================= */
.header__mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  z-index: 99;
  pointer-events: none;
}

.header__mobile-menu.active {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.header__mobile-menu .header__nav ul {
  list-style: none;
  padding: 0;
  text-align: center;
  margin: 0;

  li {
    margin-bottom: 1.5rem;
  }

  a {
    color: #eaeaea;
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #d1a75f;
    }
  }
}

body.no-scroll,
html.no-scroll {
  overflow: hidden;
}

/* ================= DESKTOP ================= */
.header__top,
.header__bottom {
  display: none;
}

.header__top {
  background-color: #013031;
  padding: 0.75rem 0;

  .header__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__schedule {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
  }

  .header__icons {
    display: flex;
    gap: 1rem;
  }

  .header__icon .icon {
    color: #093B35;
    font-size: 1.2rem;
    transition: color 0.3s ease-in-out;
  }

  .header__icon:hover .icon {
    color: #d1a75f;
  }
}

.header__bottom {
  background-color: #000;
  padding: 1rem 0;

  .header__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__nav-left,
  .header__nav-right {
    .home-view__nav-list {
      list-style: none;
      display: flex;
      gap: 1rem;
      margin: 0;
      padding: 0;

      .home-view__nav-link {
        color: #eaeaea;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 600;

        &:hover {
          color: #d1a75f;
        }
      }
    }
  }

  .header__logo .header__svg {
    width: 300px;
    display: block;
    margin: 0 auto;
  }

  .header__brand {
    fill: #d1a75f;
    font-size: 42px;
    font-family: 'Times New Roman', serif;
    font-weight: 700;
  }

  .header__tagline {
    fill: #7a7a7a;
    font-size: 20px;
    letter-spacing: 0.1rem;
    font-weight: 400;
  }
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
}

/* CARD MENU MODAL MOBILE */

.cart-dropdown {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 300px;
  max-height: 250px;
  background: #fef3c7;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  padding: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cart-dropdown__title {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  color: #064e3b;
}

.cart-dropdown__items {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #d1a75f;
  width: 100%;
  justify-content: space-between;
}

.cart-item__image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
}

.cart-item__name,
.cart-item__price {
  font-size: 14px;
  color: #2d2d2d;
  margin: 0;
}

.cart-item__actions {
  display: flex;
  gap: 5px;
}

.cart-button {
  background: #064e3b;
  color: white;
  border: none;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: background 0.3s;

  &:hover {
    background: #043d2a;
  }
}

.cart-button--delete {
  background: #d9534f;

  &:hover {
    background: #c9302c;
  }
}

.cart-dropdown__empty {
  text-align: center;
  font-size: 14px;
  color: #666;
  padding: 10px;
}
</style>
