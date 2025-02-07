<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import ContactPage from './views/ContactPage.vue';
</script>

<template>
  <HeaderComponent/>
  <div>
    <!-- <ContactPage/> -->
  </div>
  <FooterComponent/>
</template>

<style scoped />
