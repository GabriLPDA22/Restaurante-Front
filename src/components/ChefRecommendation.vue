<script setup lang="ts">
import { defineProps } from 'vue';

// Props for the chef recommendation
const props = defineProps<{
  title: string;
  description: string;
  price: string;
  image: string;
}>();

// Generate star rating
const generateStars = (count: number = 5) => {
  return Array(count).fill('★');
};
</script>

<template>
  <section class="chef-recommendation">
    <div class="chef-recommendation__container">
      <div class="chef-recommendation__content">
        <div class="chef-recommendation__text">
          <h2 class="chef-recommendation__title">Chef's Special</h2>
          <div class="chef-recommendation__dish-info">
            <h3 class="chef-recommendation__dish-name">{{ title }}</h3>
            <div class="chef-recommendation__rating-price">
              <div class="chef-recommendation__stars">
                <span v-for="(star, index) in generateStars()" :key="index" class="chef-recommendation__star">
                  {{ star }}
                </span>
              </div>
              <span class="chef-recommendation__price">{{ price }}</span>
            </div>
          </div>

          <p class="chef-recommendation__description">
            {{ description }}
          </p>

          <div class="chef-recommendation__actions">
            <button class="chef-recommendation__btn chef-recommendation__btn--primary">
              Order Now
            </button>
            <button class="chef-recommendation__btn chef-recommendation__btn--secondary">
              View Details
            </button>
          </div>
        </div>

        <div class="chef-recommendation__image-container">
          <img :src="image" :alt="title" class="chef-recommendation__image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// Color Variables
$color-background-dark: #121212;
$color-primary: #d3b486;
$color-text-light: #eaeaea;
$color-text-muted: #a0a0a0;
$color-star: #f9c74f;

.chef-recommendation {
  background-color: $color-background-dark;
  color: $color-text-light;
  padding: 4rem 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    @media (min-width: 992px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__text {
    flex: 1;
    max-width: 600px;
    text-align: center;

    @media (min-width: 992px) {
      text-align: left;
      padding-right: 2rem;
    }
  }

  &__title {
    color: $color-primary;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;

    @media (min-width: 992px) {
      font-size: 2rem;
    }
  }

  &__dish-info {
    margin-bottom: 1.5rem;
  }

  &__dish-name {
    color: $color-primary;
    font-size: 2rem;
    margin-bottom: 0.5rem;

    @media (min-width: 992px) {
      font-size: 2.5rem;
    }
  }

  &__rating-price {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    @media (min-width: 992px) {
      justify-content: flex-start;
    }
  }

  &__stars {
    display: flex;
    color: $color-star;
  }

  &__star {
    font-size: 1.2rem;
    margin-right: 0.25rem;

    @media (min-width: 992px) {
      font-size: 1.5rem;
    }
  }

  &__price {
    color: $color-primary;
    font-size: 1.2rem;
    font-weight: bold;

    @media (min-width: 992px) {
      font-size: 1.5rem;
    }
  }

  &__description {
    color: $color-text-muted;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1rem;

    @media (min-width: 992px) {
      font-size: 1.1rem;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    @media (min-width: 992px) {
      flex-direction: row;
    }
  }

  &__btn {
    padding: 0.75rem 1.5rem;
    border-radius: 30px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    width: 100%;

    @media (min-width: 992px) {
      width: auto;
    }

    &--primary {
      background-color: $color-primary;
      color: $color-background-dark;

      &:hover {
        background-color: $color-primary;
      }
    }

    &--secondary {
      background-color: transparent;
      color: $color-text-light;
      border: 2px solid $color-text-light;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }

  &__image-container {
    max-width: 400px;
    width: 100%;
  }

  &__image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}
</style>