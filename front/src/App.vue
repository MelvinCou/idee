<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
// import { Ping } from "./api/Ping";
// import { ref } from "vue";

// const api = new Ping({
//   baseUrl: import.meta.env.VITE_API_URL,
// });
// const ping = ref();

// const getPing = async () => {
//   ping.value = (await api.pingList()).data;
// };

// getPing();

// const githubOAuth2 = async () => {
//   window.location.href = `${import.meta.env.VITE_BASE_URL}/github_login`;
// };
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- <button class="bg-blue-800 px-2 py-2 text-white" @click="githubOAuth2">
        GITHUB CONNECTION
      </button> -->
      <!-- <h1 class="blue">The ping request: {{ ping }}</h1> -->
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/main">Main</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
