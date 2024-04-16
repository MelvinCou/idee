<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { defineStore } from "pinia";
import { ref } from "vue";

const userStore = defineStore("user", () => {
  const user = ref({
    name: "",
    avatar: "",
    connected: false,
  });
  const intervalId = ref(0);

  const getUser = async () => {
    let data;
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/github_connected`, {
        credentials: "include",
      });
      data = await response.json();
      user.value.name = data.name?.length > 0 ? data.name : data.login;
      user.value.avatar = data.avatar_url;
      if (response.ok) user.value.connected = true;
    } catch (error) {
      //
    }
  };
  const startCron = () => {
    intervalId.value = window.setInterval(
      () => {
        getUser();
      },
      5 * 60 * 1000, // Get user data every 5 min
    );
  };
  startCron();

  return { user, getUser };
})();

const githubOAuth2 = async () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/github_login`;
};
const disconnect = async () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/github_disconnect`;
};
userStore.getUser();
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
          <v-btn icon v-bind="props" v-if="userStore.user.connected">
            <v-avatar color="brown" size="large">
              <v-img v-bind:src="userStore.user.avatar" />
            </v-avatar>
          </v-btn>
          <v-btn @click="githubOAuth2" prepend-icon="mdi-github" v-else>Connexion</v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown" v-if="userStore.user.avatar">
                <v-img v-bind:src="userStore.user.avatar" v-if="userStore.user.connected" />
                <span class="text-h5" v-else></span>
              </v-avatar>
              <h3>{{ userStore.user.name }}</h3>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="disconnect" variant="text" rounded v-if="userStore.user.connected"
                >Déconnexion</v-btn
              >
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
