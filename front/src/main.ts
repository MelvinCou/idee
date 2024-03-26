import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// Vuetify
import 'vuetify/styles'; // Import Vuetify styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'

// Create a Vuetify instance with components and directives
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
});

// Create the Vue app
const app = createApp(App);


// Use plugins with the app
app.use(createPinia()); // State management
app.use(router); // Vue Router
app.use(vuetify); // Vuetify

// DatePicker component
app.component('VueDatePicker', VueDatePicker);

// Mount the app to the DOM
app.mount("#app");
