<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { Ping } from "./api/Ping";
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
  window.location.href = "http://localhost:8080/github_login";
};
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
