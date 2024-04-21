import { ref } from "vue";
import { defineStore } from "pinia";
import { Enjoy } from "@/api/Enjoy";
import type { GraphqlGetEnjoysResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

/**
 * Store for managing enjoys data.
 */
export const useEnjoysStore = defineStore("enjoys", () => {
  /**
   * Reference to the enjoys data fetched from the API.
   */
  const enjoys = ref<GraphqlGetEnjoysResponse>();

  /**
   * Reference to the current page number.
   */
  const page = ref<number>(1);

  /**
   * Reference to the total number of items for pagination.
   */
  const paginationTotal = ref<number>();

  /**
   * Reference to the selected city for filtering enjoys.
   */
  const city = ref<string>("");

  /**
   * Instance of the Enjoy API client.
   */
  const api = new Enjoy({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  /**
   * Fetch enjoys data based on the selected city and page number.
   *
   * @param {string} [newCity] - The new city to filter enjoys (optional).
   * @param {number} [newPage] - The new page number for pagination (optional).
   */
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

      if ((paginationTotal.value === undefined || cityUpdated) && enjoys.value?.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(enjoys.value.poi?.total);
      }
    }
  };

  return { enjoys, getEnjoys, paginationTotal, page, city };
});
