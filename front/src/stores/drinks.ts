import { ref } from "vue";
import { defineStore } from "pinia";
import { Drink } from "@/api/Drink";
import { GraphqlGetDrinksResponse } from "@/api/data-contracts";

export const useDrinksStore = defineStore("drinks", () => {
  const drinks = ref<GraphqlGetDrinksResponse>();
  const page = ref<number>(1);

  const api = new Drink({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getDrinks = async () => {
    if (drinks.value === undefined) {
      drinks.value = (await api.drinkList({ city: "Paris", page: page.value })).data;
    }
  };

  return { drinks, getDrinks };
});
