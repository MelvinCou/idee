<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

// Using the user store
const userStore = useUserStore();

// Redirect to GitHub OAuth2 authentication
const githubOAuth2 = async () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/github_login`;
};

// Disconnect the user
const disconnect = async () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/github_disconnect`;
};

// Fetch user information on component mount
userStore.getUser();
</script>

<template>
  <v-app>
    <!-- Application navigation bar -->
    <v-app-bar color="white">
      <v-app-bar-title>Fox explorer</v-app-bar-title>
      <v-spacer />
      <!-- Navigation links -->
      <RouterLink class="router-link" to="/">Accueil</RouterLink>
      <v-spacer />
      <RouterLink class="router-link" to="/main">Carte</RouterLink>
      <div class="custom-spacer"></div>

      <!-- User menu -->
      <v-menu min-width="200px" rounded>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" v-if="userStore.user.connected">
            <v-avatar color="brown" size="large">
              <v-img :src="userStore.user.avatar" />
            </v-avatar>
          </v-btn>
          <v-btn @click="githubOAuth2" prepend-icon="mdi-github" v-else>Connexion</v-btn>
        </template>
        <!-- Menu content -->
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown" v-if="userStore.user.avatar">
                <v-img :src="userStore.user.avatar" v-if="userStore.user.connected" />
                <span class="text-h5" v-else></span>
              </v-avatar>
              <h3>{{ userStore.user.name }}</h3>
              <v-btn @click="disconnect" variant="text" rounded v-if="userStore.user.connected"
                >Déconnexion</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <!-- Main content of the application -->
    <RouterView />
  </v-app>
</template>

<style scoped>
/* Custom spacing for navigation bar */
.custom-spacer {
  flex-grow: 5;
}

/* Navigation links style */
.router-link {
  color: black !important;
  font-size: large;
  text-decoration: none !important;
}
</style>
