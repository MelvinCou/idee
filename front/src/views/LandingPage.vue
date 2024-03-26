<template>
  <div class="LandingPage">
    <div class="text-content">
      <h1>You'll never travel without our trip planner again</h1>
      <p class="subheading">
        Travel planning at its best. Build, organize, and map your custom itineraries in a free travel app designed for
        vacations & road trips, powered by our trip planner AI.
      </p>


      

      <v-autocomplete v-model="selectedDestination" :items="destinations" label="Search destinations" solo hide-details
        class="search-destination" append-icon="mdi-magnify"></v-autocomplete>
      <v-btn large color="red" dark class="mb-2">
        Start planning
      </v-btn>
      <v-btn large outlined color="white" class="mb-2">
        Get the app
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
  /* Optional: Adds readability */
  border-radius: 8px;
  /* Optional: Rounds the corners of the text background */
}

.search-destination {
  margin: 20px 0;
  /* Spacing above and below the search input */
}
</style>