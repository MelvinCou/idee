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

// Create a Vuetify instance with components and directives
const vuetify = createVuetify({
  components,
  directives,
});

// Create the Vue app
const app = createApp(App);

// Configure global properties, example for setting a global API URL
app.config.globalProperties.$api_url = import.meta.env.VITE_API_URL;

// Use plugins with the app
app.use(createPinia()); // State management
app.use(router); // Vue Router
app.use(vuetify); // Vuetify

// DatePicker component
app.component('VueDatePicker', VueDatePicker);

// Mount the app to the DOM
app.mount("#app");
