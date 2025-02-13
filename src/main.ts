import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

/* Import FontAwesome Core */
import { library, config } from '@fortawesome/fontawesome-svg-core';

/* Import FontAwesome Icon Component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* Import Specific Icons */
import { 
  faInstagram, 
  faFacebook 
} from '@fortawesome/free-brands-svg-icons';

import { 
  faSearch, 
  faHeart, 
  faShoppingCart, 
  faUser, 
  faBell, 
  faStar 
} from '@fortawesome/free-solid-svg-icons';

/* Add Icons to the Library */
library.add(faInstagram, faFacebook, faSearch, faHeart, faShoppingCart, faUser, faBell, faStar);

/* Set the Default Style */
config.familyDefault = "classic";
config.styleDefault = "duotone";

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount('#app');
