import { ref } from "vue";
import { defineStore } from "pinia";
import { Enjoy } from "@/api/Enjoy";
import type { GraphqlGetEnjoysResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useEnjoysStore = defineStore("enjoys", () => {
  const enjoys = ref<GraphqlGetEnjoysResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();
  const city = ref<string>("");

  const api = new Enjoy({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getEnjoys = async (newCity?: string, newPage?: number) => {
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

      if (enjoys.value === undefined || pageUpdated) {
        enjoys.value = (await api.enjoyList({ city: city.value, page: page.value })).data;
      }

      if ((paginationTotal.value === undefined || cityUpdated) && enjoys.value.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(enjoys.value.poi?.total);
      }
    }
  };

  return { enjoys, getEnjoys, paginationTotal, page, city };
});
