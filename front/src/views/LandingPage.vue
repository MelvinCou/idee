<template>
  <div class="LandingPage">
    <div class="text-content">
      <h1>Embark on a Journey & plan your trip</h1>
      <p class="subheading">
        Discover the art of travel — an adventure designed by your desires.
        Navigate, personalize, and cherish your travel experiences, all within one intuitive app.
      </p>

      <v-autocomplete v-model="selectedDestination" :items="destinations" label="Search destinations" solo hide-details
        class="search-destination" append-icon="mdi-magnify" variant="solo-filled">
      </v-autocomplete>


      <div class="date-picker-container">
        <VueDatePicker v-model="date" range multi-calendars class="date-picker" :enable-time-picker="false" auto-apply
          :min-date="new Date()" prevent-min-max-navigation ref="datepicker"  />
      </div>

      <v-btn @click="showDateAndDestination" large color="red" dark class="mb-2">
        Start planning
      </v-btn>

    </div>
  </div>
</template>




<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { DatePickerInstance } from "@vuepic/vue-datepicker";

const date = ref([]);
const selectedDestination = ref('');
const destinations = ['Paris', 'New York', 'Tokyo', 'London', 'Sydney'];

const datepicker = ref<DatePickerInstance>(null);

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})

const showDateAndDestination = () => {
  const formattedDate = date.value.map(d => d.toISOString().substring(0, 10)).join(' à ');
  const message = `La destination sélectionnée est : ${selectedDestination.value}\nLa date sélectionnée est : ${formattedDate}`;
  console.log(message);
}
</script>

<script lang="ts">
import background from '../assets/images/BG.jpeg';
export default {
  data: () => ({
    backgroundImage: background,
    selectedDestination: null, // Tracks the selected destination
    destinations: [ // TO replace with actual data
      'Paris', 'New York', 'Tokyo', 'London', 'Sydney'
    ],
  }),
}
</script>


<style scoped>
.LandingPage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: url('../assets/images/BG.jpeg') no-repeat center center fixed;
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
</style>