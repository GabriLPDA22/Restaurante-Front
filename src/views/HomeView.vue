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
    padding: 16px;
    min-height: 100vh;
    color: #f9efe6;

    @media (min-width: 768px) {
      padding: 32px 24px;
    }

    @media (min-width: 1024px) {
      padding: 48px 64px;
    }
  }

  &__nav {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 12px;

    &-list {
      display: flex;
      gap: 16px;
      list-style: none;
      padding: 0;
      margin: 0;

      @media (min-width: 768px) {
        gap: 24px;
      }

      @media (min-width: 1024px) {
        gap: 32px;
      }
    }

    &-link {
      text-decoration: none;
      color: #f9efe6;
      font-weight: 500;
      font-size: 14px;
      transition: color 0.3s;

      &:hover {
        color: #d3b486;
      }

      @media (min-width: 768px) {
        font-size: 16px;
      }

      @media (min-width: 1024px) {
        font-size: 18px;
      }
    }
  }

  &__logo {
    text-align: center;
    margin-bottom: 24px;

    &__brand {
      font-size: 24px;
      font-weight: 700;
      color: #d3b486;
      margin-bottom: 4px;

      @media (min-width: 768px) {
        font-size: 32px;
      }

      @media (min-width: 1024px) {
        font-size: 40px;
      }
    }

    &__tagline {
      font-size: 14px;
      font-style: italic;
      color: #f9efe6;

      @media (min-width: 768px) {
        font-size: 16px;
      }

      @media (min-width: 1024px) {
        font-size: 18px;
      }
    }
  }

  &__content {
    text-align: center;
    max-width: 90%;
    margin: auto;

    @media (min-width: 768px) {
      max-width: 700px;
    }

    @media (min-width: 1024px) {
      max-width: 800px;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #d3b486;

    @media (min-width: 768px) {
      font-size: 32px;
    }

    @media (min-width: 1024px) {
      font-size: 40px;
    }
  }

  &__subtitle {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 24px;

    @media (min-width: 768px) {
      font-size: 20px;
    }

    @media (min-width: 1024px) {
      font-size: 24px;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 16px;
    }

    &-button {
      padding: 10px 24px;
      font-size: 14px;
      border: none;
      border-radius: 6px;
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
