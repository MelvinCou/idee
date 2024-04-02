<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
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
