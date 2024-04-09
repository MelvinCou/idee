import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import "../node_modules/mapbox-gl/dist/mapbox-gl.css";

const app = createApp(App);

app.config.globalProperties.$api_url = import.meta.env.VITE_API_URL;

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
