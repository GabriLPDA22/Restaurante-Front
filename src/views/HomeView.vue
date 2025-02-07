<script setup lang="ts">
// No specific logic required yet
</script>

<template>
  <main class="home-view">
    <section class="home-view__hero">
      <nav class="home-view__nav">
        <ul class="home-view__nav-list">
          <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Menu</a></li>
          <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Events</a></li>
          <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">About Us</a></li>
          <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Reservation</a></li>
          <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Orders</a></li>
          <li class="home-view__nav-item"><a href="#" class="home-view__nav-link">Contact Us</a></li>
        </ul>
      </nav>
      <div class="home-view__content">
        <h1 class="home-view__title">Fresh Ingredients Sourced Globally</h1>
        <h2 class="home-view__subtitle">Italian Inspired Cuisine</h2>
        <div class="home-view__actions">
          <button class="home-view__button home-view__button--reserve">Reserve Now</button>
          <button class="home-view__button home-view__button--contact">Contact Us</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.home-view {
  &__hero {
    background: url('@/assets/hero-background.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    padding: 2rem;
    color: #fff;
  }

  &__nav {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    &-list {
      display: flex;
      gap: 1.5rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &-link {
      text-decoration: none;
      color: #fff;
      font-weight: bold;
      font-size: 1rem;
      transition: color 0.3s;

      &:hover {
        color: #f0a500;
      }
    }
  }

  &__content {
    text-align: center;
    max-width: 700px;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-size: 1.75rem;
    font-weight: 400;
    margin-bottom: 2rem;
  }

  &__actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;

    &-button {
      padding: 0.75rem 2rem;
      font-size: 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;

      &--reserve {
        background-color: #f0a500;
        color: #fff;
        transition: background-color 0.3s;

        &:hover {
          background-color: #cf8500;
        }
      }

      &--contact {
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: #fff;
          color: #000;
        }
      }
    }
  }
}
</style>
