import { ref } from "vue";
import { defineStore } from "pinia";
import { Sleep } from "@/api/Sleep";
import { GraphqlGetSleepsResponse } from "@/api/data-contracts";

export const useSleepsStore = defineStore("sleeps", () => {
  const sleeps = ref<GraphqlGetSleepsResponse>();
  const page = ref<number>(1);

  const api = new Sleep({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getSleeps = async () => {
    if (sleeps.value === undefined) {
      sleeps.value = (await api.sleepList({ city: "Paris", page: page.value })).data;
    }
  };

  return { sleeps, getSleeps };
});
