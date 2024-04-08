<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { Ping } from "./../api/Ping";
import { ref } from "vue";

const api = new Ping({
  baseUrl: import.meta.env.VITE_API_URL,
});
const ping = ref();

const getPing = async () => {
  ping.value = (await api.pingList()).data;
};

getPing();
</script>

<template>
  <v-main>
    <h1 class="blue">The ping request: {{ ping }}</h1>

    <TheWelcome />
  </v-main>
</template>
