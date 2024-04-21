<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDrinksStore } from "@/stores/drinks";
import { useEnjoysStore } from "@/stores/enjoys";
import { useEatsStore } from "@/stores/eats";
import { useTravelsStore } from "@/stores/travels";
import { useSleepsStore } from "@/stores/sleeps";
import type { TabsInterface } from "@/interfaces/main";

const props = defineProps<{
  activeTab?: string;
}>();

const enjoyStore = useEnjoysStore();
const drinkStore = useDrinksStore();
const eatStore = useEatsStore();
const travelStore = useTravelsStore();
const sleepStore = useSleepsStore();

const emit = defineEmits(["actualTab"]);
const tabsData: TabsInterface[] = [
  {
    name: "enjoy",
    action: () => handleTabClick(0, enjoyStore.getEnjoys),
    icon: "mdi-party-popper",
  },
  { name: "drink", action: () => handleTabClick(1, drinkStore.getDrinks), icon: "mdi-glass-mug" },
  {
    name: "eat",
    action: () => handleTabClick(2, eatStore.getEats),
    icon: "mdi-silverware-fork-knife",
  },
  {
    name: "travel",
    action: () => handleTabClick(3, travelStore.getTravels),
    icon: "mdi-plane-train",
  },
  { name: "sleep", action: () => handleTabClick(4, sleepStore.getSleeps), icon: "mdi-bed" },
];
const selectedTab = ref(tabsData[0]);

onMounted(() => {
  if (props.activeTab) {
    selectedTab.value = tabsData.find((tab) => tab.name === props.activeTab)!;
  }
  selectedTab.value.action();
});

const handleTabClick = async (numTabs: number, actionStore: () => Promise<void>) => {
  if (numTabs >= 0 && numTabs <= 4) {
    await actionStore();
    emit("actualTab", tabsData[numTabs].name);
  }
};
</script>

<template>
  <v-card>
    <v-tabs v-model="selectedTab" align-tabs="center" color="deep-purple-accent-4">
      <v-tab :key="tab.name" v-for="tab in tabsData" :value="tab" @click="tab.action"
        ><v-icon :icon="tab.icon" size="x-large"
      /></v-tab>
    </v-tabs>
    <v-window v-model="selectedTab">
      <v-window-item
        v-for="element in tabsData"
        :key="element.name"
        :value="element"
        @click="element.action">
      </v-window-item>
    </v-window>
  </v-card>
</template>
