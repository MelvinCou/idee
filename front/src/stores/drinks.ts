import { ref } from "vue";
import { defineStore } from "pinia";
import { Drink } from "@/api/Drink";
import type { GraphqlGetDrinksResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useDrinksStore = defineStore("drinks", () => {
  const drinks = ref<GraphqlGetDrinksResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();

  const api = new Drink({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getDrinks = async (newPage?: number) => {
    let pageUpdated = false;

    if (newPage && newPage !== page.value) {
      page.value = newPage;
      pageUpdated = true;
    }

    if (drinks.value === undefined || pageUpdated) {
      drinks.value = (await api.drinkList({ city: "Paris", page: page.value })).data;
    }

    if (paginationTotal.value === undefined && drinks.value.poi?.total) {
      paginationTotal.value = getPaginationFromTotal(drinks.value.poi?.total);
    }
  };

  return { drinks, getDrinks, paginationTotal, page };
});
