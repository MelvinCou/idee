<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import { ref } from "vue";

const githubOAuth2 = async () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/github_login`;
};
const user = ref({
  initials: "JD",
  fullName: "John Doe",
  email: "john.doe@doe.com",
});
</script>

<template>
  <v-app>
    <v-app-bar color="black">
      <v-app-bar-title>Fox explorer</v-app-bar-title>
      <v-spacer></v-spacer>
      <RouterLink to="/">Accueil</RouterLink>
      <v-spacer></v-spacer>
      <RouterLink to="/main">Carte</RouterLink>
      <div class="custom-spacer"></div>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="large">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded>Modification du compte</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text" rounded>Déconnexion</v-btn>
              <v-btn @click="githubOAuth2">Connexion avec github</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <RouterView />
  </v-app>
</template>

<style scoped>
.custom-spacer {
  flex-grow: 5;
}
</style>
