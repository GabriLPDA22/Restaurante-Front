<script setup lang="ts">
// No specific logic required yet
</script>

<template>
  <main class="home-view">
    <section class="home-view__hero">
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
    background: url('/src/assets/hero-background.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    min-height: 100vh;
    color: #f9efe6;

    @media (min-width: 768px) {
      padding: 3rem 4rem;
    }
  }

  &__nav {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    &-list {
      display: flex;
      gap: 2rem;
      list-style: none;
      padding: 0;
      margin: 0;

      @media (min-width: 768px) {
        gap: 3rem;
      }
    }

    &-link {
      text-decoration: none;
      color: #f9efe6;
      font-weight: 500;
      font-size: 1rem;
      transition: color 0.3s;

      &:hover {
        color: #d3b486;
      }

      @media (min-width: 768px) {
        font-size: 1.125rem;
      }
    }
  }

  &__logo {
    text-align: center;
    margin-bottom: 2rem;

    &__brand {
      font-size: 2.5rem;
      font-weight: 700;
      color: #d3b486;
      margin-bottom: 0.5rem;

      @media (min-width: 768px) {
        font-size: 3rem;
      }
    }

    &__tagline {
      font-size: 1.125rem;
      font-style: italic;
      color: #f9efe6;

      @media (min-width: 768px) {
        font-size: 1.25rem;
      }
    }
  }

  &__content {
    text-align: center;
    max-width: 700px;
    margin-top: auto;
    margin-bottom: auto;

    @media (min-width: 768px) {
      max-width: 800px;
    }
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #d3b486;

    @media (min-width: 768px) {
      font-size: 3.5rem;
    }
  }

  &__subtitle {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 2.5rem;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  &__actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;

    &-button {
      padding: 0.75rem 2.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: 600;

      &--reserve {
        background-color: #d3b486;
        color: #093035;
        transition: background-color 0.3s;

        &:hover {
          background-color: #bf9a22;
        }
      }

      &--contact {
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: #fff;
          color: #093035;
        }
      }
    }
  }
}
</style>