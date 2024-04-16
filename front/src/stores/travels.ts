import { ref } from "vue";
import { defineStore } from "pinia";
import { Travel } from "@/api/Travel";
import type { GraphqlGetTravelsResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useTravelsStore = defineStore("travels", () => {
  const travels = ref<GraphqlGetTravelsResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();

  const api = new Travel({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getTravels = async (newPage?: number) => {
    let pageUpdated = false;
    if (newPage && newPage !== page.value) {
      page.value = newPage;
      pageUpdated = true;
    }

    if (travels.value === undefined || pageUpdated) {
      travels.value = (await api.travelList({ city: "Paris", page: page.value })).data;
    }

    if (paginationTotal.value === undefined && travels.value.poi?.total) {
      paginationTotal.value = getPaginationFromTotal(travels.value.poi?.total);
    }
  };

  return { travels, getTravels, paginationTotal, page };
});
