<template>
  <header class="header">
    <!-- BARRA MÓVIL -->
    <div class="header__mobile">
      <button class="header__burger" aria-label="Open Menu" @click="toggle">
        <i class="fa fa-bars"></i>
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

    <!-- MENÚ DESPLEGABLE MÓVIL: se muestra si hamburger.isOpen === true -->
    <div v-if="hamburger.isOpen" class="header__mobile-menu">
      <nav class="header__nav">
        <ul>
          <li><a href="#" @click="hamburger.close">Menu</a></li>
          <li><a href="#" @click="hamburger.close">Events</a></li>
          <li><a href="#" @click="hamburger.close">About Us</a></li>
          <li><a href="#" @click="hamburger.close">Reservation</a></li>
          <li><a href="#" @click="hamburger.close">Orders</a></li>
          <li><a href="#" @click="hamburger.close">Contact Us</a></li>
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
import { defineComponent } from 'vue';
import { useHamburgerStore } from '@/stores/hamburger'; 

export default defineComponent({
  name: 'HeaderComponent',
  setup() {
    // Usamos el store de pinia
    const hamburger = useHamburgerStore();

    // Podríamos exponer un atajo para togglear
    const toggle = () => {
      hamburger.toggle();
    };

    return {
      hamburger,
      toggle,
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
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  padding: 0.75rem 1rem;
}

/* Ícono hamburguesa */
.header__burger {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #d1a75f;
}

/* Logo móvil más grande */
.header__logo-mobile .header__svg {
  width: 200px;
  /* Ajusta el tamaño */
  display: block;
  margin: 0 auto;
}

/* Iconos a la derecha en móvil */
.header__icons-mobile {
  display: flex;
  gap: 1rem;
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

.header__notification {
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  background-color: #d1a75f;
  color: #013031;
  font-size: 0.75rem;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

/* Tipos & colores SVG en móvil */
.header__brand {
  fill: #d1a75f;
  font-size: 28px;
  font-family: 'Times New Roman', serif;
  font-weight: 700;
}

.header__tagline {
  fill: #7a7a7a;
  font-size: 16px;
  letter-spacing: 0.1rem;
  font-weight: 400;
}

/* Menú desplegable en móvil */
.header__mobile-menu {
  background-color: #000;
  padding: 1rem;

  .header__nav {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-bottom: 0.75rem;

        a {
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
  }
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
