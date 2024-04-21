import { ref } from "vue";
import { defineStore } from "pinia";
import { Drink } from "@/api/Drink";
import type { GraphqlGetDrinksResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

/**
 * Store for managing drinks data.
 */
export const useDrinksStore = defineStore("drinks", () => {
  /**
   * Reference to the drinks data fetched from the API.
   */
  const drinks = ref<GraphqlGetDrinksResponse>();

  /**
   * Reference to the current page number.
   */
  const page = ref<number>(1);

  /**
   * Reference to the total number of items for pagination.
   */
  const paginationTotal = ref<number>();

  /**
   * Reference to the selected city for filtering drinks.
   */
  const city = ref<string>("");

  /**
   * Instance of the Drink API client.
   */
  const api = new Drink({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  /**
   * Fetch drinks data based on the selected city and page number.
   *
   * @param {string} [newCity] - The new city to filter drinks (optional).
   * @param {number} [newPage] - The new page number for pagination (optional).
   */
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

      if ((paginationTotal.value === undefined || cityUpdated) && drinks.value?.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(drinks.value.poi?.total);
      }
    }
  };

  return { drinks, getDrinks, paginationTotal, page, city };
});
