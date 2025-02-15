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
          <!-- SVG "hecho a mano" sin etiqueta <style> interna, reducido a 200px -->
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
        <button class="header__icon" aria-label="Cart">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" class="icon" />
          <span class="header__notification">4</span>
        </button>

        <!-- 🔥 Si el usuario está autenticado, mostrar su foto y menú desplegable -->
        <div class="header__user-dropdown" v-if="authStore.user">
          <img :src="(authStore.user as any).PictureUrl" alt="User Avatar" class="header__avatar"
            @click="toggleDropdown" />
          <div class="header__dropdown-menu" v-if="isDropdownOpen">
            <p>{{ (authStore.user as any).Nombre }}</p>
            <p>{{ (authStore.user as any).Correo }}</p>
            <button @click="authStore.logout">Logout</button>
          </div>
        </div>

        <!-- 🔥 Si NO está autenticado, mostrar el icono normal y redirigir a /login -->
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
          <li><router-link to="#" @click="closeMenu">Reservation</router-link></li>
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

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';

export default defineComponent({
  name: 'HeaderComponent',
  setup() {
    const authStore = useAuthStore();
    const isMenuOpen = ref(false);
    const isDropdownOpen = ref(false);

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

    onMounted(() => {
      authStore.fetchUserFromDB();
    });

    return {
      authStore,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      isDropdownOpen,
      toggleDropdown
    };
  },
});
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

.header__user {
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
}

.header__avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  color: #093B35; // Aplicando el color específico a los íconos
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

/* Bloquea el scroll cuando el menú está abierto */
body.no-scroll,
html.no-scroll {
  overflow: hidden;
}

/* ================= DESKTOP (oculto en mobile) ================= */
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
    color: #093B35; // Aplicando el color a los íconos
    font-size: 1.2rem;
    transition: color 0.3s ease-in-out;
  }

  .header__icon:hover .icon {
    color: #d1a75f; // Color en hover
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
</style>
