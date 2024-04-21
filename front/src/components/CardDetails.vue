<!-- eslint-disable no-useless-catch -->
<script lang="ts">
import type {
  GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterest,
  GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterest,
  GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterest,
  GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterest,
  GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterest,
} from "@/api/data-contracts";
import type { CardData } from "@/interfaces/main";
import fetchImages from "@/api/google-image";

export class Data implements CardData {
  title?: string;
  description?: string;
  comment?: string;
  contact?: {
    homepage?: string;
    telephone?: string;
    email?: string;
  };
  location: {
    longitude?: number;
    latitude?: number;
    address?: {
      city?: string;
      postalCode?: string;
      street?: string;
    };
  };
  reducedMobilityAccess?: boolean;
  dateUpdate?: string;
  img?: string[];

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
    this.contact = {
      homepage:
        r.hasContact &&
        r.hasContact[0] &&
        r.hasContact[0].foaf_homepage &&
        r.hasContact[0].foaf_homepage[0],
      telephone:
        r.hasContact &&
        r.hasContact[0] &&
        r.hasContact[0].schema_telephone &&
        r.hasContact[0].schema_telephone[0],
      email:
        r.hasContact &&
        r.hasContact[0] &&
        r.hasContact[0].schema_email &&
        r.hasContact[0].schema_email[0],
    };
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
      address: {
        city:
          r.isLocatedAt &&
          r.isLocatedAt[0] &&
          r.isLocatedAt[0].schema_address &&
          r.isLocatedAt[0].schema_address[0] &&
          r.isLocatedAt[0].schema_address[0].schema_addressLocality &&
          r.isLocatedAt[0].schema_address[0].schema_addressLocality[0],
        postalCode:
          r.isLocatedAt &&
          r.isLocatedAt[0] &&
          r.isLocatedAt[0].schema_address &&
          r.isLocatedAt[0].schema_address[0] &&
          r.isLocatedAt[0].schema_address[0].schema_postalCode &&
          r.isLocatedAt[0].schema_address[0].schema_postalCode[0],
        street:
          r.isLocatedAt &&
          r.isLocatedAt[0] &&
          r.isLocatedAt[0].schema_address &&
          r.isLocatedAt[0].schema_address[0] &&
          r.isLocatedAt[0].schema_address[0].schema_streetAddress &&
          r.isLocatedAt[0].schema_address[0].schema_streetAddress[0],
      },
    };
    this.reducedMobilityAccess = r.reducedMobilityAccess && r.reducedMobilityAccess[0];
    this.dateUpdate = r.lastUpdateDatatourisme && r.lastUpdateDatatourisme[0];
  }

  async getImages() {
    try {
      if (this.title) {
        const images: string[] = [];
        const response = await fetchImages(this.title);
        if (response) {
          response.forEach((element: any) => {
            images.push(element.link);
          });
          this.img = images;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
</script>

<script setup lang="ts">
import PointButton from "@/components/PointButton.vue";
import CarouselsComponent from "@/components/CarouselsComponent.vue";

const props = defineProps<{
  data: CardData;
  isClick: boolean;
  pins: string;
}>();

const emit = defineEmits(["back", "roll_back"]);

const goback = (bool: boolean) => {
  emit("back", !bool);
};
</script>

<template>
  <div class="container">
    <CarouselsComponent :images="props.data.img" />

    <v-btn @click="goback(props.isClick)" class="button-back" color="red">
      <v-icon icon="mdi-arrow-left" />
    </v-btn>
    <div class="content">
      <h2 v-if="props.data.title">
        {{ props.data.title }}
      </h2>
      <div>
        <p>{{ props.data.description }}</p>
        <v-divider></v-divider>
      </div>
      <div class="information-div" v-if="props.data.contact">
        <h3>Informations</h3>
        <div v-if="props.data.contact.email">
          <h5>Email</h5>
          <p>{{ props.data.contact.email }}</p>
        </div>
        <div v-if="props.data.contact.telephone">
          <h5>Telephone</h5>
          <p>{{ props.data.contact.telephone }}</p>
        </div>
        <div v-if="props.data.location.address">
          <h5>Localisation</h5>
          <p>
            {{ props.data.location.address.street }}, {{ props.data.location.address.city }}
            {{ props.data.location.address.postalCode }}
          </p>
          <v-divider></v-divider>
        </div>
      </div>
      <div class="grid-card">
        <v-row>
          <v-col cols="6" md="6">
            <div class="square">
              <a :href="props.data.contact?.homepage" target="_blank" variant="plain">
                <v-icon
                  :class="props.data.contact?.homepage ? 'icon-available' : 'icon-not-available'"
                  icon="mdi-web" />
              </a>
            </div>
          </v-col>
          <v-col cols="6" md="6">
            <div class="square">
              <v-icon
                style="cursor: default !important"
                :class="props.data.reducedMobilityAccess ? 'icon-available' : 'icon-not-available'"
                icon="mdi-wheelchair" />
            </div>
          </v-col>
        </v-row>
      </div>
      <v-divider></v-divider>
      <div class="div-before-button" v-if="props.data.dateUpdate">
        <h5>Date de mise à jour</h5>
        <p>{{ props.data.dateUpdate }}</p>
      </div>
      <PointButton :data="props.data" :big="true" />
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
}

.container {
  background-color: white;
  width: fit-content;
  padding-bottom: 2%;
  height: 100%;
  display: flex; /* Ajoutez cette ligne */
  flex-direction: column; /* Ajoutez cette ligne */
}

.content {
  width: 90%;
  margin: auto;
  margin-top: 2%;
  flex: 1; /* Ajoutez cette ligne */
  overflow-y: auto; /* pour permettre le défilement si le contenu est trop long */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

div {
  color: black !important;
}

.button-back {
  position: absolute;
  left: 15px;
  top: 10px;
}

.square {
  background-color: #e0e0e0; /* ou toute autre couleur de fond */
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-row {
  margin: 0 !important;
  justify-content: space-evenly;
}

.v-icon {
  font-size: xx-large;
}

.v-divider {
  margin-top: 2%;
  margin-bottom: 2%;
}

.icon-available {
  cursor: pointer;
  color: blue;
  font-weight: 900;
}

.icon-not-available {
  cursor: default;
  color: black;
  opacity: 80%;
  font-weight: 900;
}

.div-before-button {
  margin-bottom: 4%;
}
</style>
