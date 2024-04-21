import { ref } from "vue";
import { defineStore } from "pinia";
import { Travel } from "@/api/Travel";
import type { GraphqlGetTravelsResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

/**
 * Store for managing travels data.
 */
export const useTravelsStore = defineStore("travels", () => {
  /**
   * Reference to the travels data fetched from the API.
   */
  const travels = ref<GraphqlGetTravelsResponse>();

  /**
   * Reference to the current page number.
   */
  const page = ref<number>(1);

  /**
   * Reference to the total number of items for pagination.
   */
  const paginationTotal = ref<number>();

  /**
   * Reference to the selected city for filtering travels.
   */
  const city = ref<string>("");

  /**
   * Instance of the Travel API client.
   */
  const api = new Travel({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  /**
   * Fetch travels data based on the selected city and page number.
   *
   * @param {string} [newCity] - The new city to filter travels (optional).
   * @param {number} [newPage] - The new page number for pagination (optional).
   */
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

      if ((paginationTotal.value === undefined || cityUpdated) && travels.value?.poi?.total) {
        paginationTotal.value = getPaginationFromTotal(travels.value.poi?.total);
      }
    }
  };

  return { travels, getTravels, paginationTotal, page, city };
});
