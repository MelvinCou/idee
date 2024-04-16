<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";
const tabsNames: { name: string; action: () => void; icon: string }[] = [
  { name: "enjoys", action: () => console.log("monCUL"), icon: "mdi-party-popper" },
  { name: "bars", action: () => console.log("monCUL1"), icon: "mdi-glass-mug" },
  { name: "forks", action: () => console.log("monCUL"), icon: "mdi-silverware-fork-knife" },
  { name: "travels", action: () => console.log("monCUL"), icon: "mdi-plane-train" },
  { name: "beds", action: () => console.log("monCUL"), icon: "mdi-bed" },
];
const selectedTab = ref(tabsNames[0]);

</script>

<template>
  <v-card>
    <v-tabs v-model="selectedTab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab v-for="tab in tabsNames" :value="tab" @click="tab.action"><v-icon :icon="tab.icon" size="x-large" /></v-tab>
    </v-tabs>
    <v-window v-model="selectedTab">
      <v-window-item v-for="element in tabsNames" :key="element.name" :value="element" @click="element.action">
        <v-container fluid>
          {{ element.name }}
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>
