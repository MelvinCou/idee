<script setup lang="ts">
import mapboxgl from "mapbox-gl"; // Import Mapbox library
import { onMounted } from "vue";
import { useMapPointsStore } from "../stores/mapPoints";

const mapPointsStore = useMapPointsStore();

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; // Access token from environment variable

interface MapProps {
  center: [number, number]; // Interface for map center coordinates
  maxBounds: [[number, number], [number, number]]; // Interface for map boundaries
}

const mapProps: MapProps = {
  // Define map properties
  center: [103.811279, 1.345399],
  maxBounds: [
    [103.6, 1.1704753],
    [104.1, 1.4754753],
  ],
};

onMounted(() => {
  let map: mapboxgl.Map | null = null; // Reactive ref for the map instance
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  const nav = new mapboxgl.NavigationControl();

  map = new mapboxgl.Map({
    container: "mapContainer",
    style: "mapbox://styles/mapbox/streets-v11",
    ...mapProps, // Spread map properties
  });
  map.addControl(nav, "top-right");
  new mapboxgl.Marker().setLngLat([103.811279, 1.345399]).addTo(map);
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  });

  map.addControl(geolocate, "top-right");
});
</script>

<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 100%;
}
</style>
