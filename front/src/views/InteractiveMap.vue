<template>
  <div id="map" style="height: 400px"></div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import L from "leaflet";

export default {
  setup() {
    let map;

    onMounted(() => {
      // Initialize the map
      map = L.map("map").setView([51.505, -0.09], 13);

      // Set up the OSM layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      }).addTo(map);
    });

    onUnmounted(() => {
      // Proper cleanup to prevent memory leaks
      map.remove();
    });

    return {};
  },
};
</script>

<style>
/* Ensure the map container has a defined height, or the map won't be visible */
</style>
