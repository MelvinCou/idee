<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';

// Accès à la variable d'environnement
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const mapContainer = ref(null);

onMounted(() => {
  const map = new mapboxgl.Map({
    container: mapContainer.value, // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // position de départ [lng, lat]
    zoom: 9 // niveau de zoom de départ
  });
});
</script>

<style>
.map-container {
  width: 100%;
  height: 400px;
}
</style>
