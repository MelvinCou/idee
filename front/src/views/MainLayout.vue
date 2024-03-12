<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!-- Content -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!-- Content -->
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false) // Changed from null to false to match the expected type for v-model
</script>
