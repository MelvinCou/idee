import { ref } from "vue";
import { defineStore } from "pinia";
import { Eat } from "@/api/Eat";
import type { GraphqlGetEatsResponse } from "@/api/data-contracts";

export const useEatsStore = defineStore("eats", () => {
  const eats = ref<GraphqlGetEatsResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();

  const api = new Eat({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getEats = async (newPage?: number) => {
    let pageUpdated = false;
    if (newPage && newPage !== page.value) {
      page.value = newPage;
      pageUpdated = true;
    }

    if (eats.value === undefined || pageUpdated) {
      eats.value = (await api.getEat({ city: "Paris", page: page.value })).data;
    }

    if (paginationTotal.value === undefined && eats.value.poi?.total) {
      paginationTotal.value = eats.value.poi?.total % 20;
    }
  };

  return { eats, getEats, paginationTotal, page };
});
