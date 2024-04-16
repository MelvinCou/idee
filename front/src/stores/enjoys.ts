import { ref } from "vue";
import { defineStore } from "pinia";
import { Enjoy } from "@/api/Enjoy";
import { GraphqlGetEnjoysResponse } from "@/api/data-contracts";

export const useEnjoysStore = defineStore("enjoys", () => {
  const enjoys = ref<GraphqlGetEnjoysResponse>();
  const page = ref<number>(1);

  const api = new Enjoy({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getEnjoys = async () => {
    if (enjoys.value === undefined) {
      enjoys.value = (await api.enjoyList({ city: "Paris", page: page.value })).data;
    }
  };

  return { enjoys, getEnjoys };
});
