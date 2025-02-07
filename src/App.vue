<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <HeaderComponent />
  <router-view></router-view>
  <FooterComponent />
</template>
