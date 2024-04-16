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
  comment?: string;
  description?: string;
  link?: string;
  contact?: string; // telephone or email
  location: {
    longitude?: Number;
    latitude?: Number;
  };
  reducedMobilityAccess?: boolean;
  dateUpdate?: string;
  // we may delete this
  img?: string;
}

export class Data implements CardData {
  title?: string;
  comment?: string;
  description?: string;
  link?: string;
  contact?: string;
  location: {
    longitude?: Number;
    latitude?: Number;
  };
  reducedMobilityAccess?: boolean;
  dateUpdate?: string;

  constructor(
    r:
      | GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterest
      | GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterest
      | GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterest
      | GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterest
      | GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterest,
  ) {
    this.title = r.rdfs_label && r.rdfs_label[0] && r.rdfs_label[0].value;
    this.comment = r.rdfs_comment && r.rdfs_comment[0] && r.rdfs_comment[0].value;
    this.description =
      r.hasDescription &&
      r.hasDescription[0] &&
      r.hasDescription[0].dc_description &&
      r.hasDescription[0].dc_description[0] &&
      r.hasDescription[0].dc_description[0].value;
    this.link =
      r.hasContact &&
      r.hasContact[0] &&
      r.hasContact[0].foaf_homepage &&
      r.hasContact[0].foaf_homepage[0];
    this.contact =
      r.hasContact &&
      r.hasContact[0] &&
      ((r.hasContact[0].schema_email && r.hasContact[0].schema_email[0]) ||
        (r.hasContact[0].schema_telephone && r.hasContact[0].schema_telephone[0]));

    this.location = {
      latitude:
        r.isLocatedAt &&
        r.isLocatedAt[0] &&
        r.isLocatedAt[0].schema_geo &&
        r.isLocatedAt[0].schema_geo[0] &&
        r.isLocatedAt[0].schema_geo[0].schema_latitude &&
        r.isLocatedAt[0].schema_geo[0].schema_latitude[0],
      longitude:
        r.isLocatedAt &&
        r.isLocatedAt[0] &&
        r.isLocatedAt[0].schema_geo &&
        r.isLocatedAt[0].schema_geo[0] &&
        r.isLocatedAt[0].schema_geo[0].schema_longitude &&
        r.isLocatedAt[0].schema_geo[0].schema_longitude[0],
    };

    this.reducedMobilityAccess = r.reducedMobilityAccess && r.reducedMobilityAccess[0];
    this.dateUpdate = r.lastUpdateDatatourisme && r.lastUpdateDatatourisme[0];
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
          Back
        </v-btn>
        {{ data.title }}
      </h1>
    </div>
    <!-- <v-img v-if="data.img" aspect-ratio="1.555" cover :src="data.img">
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
        </div>
      </template>
    </v-img> -->

    <v-chip-group>
      <v-chip>Chip 1</v-chip>

      <v-chip>Chip 2</v-chip>

      <v-chip>Chip 3</v-chip>
    </v-chip-group>
    <v-btn block size="large" color="green"><strong>+</strong> Ajouter à l'intinéraire </v-btn>
    <v-btn block size="large" color="red"><strong>-</strong> Retirer à l'intinéraire </v-btn>
    <v-divider></v-divider>

    <div v-if="data.description">
      <h1>Description officiel</h1>
      <p>{{ data.description }}</p>
      <v-divider></v-divider>
    </div>
    <div v-else-if="data.comment">
      <h1>Description officiel</h1>
      <p>{{ data.comment }}</p>
      <v-divider></v-divider>
    </div>

    <div v-if="data.link">
      <h1>Site web</h1>
      <a v-bind:href="data.link" target="_blank" variant="plain">{{ data.link }}</a>
      <v-divider></v-divider>
    </div>
    <div v-if="data.contact">
      <h1>Contact</h1>
      <p>{{ data.contact }}</p>
      <v-divider></v-divider>
    </div>
    <div v-if="data.location">
      <h1>Localisation</h1>
      <p>{{ data.location }}</p>
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
