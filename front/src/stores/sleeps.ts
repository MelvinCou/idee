import { ref } from "vue";
import { defineStore } from "pinia";
import { Sleep } from "@/api/Sleep";
import type { GraphqlGetSleepsResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useSleepsStore = defineStore("sleeps", () => {
  const sleeps = ref<GraphqlGetSleepsResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();
  const city = ref<string>("");

  const api = new Sleep({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getSleeps = async (newCity?: string, newPage?: number) => {
    if (city.value !== "" || newCity) {
      let pageUpdated = false;
      let cityUpdated = false;

      if (newPage && newPage !== page.value) {
        page.value = newPage;
        pageUpdated = true;
      }

      if (newCity && newCity !== city.value) {
        city.value = newCity;
        page.value = 1;
        pageUpdated = true;
        cityUpdated = true;
      }

      if (sleeps.value === undefined || pageUpdated) {
        sleeps.value = (await api.sleepList({ city: city.value, page: page.value })).data;
      }

      if ((paginationTotal.value === undefined || cityUpdated) && sleeps.value.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(sleeps.value.poi?.total);
      }
    }
  };

  return { sleeps, getSleeps, paginationTotal, page, city };
});
