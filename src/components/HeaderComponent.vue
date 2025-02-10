<template>
  <header class="header">
    <div class="header__top-bar">
      <p class="header__hours">SUNDAY - THURSDAY: 11:30AM - 11PM | FRIDAY & SATURDAY: 11:30AM - 12AM</p>
      <nav class="header__icons">
        <div class="header__icon-wrapper">
          <button aria-label="Search" class="header__icon header__icon--search"></button>
        </div>
        <div class="header__icon-wrapper">
          <button aria-label="Favorites" class="header__icon header__icon--favorites">
            <span class="header__icon-badge">2</span>
          </button>
        </div>
        <div class="header__icon-wrapper">
          <button aria-label="Cart" class="header__icon header__icon--cart">
            <span class="header__icon-badge">4</span>
          </button>
        </div>
        <div class="header__icon-wrapper">
          <button aria-label="Profile" class="header__icon header__icon--profile"></button>
        </div>
      </nav>
    </div>

    <div class="header__main">
      <!-- Botón de hamburguesa visible siempre en móvil -->
      <button aria-label="Menu" class="header__menu-btn">☰</button>
      <li><a href="#menu" class="header__nav-item">Menu</a></li>
      <li><a href="#events" class="header__nav-item">Events</a></li>
      <li><a href="#about-us" class="header__nav-item">About Us</a></li>
      <h1 class="header__logo">PARTOW FOODS <span class="header__subtitle">RESTAURANT</span></h1>
      <li><a href="#reservation" class="header__nav-item">Reservation</a></li>
      <li><a href="#orders" class="header__nav-item">Orders</a></li>
      <li><a href="#contact-us" class="header__nav-item">Contact Us</a></li>

      <!-- Iconos adicionales añadidos -->
      <nav class="header__mobile-icons">
        <div class="header__icon-wrapper">
          <button aria-label="Cart" class="header__icon header__icon--cart">
            <span class="header__icon-badge">4</span>
          </button>
        </div>
        <div class="header__icon-wrapper">
          <button aria-label="Profile" class="header__icon header__icon--profile"></button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderComponent'
});
</script>

<style lang="scss" scoped>
.header {
  &__mobile-icons {
    display: flex;
    /* Visible por defecto en móviles */
    gap: 0.5rem;

    @media (min-width: 768px) {
      display: none;
      /* Se oculta en pantallas grandes */
    }
  }

  &__top-bar {
    display: none;
    text-align: center;
    font-size: 0.875rem;
    background-color: #002c2b;
    color: #fff;
    padding: 0.5rem;
  }

  &__main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #000;
  }

  &__menu-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    display: block;

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__logo {
    font-size: 1.25rem;
    color: #d4af37;
    text-align: center;
  }

  &__subtitle {
    display: block;
    font-size: 0.75rem;
    color: #fff;
  }

  &__icons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  &__icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;

    &--search {
      background-image: url('/icons/search.svg');
      background-size: cover;
      width: 1.5rem;
      height: 1.5rem;
    }

    &--favorites {
      background-image: url('/icons/favorites.svg');
      background-size: cover;
      width: 1.5rem;
      height: 1.5rem;
    }

    &--cart {
      background-image: url('/icons/cart.svg');
      background-size: cover;
      width: 1.5rem;
      height: 1.5rem;
    }

    &--profile {
      background-image: url('/icons/profile.svg');
      background-size: cover;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  &__icon-badge {
    background: #d4af37;
    color: #000;
    border-radius: 50%;
    font-size: 0.75rem;
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -0.5rem;
  }

  @media (min-width: 768px) {
    &__top-bar {
      display: flex;
      justify-content: space-between;
    }

    &__main {
      padding: 1rem 2rem;
    }
  }
}
</style>
