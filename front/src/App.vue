<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";

const api = new Ping({
  baseUrl: import.meta.env.VITE_API_URL,
});
const ping = ref();

const getPing = async () => {
  ping.value = (await api.pingList()).data;
};

getPing();

const githubOAuth2 = async () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/github_login`;
};
import LandingPage from "./views/LandingPage.vue";
import { Ping } from "./api/Ping";
import { ref } from "vue";
</script>

<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
