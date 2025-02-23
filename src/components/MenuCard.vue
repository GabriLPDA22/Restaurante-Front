<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Props para el card
const { title, image } = defineProps<{
  title: string;
  image: string;
}>();

// Emitir evento al hacer click
const emits = defineEmits(['click']);

const handleClick = () => {
  emits('click');
};
</script>

<template>
  <div class="menu-card" @click="handleClick">
    <img :src="image" :alt="title" class="menu-card__image" />
    <h3 class="menu-card__title">{{ title }}</h3>
  </div>
</template>

<style lang="scss" scoped>
.menu-card {
  background-color: #1e1e1e !important;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &__image {
    width: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: 16/9; /* Mantener proporción si lo deseas */
  }

  &__title {
    color: #eaeaea;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0.75rem 0;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
}

@media (min-width: 992px) {
  .menu-card {
    &__title {
      font-size: 1.1rem;
    }
  }
}
</style>

