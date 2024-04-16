<script setup lang="ts">
import { ref, watch } from "vue";
import MapComponent from "./../components/MapComponent.vue";
import type { CardData } from "@/components/CardDetails.vue";
import CardDetails, { Data } from "../components/CardDetails.vue";
import { useDrinksStore } from "@/stores/drinks";
import { useEnjoysStore } from "@/stores/enjoys";
import { useEatsStore } from "@/stores/eats";
import { useTravelsStore } from "@/stores/travels";
import { useSleepsStore } from "@/stores/sleeps";
import Tabs from "@/components/Tabs.vue";
import type { MainLayoutActiveTabs } from "@/interfaces/main";

const enjoyStore = useEnjoysStore();
const drinkStore = useDrinksStore();
const eatStore = useEatsStore();
const travelStore = useTravelsStore();
const sleepStore = useSleepsStore();

const showDetails = ref(false);
const activeTabs = ref<MainLayoutActiveTabs>();
const cardDataDump = ref<CardData[]>();
const actualPage = ref<number>();

watch(actualPage, async (newPage) => {
  switch (activeTabs.value?.actualTab) {
    case "enjoy":
      await enjoyStore.getEnjoys(newPage);
      activeTabs.value = {
        ...activeTabs.value!,
        data: enjoyStore.enjoys!,
        paginationMax: enjoyStore.paginationTotal!,
      };
      break;
    case "drink":
      await drinkStore.getDrinks(newPage);
      activeTabs.value = {
        ...activeTabs.value!,
        data: drinkStore.drinks!,
        paginationMax: drinkStore.paginationTotal!,
      };
      break;
    case "eat":
      await eatStore.getEats(newPage);
      activeTabs.value = {
        ...activeTabs.value!,
        data: eatStore.eats!,
        paginationMax: eatStore.paginationTotal!,
      };
      break;
    case "travel":
      await travelStore.getTravels(newPage);
      activeTabs.value = {
        ...activeTabs.value!,
        data: travelStore.travels!,
        paginationMax: travelStore.paginationTotal!,
      };
      break;
    case "sleep":
      await sleepStore.getSleeps(newPage);
      activeTabs.value = {
        ...activeTabs.value!,
        data: sleepStore.sleeps!,
        paginationMax: sleepStore.paginationTotal!,
      };
      break;
  }
  cardDataDump.value = activeTabs.value?.data.poi?.results?.map<CardData>((r) => {
    return new Data(r);
  });
});

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
      activeTabs.value = {
        data: enjoyStore.enjoys!,
        actualTab: tabName,
        paginationMax: enjoyStore.paginationTotal!,
      };
      actualPage.value = enjoyStore.page!
      break;
    case "drink":
      activeTabs.value = {
        data: drinkStore.drinks!,
        actualTab: tabName,
        paginationMax: drinkStore.paginationTotal!,
      };
      actualPage.value = drinkStore.page!
      break;
    case "eat":
      activeTabs.value = {
        data: eatStore.eats!,
        actualTab: tabName,
        paginationMax: eatStore.paginationTotal!,
      };
      actualPage.value = eatStore.page!
      break;
    case "travel":
      activeTabs.value = {
        data: travelStore.travels!,
        actualTab: tabName,
        paginationMax: travelStore.paginationTotal!,
      };
      actualPage.value = travelStore.page!
      break;
    case "sleep":
      activeTabs.value = {
        data: sleepStore.sleeps!,
        actualTab: tabName,
        paginationMax: sleepStore.paginationTotal!,
      };
      actualPage.value = sleepStore.page!
      break;
  }

  cardDataDump.value = activeTabs.value?.data.poi?.results?.map<CardData>((r) => {
    return new Data(r);
  });
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

    <v-data-iterator :items="cardDataDump" :items-per-page="20">
      <template v-slot="{ items }">
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
    <v-pagination
      v-model="actualPage"
      v-if="activeTabs?.paginationMax"
      :length="activeTabs.paginationMax"
    />
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
