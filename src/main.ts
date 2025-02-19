import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Importamos el store de Google (para inicializarlo tras la carga del script)
import { useGoogleAuthStore } from '@/stores/useGoogleAuthStore';

// Plugin de Google
import GoogleLoginPlugin from 'vue3-google-login';

library.add(faInstagram, faFacebook, faSearch, faHeart, faShoppingCart, faUser, faBell, faStar, faTicket);

config.familyDefault = "classic";
config.styleDefault = "duotone";

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faInstagram, faFacebook, } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faHeart, faShoppingCart, faUser, faBell, faStar, faTicket } from '@fortawesome/free-solid-svg-icons';
const vuetify = createVuetify({ components, directives });

// Crear la instancia de la app
const app = createApp(App);

// Registrar el plugin de Google (asegurándonos de que se cargue el script)
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
app.use(createPinia());
app.use(router);
app.use(vuetify);

// Montar la app
app.mount('#app');
