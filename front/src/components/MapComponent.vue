<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type * as Geojson from "geojson";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMapPointsStore } from "@/stores/mapPoints";

import type { Point } from "@/stores/mapPoints";
import type { DirectionResponse, MapState } from "@/interfaces/main";

/** Access token from environment variable */
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

/** Map style */
const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";

/** Default map properties */
const mapProps: mapboxgl.MapboxOptions = {
  container: "mapContainer",
  style: MAP_STYLE,
  center: [-1.553621, 47.218372],
  zoom: 13,
};

/** Vue router instance */
const router = useRouter();

/** Vue route instance */
const route = useRoute();

/** Initialize Mapbox access token */
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

/** Reference to the map state */
const map = ref<MapState>({
  map: null,
});

/**
 * Initializes the map with default properties and controls.
 */
const initializeMap = () => {
  if (map.value) {
    map.value.map?.remove();
  }

  map.value.map = new mapboxgl.Map(mapProps);
  map.value.map.addControl(new mapboxgl.NavigationControl(), "top-right");
  new mapboxgl.Marker().setLngLat([103.811279, 1.345399]).addTo(map.value.map);
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
  });

  map.value.map.addControl(geolocate, "top-right");
};

/**
 * Fetches city details and centers the map on the city.
 * @param {string} cityId - The ID of the city.
 */
const fetchCityDetails = async (cityId: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/searchbox/v1/retrieve/${cityId}?access_token=${MAPBOX_ACCESS_TOKEN}&session_token=null`,
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates as [number, number];
      map.value?.map?.flyTo({
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

/**
 * Fetches directions for the given itinerary and displays the route on the map.
 * @param {Point[]} itinerary - The itinerary points.
 * @param {string} profile - The travel profile (e.g., "cycling").
 * @param {string} token - The Mapbox access token.
 * @param {mapboxgl.Map | null} map - The map instance.
 */
async function fetchDirections(
  itinerary: Point[],
  profile: string,
  token: string,
  map: mapboxgl.Map | null,
) {
  const accessToken = token;

  const coordinates = itinerary.map((point) => `${point.longitude},${point.latitude}`);

  if (itinerary.length === 1) {
    coordinates.push(coordinates[0]);
  }

  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates.join(";")}?geometries=geojson&access_token=${accessToken}&overview=full`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response issue");
  }
  const res = response.json() as Promise<DirectionResponse>;
  const data = (await res).routes[0];
  const route = data.geometry.coordinates;
  const geojson: Geojson.Feature = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: route,
    },
  };

  if (map?.getSource("route")) {
    const geojsonsource: mapboxgl.AnySourceImpl = map.getSource("route");
    if (geojsonsource.type == "geojson") {
      geojsonsource.setData(geojson);
    }
  } else {
    map?.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geojson,
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });
  }
}

onMounted(() => {
  initializeMap();
  if (route.params.cityId) {
    fetchCityDetails(route.params.cityId as string);
  }
});

/**
 * Vue watcher: Watches for route changes and re-initializes the map if necessary.
 */
watch(router.currentRoute, () => {
  initializeMap();
  if (route.params.cityId) {
    fetchCityDetails(route.params.cityId as string);
  }
});

/**
 * Vue watcher: Watches for changes in map points and updates the map accordingly.
 */
watch(useMapPointsStore().mapPoints, () => {
  if (map.value) {
    // Remove all markers
    const markers = map.value?.map?.getContainer().querySelectorAll(".mapboxgl-marker");
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
        .addTo(map.value.map!);
    });
    fetchDirections(useMapPointsStore().mapPoints, "cycling", MAPBOX_ACCESS_TOKEN, map.value.map);
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
