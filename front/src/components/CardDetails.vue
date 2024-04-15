<script lang="ts">
import type {
  GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterest,
  GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterest,
  GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterest,
  GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterest,
  GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterest,
} from "@/api/data-contracts";

export interface CardData {
  title?: string;
  img?: string;
  publicDescription?: string;
  wikipediaDescription?: string;
  address?: string;
  location?: string;
  webSite?: string;
  dataProduceur?: string;
  dateUpdate?: string;
}

export class Data implements CardData {
  title?: string | undefined;
  img?: string | undefined;
  publicDescription?: string | undefined;
  wikipediaDescription?: string | undefined;
  address?: string | undefined;
  location?: string | undefined;
  webSite?: string | undefined;
  dataProduceur?: string | undefined;
  dateUpdate?: string | undefined;

  constructor(
    r:
      | GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterest
      | GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterest
      | GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterest
      | GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterest
      | GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterest,
  ) {
    this.title = r.rdfs_label && r.rdfs_label[0] && r.rdfs_label[0].value;
    this.address =
      r.hasContact &&
      r.hasContact[0] &&
      r.hasContact[0].foaf_homepage &&
      r.hasContact[0].foaf_homepage[0];
    this.webSite =
      r.hasContact &&
      r.hasContact[0] &&
      r.hasContact[0].foaf_homepage &&
      r.hasContact[0].foaf_homepage[0];
    this.publicDescription = r.rdfs_comment && r.rdfs_comment[0] && r.rdfs_comment[0].value;
    this.location = "";
    this.dataProduceur =
      r.hasContact &&
      r.hasContact[0] &&
      ((r.hasContact[0].schema_email && r.hasContact[0].schema_email[0]) ||
        (r.hasContact[0].schema_telephone && r.hasContact[0].schema_telephone[0]));
    this.dateUpdate = r.lastUpdateDatatourisme && r.lastUpdateDatatourisme[0];
    this.img = "";
    this.wikipediaDescription = "";
  }
}
</script>

<script setup lang="ts">
const props = defineProps<{
  data: CardData;
  isClick: boolean;
  pins: String;
}>();
const emit = defineEmits(["back", "roll_back"]);

const goback = (bool: boolean) => {
  emit("back", !bool);
};
</script>
<template>
  <div class="container">
    <div class="title">
      <h1 v-if="data.title">
        <v-btn @click="goback(isClick)" class="ma-2" color="red">
          <v-icon icon="mdi-arrow-left" start></v-icon>
          ← Back
        </v-btn>
        {{ data.title }}
      </h1>
    </div>
    <v-img v-if="data.img" aspect-ratio="1.555" cover :src="data.img">
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

    <div v-if="data.publicDescription">
      <h1>Description officiel</h1>
      <p>{{ data.publicDescription }}</p>
      <v-divider></v-divider>
    </div>
    <div v-if="data.address">
      <h1>Adresse</h1>
      <p>{{ data.address }}</p>
      <v-divider></v-divider>
    </div>
    <div v-if="data.location">
      <h1>Localisation</h1>
      <p>{{ data.location }}</p>
      <v-divider></v-divider>
    </div>
    <div v-if="data.webSite">
      <h1>Site web</h1>
      <a v-bind:href="data.webSite" target="_blank" variant="plain">{{ data.webSite }}</a>
      <v-divider></v-divider>
    </div>
    <div v-if="data.dataProduceur">
      <h1>Producteur de la donnée</h1>
      <p>{{ data.dataProduceur }}</p>
      <v-divider></v-divider>
    </div>
    <div v-if="data.dateUpdate">
      <h1>Date de mise à jour</h1>
      <p>{{ data.dateUpdate }}</p>
      <v-divider></v-divider>
    </div>
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
a {
  color: aqua !important;
}
</style>
