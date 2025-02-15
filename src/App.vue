<script setup lang="ts">
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { useAuthStore } from "@/stores/authStore";
import { onMounted } from "vue";

const authStore = useAuthStore();

// ✅ Función para cargar el script de Google dinámicamente
const loadGoogleScript = () => {
  return new Promise<void>((resolve) => {
    if (document.getElementById("google-client-script")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = "google-client-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

onMounted(async () => {
  await loadGoogleScript();
  authStore.initializeGoogleAuth();
});

</script>

<template>
  <HeaderComponent />
  <router-view></router-view>
  <FooterComponent />
</template>
