<script setup lang="ts">
import type { MapBoxSuggestion } from "@/interfaces/main";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref<string>("");
const cities = ref<MapBoxSuggestion[]>([]);
let timeoutId: number = 0;

const emit = defineEmits(["selectedCity"]);

const fetchCities = async () => {
  const myAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const bbox = "-4.833986,42.440817,8.248534,51.011153"; // bbox for France;
  const unique_session_token = "";
  const url = `https://api.mapbox.com/search/searchbox/v1/suggest?access_token=${myAccessToken}&session_token=${unique_session_token}&bbox=${bbox}&types=city&q=${searchQuery.value}`;

  try {
    const response = await axios.get(url);
    cities.value = response.data.suggestions.map((suggestion: MapBoxSuggestion) => ({
      mapbox_id: suggestion.mapbox_id,
      name: suggestion.name,
      place_formatted: suggestion.place_formatted,
    }));
  } catch (error) {
    console.error("Error in retrieving city names :", error);
  }
};

const handleInput = () => {
  clearTimeout(timeoutId);
  if (searchQuery.value === "") {
    cities.value = [];
  } else {
    timeoutId = setTimeout(() => {
      fetchCities();
    }, 200);
  }
};

const selectCity = (city: MapBoxSuggestion) => {
  searchQuery.value = `${city.name} - ${city.place_formatted}`;
  cities.value = [];
  emit("selectedCity", city.name);
  router.push({ name: "MainPage", params: { cityId: city.mapbox_id } });
};
</script>

<template>
  <div class="search-container">
    <div class="input-container">
      <v-text-field
        v-model="searchQuery"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Où veux-tu aller ?"
        variant="solo"
        hide-details
        single-line
        @input="handleInput" />
    </div>
    <ul v-if="cities.length > 0" class="results-list">
      <li v-for="city in cities" :key="city.mapbox_id" @click="selectCity(city)" class="city-item">
        {{ city.name }} - {{ city.place_formatted }}
      </li>
    </ul>
  </div>
</template>

<style>
.search-container {
  position: absolute;
  z-index: 9999;
  width: 40%;
  height: auto;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
  padding-right: 40px;
  color: #333;
  background-color: #fff;
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: #ff0000;
  color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.results-list {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  background-color: #cccccc;
  color: black;
  max-height: 200px;
  overflow-y: auto;
}

.city-item {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
}

.city-item:last-child {
  border-bottom: none;
}

.city-item:hover {
  background-color: #969696;
}
</style>
