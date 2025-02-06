<template>
  <header class="header">
    <div class="header__info">
      <p class="header__schedule">
        SUNDAY - THURSDAY: 11:30AM - 11PM | FRIDAY & SATURDAY: 11:30AM - 12AM
      </p>
    </div>
    <div class="header__icons">
      <button class="header__icon" aria-label="Search">
        <i class="icon icon--search"></i>
      </button>
      <button class="header__icon" aria-label="Favorites">
        <i class="icon icon--heart"></i>
        <span class="header__notification">2</span>
      </button>
      <button class="header__icon" aria-label="Cart">
        <i class="icon icon--cart"></i>
        <span class="header__notification">1</span>
      </button>
      <button class="header__icon" aria-label="User Profile">
        <i class="icon icon--user"></i>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #002c2c;
  color: #eaeaea;
  font-family: 'Arial', sans-serif;

  &__info {
    margin-bottom: 1rem;
    text-align: center;
  }

  &__schedule {
    font-size: 0.875rem;
  }

  &__icons {
    display: flex;
    gap: 1rem;
  }

  &__icon {
    background: none;
    border: none;
    cursor: pointer;
    position: relative;

    .icon {
      font-size: 1.5rem;
      color: #eaeaea;

      &--search {}
      &--heart {}
      &--cart {}
      &--user {}
    }
  }

  &__notification {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background-color: #d1a75f;
    color: #002c2c;
    font-size: 0.75rem;
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
}

@media (min-width: 768px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 2rem;

    &__info {
      margin-bottom: 0;
      text-align: left;
    }
  }
}
</style>
