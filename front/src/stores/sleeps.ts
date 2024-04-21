import { ref } from "vue";
import { defineStore } from "pinia";
import { Sleep } from "@/api/Sleep";
import type { GraphqlGetSleepsResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

/**
 * Store for managing sleeps data.
 */
export const useSleepsStore = defineStore("sleeps", () => {
  /**
   * Reference to the sleeps data fetched from the API.
   */
  const sleeps = ref<GraphqlGetSleepsResponse>();

  /**
   * Reference to the current page number.
   */
  const page = ref<number>(1);

  /**
   * Reference to the total number of items for pagination.
   */
  const paginationTotal = ref<number>();

  /**
   * Reference to the selected city for filtering sleeps.
   */
  const city = ref<string>("");

  /**
   * Instance of the Sleep API client.
   */
  const api = new Sleep({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  /**
   * Fetch sleeps data based on the selected city and page number.
   *
   * @param {string} [newCity] - The new city to filter sleeps (optional).
   * @param {number} [newPage] - The new page number for pagination (optional).
   */
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

      if ((paginationTotal.value === undefined || cityUpdated) && sleeps.value?.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(sleeps.value.poi?.total);
      }
    }
  };

  return { sleeps, getSleeps, paginationTotal, page, city };
});
