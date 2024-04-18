<template>
  <div class="LandingPage">
    <div class="text-content">
      <h1>Lancez-vous dans un voyage et planifiez votre itinéraire</h1>
      <p class="subheading">
        Découvrez l'art du voyage grâce à cette application conviviale qui vous permet de planifier
        vos itinéraires et de choisir des bars, restaurants et points d'intérêt.
      </p>
      <div class="date-picker-container">
        <VueDatePicker
          v-model="date"
          range
          multi-calendars
          class="date-picker"
          :enable-time-picker="false"
          auto-apply
          :min-date="new Date()"
          prevent-min-max-navigation
          ref="datepicker" />
      </div>
      <v-btn @click="processInputs" large color="red" dark class="mb-2"> Start planning </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
import { useRouter } from "vue-router";

const router = useRouter();
const date = ref<Date[]>([]);
const selectedDestination = ref("");

const datepicker = ref<DatePickerInstance>(null);

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});

const processInputs = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formattedDate = date.value.map((d) => d.toISOString().substring(0, 10)).join(" to ");
  router.push({
    name: "MainPage",
    params: { cityId: selectedDestination.value },
  });

  //TODO: Add logic to process the user inputs
};
</script>

<style scoped>
.LandingPage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: url("../assets/images/BG.jpeg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  color: white;
}

.text-content {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

.date-picker {
  background-color: white;
  border-radius: 4px;
  color: #000;
}

.date-picker-container {
  padding-right: 40px;
}

.search-destination,
.date-picker-container {
  max-width: 500px;
  margin: 20px auto;
  width: 100%;
}

.search-destination .v-input__slot {
  background-color: rgba(255, 255, 255, 10);
  border-radius: 10px;
}

.search-destination .v-input__control {
  background-color: rgba(255, 255, 255, 100);
}

.search-destination .v-select__selections {
  color: #000;
}

.wrap {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.search-input-container {
  width: 100%;
  max-width: 600px;
}

.search {
  width: 80%;
  padding: 10px 40px 10px 15px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 25px;
  outline: none;
  box-sizing: border-box;
}

.search:focus {
  border-color: #007bff;
}

.feather-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #007bff;
}

.feather-icon:hover {
  color: #0056b3;
}
</style>
