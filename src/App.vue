<script setup lang="ts">
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import { useGoogleAuthStore } from "@/stores/useGoogleAuthStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useGoogleAuthStore();
const isLoading = ref(true);
const router = useRouter();

// Función para cargar el script de Google dinámicamente
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

// Controlar el estado de carga
const startLoading = () => {
  isLoading.value = true;
};

const stopLoading = () => {
  // Pequeño retraso para una transición suave
  setTimeout(() => {
    isLoading.value = false;
  }, 1500); // Tiempo suficiente para ver el contenido del loader
};

// Inicializar la aplicación
onMounted(async () => {
  // Cargar script de Google
  await loadGoogleScript();
  authStore.initializeGoogleAuth();
  
  // Verificar si estamos en una ruta que requiere loader
  const currentPath = window.location.pathname;
  const dataLoadingRoutes = [
    '/cart',
    '/reservation',
    '/about'
  ];
  
  // SOLO mostrar el loader inicial si estamos en una página que carga datos
  if (dataLoadingRoutes.some(route => currentPath.includes(route))) {
    isLoading.value = true;
    setTimeout(() => {
      stopLoading();
    }, 2500);
  } else {
    // Si no estamos en una página con datos pesados, asegurarnos de que el loader está oculto
    isLoading.value = false;
  }
});

// Configurar hooks de navegación para mostrar el loader solo en rutas que cargan datos pesados
router.beforeEach((to, from, next) => {
  // IMPORTANTE: Solo activar el loader para las rutas específicas
  const dataLoadingRoutes = [
    '/cart',
    '/reservation',
    '/about'
  ];
  
  // Activamos el loader SOLAMENTE si vamos a una ruta que está en la lista
  if (dataLoadingRoutes.some(route => to.path.includes(route))) {
    startLoading();
  } else {
    // Para todas las demás rutas, asegurarnos de que el loader está oculto
    isLoading.value = false;
  }
  
  next();
});

router.afterEach((to) => {
  // Solo detener el loader si estamos en una ruta que lo activó
  const dataLoadingRoutes = [
    '/cart',
    '/reservation',
    '/about'
  ];
  
  if (dataLoadingRoutes.some(route => to.path.includes(route))) {
    setTimeout(() => {
      stopLoading();
    }, 1000);
  }
});
</script>

<template>
  <!-- Loader overlay que aparece solo cuando se necesita cargar datos -->
  <div class="loader-container" v-if="isLoading">
    <div class="loader-content">
      <div class="logo-animation">
        <div class="logo-text">ELIXIUM</div>
        <div class="logo-tagline">AUTHENTIC ITALIAN CUISINE</div>
        <div class="loader-line"></div>
      </div>
    </div>
  </div>

  <!-- Contenido de la aplicación -->
  <HeaderComponent />
  <main class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <FooterComponent />
</template>

<style>
/* Variables globales - Paleta de colores elegante para restaurante italiano */
:root {
  --italian-red: #9D2A27;
  --italian-green: #2D4D28;
  --italian-gold: #C5A572;
  --cream-white: #F8F5F0;
  --dark-wood: #3C2415;
  --text-dark: #1E1E1E;
  --text-light: #F8F5F0;
  --accent-color: #C5A572;
}

/* Fuentes para el restaurante - Es necesario asegurarse de importarlas */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500&display=swap');

/* Estilos para el contenedor principal */
.main-content {
  min-height: calc(100vh - 200px); /* Ajusta según el tamaño de tu header y footer */
  background-color: var(--cream-white);
}

/* Animación de transición entre páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos del Loader principal - Estilo elegante */
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(30, 30, 30, 0.97), rgba(40, 40, 40, 0.97));
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.3s ease-in-out;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.logo-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.8s ease-in-out;
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 700;
  color: var(--cream-white);
  letter-spacing: 8px;
  margin-bottom: 10px;
  text-transform: uppercase;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  animation: scaleIn 1s ease-out, glow 2s infinite alternate;
}

.logo-tagline {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: var(--italian-gold);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;
  animation: fadeIn 1.2s ease-in-out;
}

.loader-line {
  width: 60px;
  height: 2px;
  background-color: var(--italian-gold);
  position: relative;
  margin-top: 20px;
  animation: lineGrow 2s infinite;
}

.loader-line:before,
.loader-line:after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--italian-gold);
  top: -4px;
}

.loader-line:before {
  left: -5px;
  animation: dotPulse 2s infinite;
}

.loader-line:after {
  right: -5px;
  animation: dotPulse 2s infinite reverse;
}

@keyframes lineGrow {
  0% {
    width: 0;
    opacity: 0.3;
  }
  50% {
    width: 100px;
    opacity: 1;
  }
  100% {
    width: 0;
    opacity: 0.3;
  }
}

@keyframes dotPulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  to {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
}

/* Para dispositivos móviles */
@media (max-width: 768px) {
  .logo-text {
    font-size: 2.5rem;
    letter-spacing: 5px;
  }
  
  .logo-tagline {
    font-size: 0.8rem;
    letter-spacing: 2px;
  }
}
</style>