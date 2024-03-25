<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      
      <!-- Text Section -->
      <v-col cols="12" md="6" class="text-section">
        <div class="text-content">
          <h1>You'll never travel without our trip planner again</h1>
          <p class="subheading">
            Travel planning at its best. Build, organize, and map your custom itineraries in a free travel app designed for vacations & road trips, powered by our trip planner AI.
          </p>
          <v-btn large color="red" dark class="mb-2">
            Start planning
          </v-btn>
          <v-btn large outlined color="white" class="mb-2">
            Get the app
          </v-btn>
        </div>
      </v-col>

      <!-- Image Section -->
      <v-col cols="12" md="6" class="image-section">
        <v-img
          :src="backgroundImage"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          class="white--text fill-height"
        ></v-img>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import background from '../assets/images/BG.jpeg';

export default {
  data: () => ({
    backgroundImage: background,
  }),
}
</script>

<style scoped>
.text-section {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: 2rem;
}

.text-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.text-content .subheading {
  font-size: 1rem;
  margin-bottom: 2rem;
}

.image-section {
  position: relative;
}

@media (max-width: 960px) {
  .text-section, .image-section {
    text-align: center;
    padding: 1rem;
  }
}
</style>
