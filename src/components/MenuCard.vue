<script setup lang="ts">
defineProps({
  title: String,
  image: String,
});
</script>

<template>
  <div class="menu-card">
    <div class="menu-card__image-wrapper">
      <img :src="image" :alt="title" class="menu-card__image" />
    </div>
    <p class="menu-card__title">{{ title }}</p>
  </div>
</template>

<style lang="scss" scoped>
.menu-card {
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  color: #f9efe6;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;

  &__image-wrapper {
    width: 100%;
    height: 180px; /* Altura fija */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Evita la distorsión */
  }

  &__title {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 12px;
  }
}
</style>
