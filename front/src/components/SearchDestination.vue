<template>
  <div class="search-container">
    <div class="input-container">
      <input
        v-model="searchQuery"
        @input="handleInput"
        type="text"
        placeholder="Recherchez une ville..."
        class="search-input"

      />
      <button v-if="searchQuery" @click="clearSearch" class="clear-button">X</button>
    </div>
    <ul v-if="cities.length > 0" class="results-list">
      <li
        v-for="city in cities"
        :key="city.mapbox_id"
        @click="selectCity(city)"
        class="city-item"
      >
        {{ city.name }} - {{ city.place_formatted }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const searchQuery = ref("");
    const cities = ref([]);
    let timeoutId = null;
    const router = useRouter();
    const fetchCities = async (query) => {
      const myAccessToken =
        "pk.eyJ1IjoicmVzc2Vra2FraSIsImEiOiJjbHVpNWk1NmkwMHp0MnFteTh3enMxcXdyIn0.liTHNmNTnTDJ48xFuJPbig";
      const bbox = "-4.833986,42.440817,8.248534,51.011153"; // Définissez les coordonnées de la bbox pour la France;
      const unique_session_token = "";
      const url = `https://api.mapbox.com/search/searchbox/v1/suggest?access_token=${myAccessToken}&session_token=${unique_session_token}&bbox=${bbox}&types=city&q=${query}`;

      try {
        const response = await axios.get(url);
        cities.value = response.data.suggestions.map((suggestion) => ({
          mapbox_id: suggestion.mapbox_id,
          name: suggestion.name,
          place_formatted: suggestion.place_formatted,
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des villes :", error);
      }
    };

    const handleInput = () => {
      clearTimeout(timeoutId);
      if (searchQuery.value === "") {
        cities.value = []; 
      } else {
        timeoutId = setTimeout(() => {
          fetchCities(searchQuery.value);
        }, 200);
      }
    };

    const selectCity = (city) => {
      searchQuery.value = `${city.name} - ${city.place_formatted}`;
      cities.value = [];
      router.push({ name: 'CityDetails', params: { name: city.name } });
    };
    const clearSearch = () => {
      searchQuery.value = "";
      cities.value = [];
    };

    return { searchQuery, cities, handleInput, selectCity, clearSearch };
  },
};
const selectCity = (city) => {
  searchQuery.value = `${city.name} - ${city.place_formatted}`;
  cities.value = [];
  // Utilisez le routeur pour naviguer
  this.$router.push({ name: 'CityDetails', params: { name: city.name } });
};


</script>

<style>
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  padding-right : 20px;
  margin: auto;
  margin-top : 20px;
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
  padding-right: 40px; /* Ajoutez un padding à droite pour éviter que le texte ne soit caché par le bouton */
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
