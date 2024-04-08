<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const githubOAuth2 = async () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/github_login`;
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
