<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type * as Geojson from "geojson";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Point } from "@/stores/mapPoints";
import { useMapPointsStore } from "@/stores/mapPoints";

export interface DirectionResponse {
  waypoints: Waypoint[];
  routes: Route[];
  code: string;
}

export interface Route {
  legs: Leg[];
  weight_name: string;
  geometry: Geometry;
  weight: number;
  distance: number;
  duration: number;
}

export interface Geometry {
  coordinates: Array<number[]>;
  type: string;
}

export interface Leg {
  steps: any[];
  weight: number;
  distance: number;
  summary: string;
  duration: number;
}

export interface Waypoint {
  location: number[];
  name: string;
}

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN; // Access token from environment variable
const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";
const mapProps: mapboxgl.MapboxOptions = {
  container: "mapContainer",
  style: MAP_STYLE,
  center: [-1.553621, 47.218372],
  zoom: 13,
};

const router = useRouter();
const route = useRoute();

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

interface MapState {
  map: mapboxgl.Map | null; // Interface for the map state
}
//  let map: ref<mapboxgl.Map | null>(null); // Reactive ref for the map instance
const map = ref<MapState>({
  map: null, // Initialize the map as null initially
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

async function fetchDirections(
  itinerary: Point[],
  profile: string,
  token: string,
  map: mapboxgl.Map | null,
) {
  const accessToken = token;

  // Create a list of comma-separated coordinates
  const coordinates = itinerary.map((point) => `${point.longitude},${point.latitude}`);

  // Handle single point case (round trip)
  if (itinerary.length === 1) {
    coordinates.push(coordinates[0]); // Duplicate the first point for a round trip
  }

  // Build the URL with semicolon-separated coordinates
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

  // if the route already exists on the map, we'll reset it using setData
  if (map?.getSource("route")) {
    const geojsonsource: mapboxgl.AnySourceImpl = map.getSource("route");
    if (geojsonsource.type == "geojson") {
      geojsonsource.setData(geojson);
    }
  }
  // otherwise, we'll make a new request
  else {
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
  fetchDirections(start, end, "cycling", MAPBOX_ACCESS_TOKEN, map.value.map)
    .then((data) => console.log(data))
    .catch((error) => console.error("There was a problem with your fetch operation: ", error));
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
