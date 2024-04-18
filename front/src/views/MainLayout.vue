<script setup lang="ts">
import { ref, watch } from "vue";
import MapComponent from "@/components/MapComponent.vue";
import SearchInput from "@/components/SearchInput.vue";
import type { CardData } from "@/components/CardDetails.vue";
import CardDetails, { Data } from "../components/CardDetails.vue";
import PointButton from "@/components/PointButton.vue";
import { useDrinksStore } from "@/stores/drinks";
import { useEnjoysStore } from "@/stores/enjoys";
import { useEatsStore } from "@/stores/eats";
import { useTravelsStore } from "@/stores/travels";
import { useSleepsStore } from "@/stores/sleeps";
import Tabs from "@/components/Tabs.vue";
import type { MainLayoutActiveTabs } from "@/interfaces/main";
import { itemPerPage } from "@/utils";

const enjoyStore = useEnjoysStore();
const drinkStore = useDrinksStore();
const eatStore = useEatsStore();
const travelStore = useTravelsStore();
const sleepStore = useSleepsStore();

const showDetails = ref(false);
const activeTabs = ref<MainLayoutActiveTabs>();
const cardDataDump = ref<CardData[]>();
const actualPage = ref<number>();
const cityToSearch = ref<string>("");

const switchData = async (tabName: string, newCity?: string, newPage?: number) => {
  switch (tabName) {
    case "enjoy":
      if (cityToSearch.value !== enjoyStore.city || newPage) {
        await enjoyStore.getEnjoys(cityToSearch.value, newPage);
      }
      activeTabs.value = {
        actualTab: tabName,
        data: enjoyStore.enjoys!,
        paginationMax: enjoyStore.paginationTotal!,
      };
      actualPage.value = enjoyStore.page;
      break;
    case "drink":
      if (cityToSearch.value !== drinkStore.city || newPage) {
        await drinkStore.getDrinks(cityToSearch.value, newPage);
      }
      activeTabs.value = {
        actualTab: tabName,
        data: drinkStore.drinks!,
        paginationMax: drinkStore.paginationTotal!,
      };
      actualPage.value = drinkStore.page;
      break;
    case "eat":
      if (cityToSearch.value !== eatStore.city || newPage) {
        await eatStore.getEats(cityToSearch.value, newPage);
      }
      activeTabs.value = {
        actualTab: tabName,
        data: eatStore.eats!,
        paginationMax: eatStore.paginationTotal!,
      };
      actualPage.value = eatStore.page;
      break;
    case "travel":
      if (cityToSearch.value !== travelStore.city || newPage) {
        await travelStore.getTravels(cityToSearch.value, newPage);
      }
      activeTabs.value = {
        actualTab: tabName,
        data: travelStore.travels!,
        paginationMax: travelStore.paginationTotal!,
      };
      actualPage.value = travelStore.page;
      break;
    case "sleep":
      if (cityToSearch.value !== sleepStore.city || newPage) {
        await sleepStore.getSleeps(cityToSearch.value, newPage);
      }
      activeTabs.value = {
        actualTab: tabName,
        data: sleepStore.sleeps!,
        paginationMax: sleepStore.paginationTotal!,
      };
      actualPage.value = sleepStore.page;
      break;
  }
  if (cityToSearch.value !== "") {
    cardDataDump.value = activeTabs.value?.data.poi?.results?.map<CardData>((r) => {
      return new Data(r);
    });
  }
};

watch(actualPage, (newPage) => {
  switchData(activeTabs.value?.actualTab!, undefined, newPage);
});

watch(cityToSearch, (newCity) => {
  switchData(activeTabs.value?.actualTab!, newCity, undefined);
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

const updateCity = (cityName: string) => {
  cityToSearch.value = cityName;
};
</script>

<template>
  <v-container fluid>
    <SearchInput @selectedCity="updateCity" />

    <v-navigation-drawer color="pink" permanent :width="450">
      <v-expand-x-transition>
        <CardDetails
          v-show="showDetails"
          @back="rollBack"
          pins="{detailsData.title}"
          :is-click="showDetails"
          :data="detailsData">
        </CardDetails>
      </v-expand-x-transition>

      <Tabs @actualTab="switchData" />

      <v-data-iterator :items="cardDataDump" :items-per-page="itemPerPage">
        <template #default="{ items }">
          <!-- eslint-disable-next-line vue/no-v-for-template-key -->
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
              <v-progress-circular v-else color="grey-lighten-4" indeterminate size="64" />
              <v-card-actions>
                <PointButton :data="item.raw" :big="false"></PointButton>
              </v-card-actions>
            </v-card>

            <br />
          </template>
        </template>
      </v-data-iterator>

      <v-pagination
        v-model="actualPage"
        v-if="activeTabs?.paginationMax"
        :length="activeTabs.paginationMax" />
    </v-navigation-drawer>
    <!-- Mapbox content -->
    <MapComponent />
  </v-container>
</template>

<style scoped>
.v-navigation-drawer {
  margin: auto;
  position: absolute !important;
  left: 50px !important;
  background-color: black;
  max-height: 80%;
}

.v-container {
  height: 100%;
  margin-top: 60px;
}

.nav-icon {
  background-color: rebeccapurple;
}

.bar-title {
  background-color: aliceblue;
}
</style>
