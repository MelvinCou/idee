<script setup lang="ts">
import { ref } from "vue";
import MapComponent from "./../components/MapComponent.vue";
import type { CardData } from "@/components/CardDetails.vue";
import CardDetails, { Data } from "../components/CardDetails.vue";
import { useDrinksStore } from "@/stores/drinks";
import { useEnjoysStore } from "@/stores/enjoys";
import { useEatsStore } from "@/stores/eats";
import { useTravelsStore } from "@/stores/travels";
import { useSleepsStore } from "@/stores/sleeps";
import Tabs from "@/components/Tabs.vue"
import { Test } from "@/interfaces/main";

const enjoyStore = useEnjoysStore();
const drinkStore = useDrinksStore();
const eatStore = useEatsStore();
const travelStore = useTravelsStore();
const sleepStore = useSleepsStore();

let showDetails = ref(false);
let listCardData = ref<Test>();
const cardDataDump = ref<CardData[]>();

const detailsData = ref<CardData>({
  title: "initialize",
  comment: "",
  description: "",
  link: "",
  contact: "",
  location: { latitude: 0, longitude: 0 },
  reducedMobilityAccess: undefined,
  dateUpdate: "",
  img: "",
});

function displayDetail(data: CardData) {
  detailsData.value = data;
  if (detailsData.value) {
    showDetails.value = !showDetails.value;
  }
}

function rollBack(isRollBack: boolean) {
  showDetails.value = isRollBack;
}

const handleTabChange = (tabName: string) => {
  switch (tabName) {
    case "enjoy":
      listCardData.value = enjoyStore.enjoys
      break;
    case "drink":
      listCardData.value = drinkStore.drinks
      break;
    case "eat":
      listCardData.value = eatStore.eats
      break;
    case "travel":
      listCardData.value = travelStore.travels
      break;
    case "sleep":
      listCardData.value = sleepStore.sleeps
      break;
  }
  cardDataDump.value = listCardData.value?.poi?.results?.map<CardData>((r) => {
    return new Data(r)
  })
};
</script>

<template>
  <v-navigation-drawer color="pink" permanent width="470">
    <v-expand-x-transition>
      <CardDetails
        v-show="showDetails"
        @back="rollBack"
        pins="{detailsData.title}"
        :is-click="showDetails"
        :data="detailsData">
      </CardDetails>
    </v-expand-x-transition>
    <Tabs @actualTab="handleTabChange" />

    <v-data-iterator :items="cardDataDump">
      <template v-slot:default="{ items }">
        <template v-for="(item, i) in items" :key="i">
          <v-card>
            <div v-if="item" @click="displayDetail(item.raw)">
              <v-card-title> {{ item.raw.title }} </v-card-title>
              <!-- <v-img :width="100" :height="100" aspect-ratio="16/9" cover :src="item.raw.img">
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                  </div>
                </template>
              </v-img> -->
            </div>
            <v-progress-circular
              v-else
              color="grey-lighten-4"
              indeterminate
              size="64"></v-progress-circular>
            <v-card-actions>
              <v-btn color="green">+</v-btn>
              <v-btn color="red">-</v-btn>
            </v-card-actions>
          </v-card>

          <br />
        </template>
      </template>
    </v-data-iterator>
  </v-navigation-drawer>
  <v-main>
    <!-- Content -->
    <v-layout full-height>
      <v-row>
        <v-col>
          <MapComponent></MapComponent>
        </v-col>
      </v-row>
    </v-layout>
  </v-main>
</template>

<style scoped>
.v-navigation-drawer {
  position: relative;
}

.app-bar {
  color: black;
}

.nav-icon {
  background-color: rebeccapurple;
}

.bar-title {
  background-color: aliceblue;
}
</style>
