// src/stores/destinationsStore.js
import { defineStore } from 'pinia';

export const useDestinationsStore = defineStore('destinations', {
  state: () => ({
    destinations: [],
  }),
  actions: {
    async fetchDestinations(cityName) {
      try {
        const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityName}&fields=nom,departement&boost=population&limit=5`);
        const data = await response.json();
        this.destinations = data.map((item) => `${item.nom} (${item.departement.code})`);
      } catch (error) {
        console.error("There was an error fetching the destinations:", error);
        this.destinations = [];
      }
    },
  },
});
