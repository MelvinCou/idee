import { ref } from "vue";
import { defineStore } from "pinia";
import { Eat } from "@/api/Eat";
import { GraphqlGetEatsResponse } from "@/api/data-contracts";

export const useEatsStore = defineStore("eats", () => {
  const eats = ref<GraphqlGetEatsResponse>();
  const page = ref<number>(1);

  const api = new Eat({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getEats = async () => {
    if (eats.value === undefined) {
      eats.value = (await api.getEat({ city: "Paris", page: page.value })).data;
    }
  };

  return { eats, getEats };
});
