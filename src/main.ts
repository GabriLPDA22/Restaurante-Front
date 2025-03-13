import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // Añadir esta importación

import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Font Awesome
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  faSearch, faHeart, faShoppingCart, faUser,
  faBell, faStar, faTicket
} from '@fortawesome/free-solid-svg-icons';

// Google Login
import GoogleLoginPlugin from 'vue3-google-login';

// Configuraciones Font Awesome
config.familyDefault = "classic";
config.styleDefault = "duotone";
library.add(
  faInstagram, faFacebook, faSearch, faHeart,
  faShoppingCart, faUser, faBell, faStar, faTicket
);

// Crear y configurar Pinia ANTES de cualquier uso
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Añadir el plugin de persistencia

// Configurar Vuetify
const vuetify = createVuetify({ components, directives });

// Crear la instancia de la app
const app = createApp(App);

// Usar Pinia ANTES de cualquier store
app.use(pinia);

// Ahora es seguro importar y usar stores
import { useGoogleAuthStore } from '@/stores/useGoogleAuthStore';

// Registrar el plugin de Google
app.use(GoogleLoginPlugin, {
  clientId: "812430762080-ktkqmivkpjo15cnid2ch4dd217r04v4l.apps.googleusercontent.com",
  onScriptLoad: () => {
    console.log("Google script loaded!");
    const googleStore = useGoogleAuthStore();
    googleStore.initializeGoogleAuth();
  },
});

// Registrar demás plugins y componentes
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(vuetify);

// Montar la app
app.mount('#app');