<template>
  <div class="LandingPage">
    <div class="text-content">
      <h1>Embark on a Journey & plan your trip</h1>
      <p class="subheading">
        Discover the art of travel — an adventure designed by your desires. Navigate, personalize,
        and cherish your travel experiences, all within one intuitive app.
      </p>
      <SearchDestination @city-selected="onCitySelected" />
      <div class="date-picker-container">
        <VueDatePicker
          v-model="date"
          range
          multi-calendars
          class="date-picker"
          :enable-time-picker="false"
          auto-apply
          :min-date="new Date()"
          prevent-min-max-navigation
          ref="datepicker" />
      </div>

      <v-btn @click="showDateAndDestination" large color="red" dark class="mb-2">
        Start planning
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
import { useDestinationsStore } from "@/stores/destinationsStore";
import background from "../assets/images/BG.jpeg";
import SearchDestination from "@/components/SearchDestination.vue";

// Reactive references
const date = ref([]);
const backgroundImage = ref(background);
const searchQuery = ref("");
const selectedDestination = ref("");

// Reactive reference for destinations
var destinations = ref([]);

// Initialization of the date picker
const datepicker = ref<DatePickerInstance>(null);

// Default date configuration on component mount
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});

const onCitySelected = (city: any) => {
  selectedDestination.value = `${city.name} - ${city.place_formatted}`;
};

// Display the selected destination and dates
const showDateAndDestination = () => {
  const formattedDate = date.value.map((d) => d.toISOString().substring(0, 10)).join(" to ");
  const message = `Selected destination: ${selectedDestination.value}\nSelected date: ${formattedDate}`;
  console.log(message);
};
</script>

<style scoped>
.LandingPage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: url("../assets/images/BG.jpeg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  color: white;
  /* Ensure text is white for better visibility */
}

.text-content {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  /* Optional: Rounds the corners of the text background */
}

.date-picker {
  background-color: white;
  /* Assuming a light theme for the date picker */
  border-radius: 4px;
  /* To match your design's rounded corners */
  color: #000;
  /* Text color for the date picker */
}

.date-picker-container {
  padding-right: 40px;
}

.search-destination,
.date-picker-container {
  max-width: 500px;
  /* Limite la largeur à 500px */
  margin: 20px auto;
  /* Ajoute une marge en haut et en bas, et centre horizontalement */
  width: 100%;
  /* Utilise toute la largeur jusqu'à 500px */
}

.search-destination .v-input__slot {
  background-color: rgba(255, 255, 255, 10);
  /* Blanc avec une légère transparence */
  border-radius: 10px;
  /* Bords arrondis pour le champ de saisie */
}

.search-destination .v-input__control {
  background-color: rgba(255, 255, 255, 100);
  /* Assure que l'arrière-plan s'applique également aux éléments internes */
}

.search-destination .v-select__selections {
  color: #000;
  /* Couleur du texte plus foncée pour une meilleure lisibilité */
}

.wrap {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.search-input-container {
  width: 100%;
  max-width: 600px; /* Ajustez cette largeur selon vos besoins */
}

.search {
  width: 80%;
  padding: 10px 40px 10px 15px; /* Espace pour l'icône de recherche */
  font-size: 16px;
  border: 2px solid #ccc; /* Bordure subtile */
  border-radius: 25px; /* Bords arrondis pour un look moderne */
  outline: none; /* Supprime l'outline par défaut au focus */
  box-sizing: border-box; /* Assure que le padding ne change pas la largeur */
}

.search:focus {
  border-color: #007bff; /* Change la couleur de la bordure lors du focus */
}

.feather-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%); /* Centre l'icône verticalement */
  cursor: pointer;
  color: #007bff; /* Couleur de l'icône */
}

/* Vous pouvez ajouter des styles supplémentaires pour les états hover ou active de l'icône, par exemple : */
.feather-icon:hover {
  color: #0056b3;
}
</style>
