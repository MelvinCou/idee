<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
import { useRouter } from "vue-router";

// Initialize useRouter
const router = useRouter();
// Reactive reference for date
const date = ref<Date[]>([]);
// Reference for datepicker instance
const datepicker = ref<DatePickerInstance>(null);

// Set default date range on mount
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});

// Process user inputs and navigate to main page
const processInputs = () => {
  router.push({
    name: "MainPage",
  });
};
</script>

<template>
  <div class="LandingPage">
    <div class="text-content">
      <!-- Landing page content -->
      <h1>Lancez-vous dans un voyage et planifiez votre itinéraire</h1>
      <p class="subheading">
        Découvrez l'art du voyage grâce à cette application conviviale qui vous permet de planifier
        vos itinéraires et de choisir des bars, restaurants et points d'intérêt.
      </p>
      <!-- Date picker component -->
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
      <!-- Start adventure button -->
      <v-btn @click="processInputs" large color="red" dark class="mb-2"
        >Commencez votre aventure</v-btn
      >
    </div>
  </div>
</template>

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

.date-picker-container {
  max-width: 500px;
  margin: 20px auto;
  width: 100%;
}

.wrap {
  display: flex;
  justify-content: center;
  padding: 20px;
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
