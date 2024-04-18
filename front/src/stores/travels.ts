import { ref } from "vue";
import { defineStore } from "pinia";
import { Travel } from "@/api/Travel";
import type { GraphqlGetTravelsResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useTravelsStore = defineStore("travels", () => {
  const travels = ref<GraphqlGetTravelsResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();
  const city = ref<string>("");

  const api = new Travel({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getTravels = async (newCity?: string, newPage?: number) => {
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

      if (travels.value === undefined || pageUpdated) {
        travels.value = (await api.travelList({ city: city.value, page: page.value })).data;
      }

      if ((paginationTotal.value === undefined || cityUpdated) && travels.value.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(travels.value.poi?.total);
      }
    }
  };

  return { travels, getTravels, paginationTotal, page, city };
});
