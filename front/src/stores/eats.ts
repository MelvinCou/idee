import { ref } from "vue";
import { defineStore } from "pinia";
import { Eat } from "@/api/Eat";
import type { GraphqlGetEatsResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useEatsStore = defineStore("eats", () => {
  const eats = ref<GraphqlGetEatsResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();
  const city = ref<string>("");

  const api = new Eat({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getEats = async (newCity?: string, newPage?: number) => {
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

      if (eats.value === undefined || pageUpdated) {
        eats.value = (await api.getEat({ city: city.value, page: page.value })).data;
      }

      if ((paginationTotal.value === undefined || cityUpdated) && eats.value.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(eats.value.poi?.total);
      }
    }
  };

  return { eats, getEats, paginationTotal, page, city };
});
