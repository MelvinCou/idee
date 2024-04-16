import { ref } from "vue";
import { defineStore } from "pinia";
import { Sleep } from "@/api/Sleep";
import type { GraphqlGetSleepsResponse } from "@/api/data-contracts";
import { getPaginationFromTotal } from "@/utils";

export const useSleepsStore = defineStore("sleeps", () => {
  const sleeps = ref<GraphqlGetSleepsResponse>();
  const page = ref<number>(1);
  const paginationTotal = ref<number>();

  const api = new Sleep({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getSleeps = async (newPage?: number) => {
    let pageUpdated = false;
    if (newPage && newPage !== page.value) {
      page.value = newPage;
      pageUpdated = true;
    }

    if (sleeps.value === undefined || pageUpdated) {
      sleeps.value = (await api.sleepList({ city: "Paris", page: page.value })).data;
    }

    if (paginationTotal.value === undefined && sleeps.value.poi?.total) {
      paginationTotal.value = getPaginationFromTotal(sleeps.value.poi?.total);
    }
  };

  return { sleeps, getSleeps, paginationTotal, page };
});
