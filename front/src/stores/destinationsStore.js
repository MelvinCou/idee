import { defineStore } from "pinia";

export const useDestinationsStore = defineStore("destinations", {
  state: () => ({
    destinations: [],
    error: null, // Ajout d'un état d'erreur
  }),
  actions: {
    async fetchDestinations(cityName) {
      this.error = null; // Réinitialisation de l'état d'erreur avant l'appel API
      try {
        const response = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${cityName}&fields=nom,departement&boost=population&limit=5`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch destinations");
        }
        const data = await response.json();
        this.destinations = data.map((item) => `${item.nom} (${item.departement.code})`);
      } catch (error) {
        this.error = error.message || "An error occurred";
        this.destinations = [];
      }
    },
  },
});
