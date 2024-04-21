import { ref } from "vue";
import { defineStore } from "pinia";
import { Eat } from "@/api/Eat";
import type { GraphqlGetEatsResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

/**
 * Store for managing eats data.
 */
export const useEatsStore = defineStore("eats", () => {
  /**
   * Reference to the eats data fetched from the API.
   */
  const eats = ref<GraphqlGetEatsResponse>();

  /**
   * Reference to the current page number.
   */
  const page = ref<number>(1);

  /**
   * Reference to the total number of items for pagination.
   */
  const paginationTotal = ref<number>();

  /**
   * Reference to the selected city for filtering eats.
   */
  const city = ref<string>("");

  /**
   * Instance of the Eat API client.
   */
  const api = new Eat({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  /**
   * Fetch eats data based on the selected city and page number.
   *
   * @param {string} [newCity] - The new city to filter eats (optional).
   * @param {number} [newPage] - The new page number for pagination (optional).
   */
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

      if ((paginationTotal.value === undefined || cityUpdated) && eats.value?.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(eats.value.poi?.total);
      }
    }
  };

  return { eats, getEats, paginationTotal, page, city };
});
