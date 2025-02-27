<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Props for the card
const { title, image } = defineProps<{
  title: string;
  image: string;
}>();

// Emit click event
const emits = defineEmits(['click']);

const handleClick = () => {
  emits('click');
};
</script>

<template>
  <div class="menu-card" @click="handleClick">
    <div class="menu-card__image-container">
      <img :src="image" :alt="title" class="menu-card__image" />
    </div>
    <div class="menu-card__content">
      <h3 class="menu-card__title">{{ title }}</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// Color Variables
$color-background-dark: #1e1e1e;
$color-text-light: #eaeaea;
$color-primary: #d3b486;

.menu-card {
  background-color: $color-background-dark;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &__image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &__content {
    padding: 1rem;
    text-align: center;
    background-color: $color-background-dark;
  }

  &__title {
    color: $color-text-light;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);

    .menu-card__image {
      transform: scale(1.1);
    }

    .menu-card__title {
      color: $color-primary;
    }
  }

  @media (min-width: 768px) {
    &__title {
      font-size: 1.1rem;
    }
  }
}
</style>