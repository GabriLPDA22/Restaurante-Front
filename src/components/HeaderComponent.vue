<template>
  <header class="header">
    <!-- BARRA MÓVIL -->
    <div class="header__mobile">
      <button class="header__burger" aria-label="Toggle Menu" @click="toggleMenu">
        <span v-if="!isMenuOpen">☰</span>
        <span v-else class="header__close">✖</span>
      </button>

      <div class="header__logo-mobile">
        <svg class="header__svg" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet">
          <text x="50%" y="45%" text-anchor="middle" class="header__brand">
            PARTOW FOODS
          </text>
          <text x="50%" y="65%" text-anchor="middle" class="header__tagline">
            RESTAURANT
          </text>
        </svg>
      </div>

      <div class="header__icons-mobile">
        <button class="header__icon" aria-label="Cart">
          <i class="fa fa-shopping-cart"></i>
          <span class="header__notification">4</span>
        </button>
        <button class="header__icon" aria-label="User">
          <i class="fa fa-user"></i>
        </button>
      </div>
    </div>

    <!-- MENÚ DESPLEGABLE MÓVIL -->
    <div :class="['header__mobile-menu', { 'active': isMenuOpen }]" @click="closeMenu">
      <nav class="header__nav" @click.stop>
        <ul>
          <li><a href="#" @click="closeMenu">Menu</a></li>
          <li><a href="#" @click="closeMenu">Events</a></li>
          <li><a href="#" @click="closeMenu">About Us</a></li>
          <li><a href="#" @click="closeMenu">Reservation</a></li>
          <li><a href="#" @click="closeMenu">Orders</a></li>
          <li><a href="#" @click="closeMenu">Contact Us</a></li>
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
            <i class="fa fa-search"></i>
          </button>
          <button class="header__icon" aria-label="Favorites">
            <i class="fa fa-heart"></i>
            <span class="header__notification">2</span>
          </button>
          <button class="header__icon" aria-label="Cart">
            <i class="fa fa-shopping-cart"></i>
            <span class="header__notification">4</span>
          </button>
          <button class="header__icon" aria-label="User Profile">
            <i class="fa fa-user"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- BARRA INFERIOR (ESCRITORIO) -->
    <div class="header__bottom">
      <div class="header__container">
        <nav class="header__nav-left">
          <ul class="home-view__nav-list">
            <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Menu</a></li>
            <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Events</a></li>
            <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">About Us</a></li>
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
            <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Reservation</a></li>
            <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Orders</a></li>
            <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HeaderComponent',
  setup() {
    const isMenuOpen = ref(false);

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

    return {
      isMenuOpen,
      toggleMenu,
      closeMenu,
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
}

/* Ícono hamburguesa y cierre */
.header__burger {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  color: #d1a75f;
  display: flex;
  align-items: center;
  z-index: 105;
  transition: transform 0.3s ease-in-out;
}

.header__close {
  font-size: 2rem;
  color: #d1a75f;
}

/* Logo centrado */
.header__logo-mobile {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.header__logo-mobile .header__svg {
  width: 200px;
  display: block;
}

/* Iconos a la derecha */
.header__icons-mobile {
  display: flex;
  gap: 1rem;
  align-items: center;
  z-index: 105;
}

/* Iconos circulares */
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

  i {
    font-size: 1.2rem;
    color: #0a403f;
  }
}

/* MENÚ DESPLEGABLE ANIMADO */
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
  z-index: 90;
  pointer-events: none;
}

/* Cuando el menú está activo */
.header__mobile-menu.active {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

/* Lista del menú */
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

/* Bloquear el scroll en todo el documento cuando el menú está abierto */
body.no-scroll, html.no-scroll {
  overflow: hidden;
  height: 100vh;
  position: fixed;
  width: 100%;
}

/* ================= DESKTOP (oculto en mobile) ================= */
.header__top,
.header__bottom {
  display: none;
}

/* Barra superior (verde) */
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
}

/* Barra inferior (negra) */
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

  /* Logo escritorio más grande */
  .header__logo .header__svg {
    width: 300px;
    /* Ajusta para hacerlo más grande */
    display: block;
    margin: 0 auto;
  }

  .header__brand {
    fill: #d1a75f;
    font-size: 42px;
    /* Aún más grande */
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

/* Media Query desktop */
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