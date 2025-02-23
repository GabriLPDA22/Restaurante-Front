<template>
    <div class="floating-decor">
      <div
        v-for="item in items"
        :key="item.id"
        class="floating-decor__item"
        :style="{
          top: item.y + 'px',
          left: item.x + 'px',
          backgroundImage: 'url(' + item.image + ')'
        }"
      ></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useFloatingDecorStore } from '@/stores/useFloatingDecorStore'
  
  const decorStore = useFloatingDecorStore()
  const items = decorStore.items
  </script>
  
  <style lang="scss" scoped>
  .floating-decor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
  
    @media (max-width: 992px) {
      display: none; 
    }
  }
  
  .floating-decor__item {
    position: absolute;
    width: 300px;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  </style>
  