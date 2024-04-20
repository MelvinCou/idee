<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMapPointsStore } from "@/stores/mapPoints";

const router = useRouter();
const route = useRoute();
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

interface MapProps {
  center: [number, number];
  maxBounds: [[number, number], [number, number]];
}

const map = ref<mapboxgl.Map | null>(null);

const mapProps: MapProps = {
  center: [2.3522, 48.8566],
  maxBounds: [
    [-180, -85],
    [180, 85],
  ],
};

const initializeMap = () => {
  if (map.value) {
    map.value.remove();
  }

  map.value = new mapboxgl.Map({
    container: "mapContainer",
    style: "mapbox://styles/mapbox/streets-v11",
    ...mapProps,
  });

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
};

const fetchCityDetails = async (cityId: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${cityId}?access_token=${MAPBOX_ACCESS_TOKEN}&session_token=null`,
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates as [number, number];
      map.value?.flyTo({
        center: coordinates,
        essential: true,
        zoom: 10,
      });
    } else {
      console.error("No features found in the data");
    }
  } catch (error) {
    console.error("Error fetching city details:", error);
  }
};

onMounted(() => {
  initializeMap();
  if (route.params.cityId) {
    fetchCityDetails(route.params.cityId as string);
  }
});

watch(router.currentRoute, () => {
  initializeMap();
  if (route.params.cityId) {
    fetchCityDetails(route.params.cityId as string);
  }
});

watch(useMapPointsStore().mapPoints, () => {
  if (map.value) {
    // Remove all markers
    const markers = map.value?.getContainer().querySelectorAll(".mapboxgl-marker");
    markers?.forEach((marker) => {
      marker.remove();
    });
    // Add markers for each point
    useMapPointsStore().mapPoints.forEach((point) => {
      new mapboxgl.Marker()
        .setLngLat({ lat: point.latitude || 0, lon: point.longitude || 0 })
        // Add a popup to the marker with the title of the point
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${point.title || ""}</h3>`))
        // Add the marker to the map
        .addTo(map.value!);
    });
  }
});
</script>

<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<style scoped>
.basemap {
  width: 100%;
  height: 100%;
}
</style>
