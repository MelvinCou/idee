import { ref } from "vue";
import { defineStore } from "pinia";
import { Travel } from "@/api/Travel";
import { GraphqlGetTravelsResponse } from "@/api/data-contracts";

export const useTravelsStore = defineStore("travels", () => {
  const travels = ref<GraphqlGetTravelsResponse>();
  const page = ref<number>(1);

  const api = new Travel({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const getTravels = async () => {
    if (travels.value === undefined) {
      travels.value = (await api.travelList({ city: "Paris", page: page.value })).data;
    }
  };

  return { travels, getTravels };
});
