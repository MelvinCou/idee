<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "default", // Optional title
  },
  img: String,
  pins: [String],
  publicDescription: String,
  wikipediaDescription: String,
  address: String,
  location: String,
  webSite: String,
  dataProduceur: String,
  dateUpdate: String,
  isClick: Boolean,
});
const emit = defineEmits(["back", "roll_back"]);

const goback = (bool: boolean) => {
  emit("back", !bool);
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h1 v-if="title">
        <v-btn @click="goback(isClick)" class="ma-2" color="red">
          <v-icon icon="mdi-arrow-left" start></v-icon>
          ← Back
        </v-btn>
        {{ title }}
      </h1>
    </div>
    <v-img aspect-ratio="1.555" cover :src="img">
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
        </div>
      </template>
    </v-img>

    <v-chip-group>
      <v-chip>Chip 1</v-chip>

      <v-chip>Chip 2</v-chip>

      <v-chip>Chip 3</v-chip>
    </v-chip-group>
    <v-btn block size="large" color="green"><strong>+</strong> Ajouter à l'intinéraire </v-btn>
    <v-btn block size="large" color="red"><strong>-</strong> Retirer à l'intinéraire </v-btn>
    <v-divider></v-divider>

    <h1>Description officiel</h1>
    <p>{{ publicDescription }}</p>
    <v-divider></v-divider>
    <h1>Adress</h1>
    <p>{{ address }}</p>
    <v-divider></v-divider>
    <h1>Localisation</h1>
    <p>{{ location }}</p>
    <v-divider></v-divider>
    <h1>Site web</h1>
    <p>{{ webSite }}</p>
    <v-divider></v-divider>
    <h1>Producteur de la donnée</h1>
    <p>{{ dataProduceur }}</p>
    <v-divider></v-divider>
    <h1>Date de mise à jour</h1>
    <p>{{ dateUpdate }}</p>
    <v-divider></v-divider>
  </div>
</template>
<style scoped>
.title {
  background-color: rgb(137, 58, 58);
  width: 100%;
  text-align: center;
  /* text-align: center;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  left: 100%; */
}
.container {
  background-color: purple;
  width: 100%;
  overflow-y: auto;
  height: 100vh;
  z-index: 2;
  position: absolute;
  padding-bottom: 15%;
}
</style>
