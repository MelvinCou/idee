<template>
    <v-autocomplete
      v-model="selectedCity"
      :items="cities"
      item-text="name"
      item-value="id"
      :search-input.sync="searchQuery"
      @change="selectCity"
      :loading="isLoading"
      clearable
      dense
      solo
      placeholder="Rechercher une ville en France…"
    ></v-autocomplete>

  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  import debounce from 'lodash/debounce';
  
  const searchQuery = ref('');
  const cities = ref([]);
  const selectedCity = ref(null);
  const isLoading = ref(false);
  
  
  const accessToken = 'pk.eyJ1IjoicmVzc2Vra2FraSIsImEiOiJjbHVpNWk1NmkwMHp0MnFteTh3enMxcXdyIn0.liTHNmNTnTDJ48xFuJPbig';
  const sessionToken = ''; // Vous pouvez générer un session token dynamiquement si nécessaire
  const bbox = '-5.142222,41.3672,9.561556,51.089062'; // bbox pour la France
  

  const fetchCities = async (query) => {
    if (query.trim() === '') {
      cities.value = [];
      return;
    }
    isLoading.value = true;
    const apiUrl = `https://api.mapbox.com/search/searchbox/v1/suggest?access_token=${accessToken}&session_token=${sessionToken}&bbox=${bbox}&types=city&q=${encodeURIComponent(query)}`;
  
    try {
      const response = await axios.get(apiUrl);
      cities.value = response.data.suggestions.map(feature => ({
        name: feature.name,
        id: feature.id
      }));
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const debouncedFetchCities = debounce(fetchCities, 300);
  
  watch(searchQuery, (newValue) => {
    debouncedFetchCities(newValue);
  });
  
  const selectCity = (cityId) => {
    console.log('Ville sélectionnée:', cityId);
  };
  </script>
  
<style>

.dropdown {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #eee;
}

.search-input {
  width: 100%;
  padding: 8px;
}
</style>
