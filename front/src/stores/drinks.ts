import { ref } from "vue";
import { defineStore } from "pinia";
import { Drink } from "@/api/Drink";
import type { GraphqlGetDrinksResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useDrinksStore = defineStore("drinks", () => {
  const drinks = ref<GraphqlGetDrinksResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();
  const city = ref<string>("");

  const api = new Drink({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getDrinks = async (newCity?: string, newPage?: number) => {
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

      if (drinks.value === undefined || pageUpdated) {
        drinks.value = (await api.drinkList({ city: city.value, page: page.value })).data;
      }

      if ((paginationTotal.value === undefined || cityUpdated) && drinks.value.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(drinks.value.poi?.total);
      }
    }
  };

  return { drinks, getDrinks, paginationTotal, page, city };
});
