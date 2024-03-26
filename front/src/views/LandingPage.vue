<template>
  <div class="LandingPage">
    <div class="text-content">
      <h1>Embark on a Journey & plan your trip</h1>
      <p class="subheading">
        Discover the art of travel — an adventure designed by your desires. 
        Navigate, personalize, and cherish your travel experiences, all within one intuitive app.
      </p>

      <v-autocomplete v-model="selectedDestination" :items="destinations" label="Search destinations" solo hide-details
        class="search-destination" append-icon="mdi-magnify">
      </v-autocomplete>

      <div class="date-picker-container">
        <VueDatePicker v-model="date" range class="date-picker" :enable-time-picker="false" auto-apply :min-date="new Date()" prevent-min-max-navigation/>
      </div>
      <v-btn large color="red" dark class="mb-2">
        Start planning
      </v-btn>

    </div>
  </div>
</template>


<script>
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

.search-destination {
  margin: 20px 0;
  /* Spacing above and below the search input */
}

.date-picker-container {
  margin: 20px 0; /* Consistent with the search bar margin */
}

.date-picker {
  background-color: white; /* Assuming a light theme for the date picker */
  border-radius: 4px; /* To match your design's rounded corners */
  color: #000; /* Text color for the date picker */
}

</style>