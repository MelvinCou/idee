<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

// Assume the access token is set correctly in your environment variables
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// Interface for defining the structure of map properties
interface MapProps {
  center: [number, number]; // Longitude, Latitude
  maxBounds: [[number, number], [number, number]]; // Southwest [lon, lat] and Northeast [lon, lat]
}

const map = ref<mapboxgl.Map | null>(null);
const route = useRoute();

// Default map properties
const mapProps: MapProps = {
  center: [2.3522, 48.8566], // Default center, e.g., Paris
  maxBounds: [
    [-180, -85], // Southwest bounds
    [180, 85], // Northeast bounds
  ],
};

onMounted(async () => {
  // Initialize the map
  map.value = new mapboxgl.Map({
    container: "mapContainer",
    style: "mapbox://styles/mapbox/streets-v11",
    ...mapProps,
  });

  // Add essential map controls
  map.value.addControl(new mapboxgl.NavigationControl(), "top-right");
  map.value.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }),
    "top-right",
  );

  // Fetch city details based on the city ID from the route query
  const cityId = route.params.cityId;
  if (cityId) {
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/searchbox/v1/retrieve/${cityId}?access_token=${MAPBOX_ACCESS_TOKEN}&session_token=null`,
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates as [number, number];
        map.value.flyTo({
          center: coordinates,
          essential: true,
          zoom: 10,
        });
        new mapboxgl.Marker().setLngLat(coordinates).addTo(map.value);
      } else {
        console.error("No features found in the data");
      }
    } catch (error) {
      console.error("Error fetching city details:", error);
    }
  }
});
</script>

<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 100%;
}
</style>
