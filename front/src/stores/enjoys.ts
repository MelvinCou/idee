import { ref } from "vue";
import { defineStore } from "pinia";
import { Enjoy } from "@/api/Enjoy";
import type { GraphqlGetEnjoysResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useEnjoysStore = defineStore("enjoys", () => {
  const enjoys = ref<GraphqlGetEnjoysResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();

  const api = new Enjoy({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getEnjoys = async (newPage?: number) => {
    let pageUpdated = false;
    if (newPage && newPage !== page.value) {
      page.value = newPage;
      pageUpdated = true;
    }

    if (enjoys.value === undefined || pageUpdated) {
      enjoys.value = (await api.enjoyList({ city: "Paris", page: page.value })).data;
    }

    if (paginationTotal.value === undefined && enjoys.value.poi?.total) {
      paginationTotal.value = getPaginationFromTotal(enjoys.value.poi?.total);
    }
  };

  return { enjoys, getEnjoys, paginationTotal, page };
});
