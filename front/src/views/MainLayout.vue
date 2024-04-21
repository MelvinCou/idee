<script setup lang="ts">
import { ref, watch } from "vue";
import MapComponent from "@/components/MapComponent.vue";
import SearchInput from "@/components/SearchInput.vue";
import type { CardData } from "@/interfaces/main";
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
import CarouselsComponent from "@/components/CarouselsComponent.vue";

// Initialize store hooks
const enjoyStore = useEnjoysStore();
const drinkStore = useDrinksStore();
const eatStore = useEatsStore();
const travelStore = useTravelsStore();
const sleepStore = useSleepsStore();

// Reactive references
const showDetails = ref(false);
const activeTabs = ref<MainLayoutActiveTabs>();
const cardDataDump = ref<CardData[]>();
const actualPage = ref<number>();
const cityToSearch = ref<string>("");

// Function to switch tab data
const switchData = async (tabName: string, newPage?: number) => {
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
    const dataPromises =
      activeTabs.value?.data.poi?.results?.map<Promise<Data>>(async (r) => {
        const dataInstance = new Data(r);
        await dataInstance.getImages();
        return dataInstance;
      }) ?? [];

    cardDataDump.value = await Promise.all(dataPromises);
  }
};

// Watchers
watch(actualPage, (newPage) => {
  switchData(activeTabs.value?.actualTab!, newPage);
});

watch(cityToSearch, () => {
  switchData(activeTabs.value?.actualTab!);
});

// Reactive reference for detailed data
const detailsData = ref<CardData>({
  title: "",
  description: "",
  comment: "",
  contact: {
    homepage: "",
    telephone: "",
    email: "",
  },
  location: {
    latitude: 0,
    longitude: 0,
    address: {
      city: "",
      postalCode: "",
      street: "",
    },
  },
  reducedMobilityAccess: undefined,
  dateUpdate: "",
  img: [],
});

// Display detailed data
function displayDetail(data: CardData) {
  detailsData.value = data;
  if (detailsData.value) {
    showDetails.value = !showDetails.value;
  }
}

// Rollback detail view
function rollBack(isRollBack: boolean) {
  showDetails.value = isRollBack;
}

// Update city search
const updateCity = (cityName: string) => {
  cityToSearch.value = cityName;
};
</script>

<template>
  <v-container fluid>
    <!-- Display search input component -->
    <SearchInput @selectedCity="updateCity" />

    <v-navigation-drawer color="pink" permanent :width="450">
      <v-expand-x-transition v-if="showDetails">
        <CardDetails
          v-show="showDetails"
          @back="rollBack"
          pins="{detailsData.title}"
          :is-click="showDetails"
          :data="detailsData">
        </CardDetails>
      </v-expand-x-transition>

      <template v-else>
        <!-- Display tabs component -->
        <Tabs @actualTab="switchData" :activeTab="activeTabs?.actualTab" />

        <!-- Display card items -->
        <v-data-iterator :items="cardDataDump" :items-per-page="itemPerPage">
          <template #default="{ items }">
            <!-- eslint-disable-next-line vue/no-v-for-template-key -->
            <template v-for="(item, i) in items" :key="i">
              <v-card class="mx-auto">
                <CarouselsComponent main-layout :images="item.raw.img" />

                <v-card-title>
                  <p>{{ item.raw.title }}</p>
                  <v-icon
                    v-if="item.raw.reducedMobilityAccess"
                    class="present-color"
                    icon="mdi-wheelchair" />
                </v-card-title>

                <v-card-subtitle> {{ item.raw.comment }} </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="orange-lighten-2"
                    text="En savoir +"
                    @click="displayDetail(item.raw)" />
                  <v-spacer></v-spacer>
                  <PointButton :data="item.raw" :big="false"></PointButton>
                </v-card-actions>
              </v-card>
              <br />
            </template>
          </template>
        </v-data-iterator>

        <!-- Display pagination -->
        <v-pagination
          v-model="actualPage"
          v-if="activeTabs?.paginationMax"
          :length="activeTabs.paginationMax" />
      </template>
    </v-navigation-drawer>
    <!-- Display Mapbox content -->
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

.v-card-title {
  display: flex;
  white-space: wrap !important;
  width: 95%;
}

.present-color {
  color: green;
}

.v-card-subtitle {
  width: 90%;
  white-space: wrap !important;
}
</style>
