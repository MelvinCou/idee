<script setup lang="ts">
import type { CardData } from "@/components/CardDetails.vue";
import { useMapPointsStore } from "@/stores/mapPoints";

const mapPointsStore = useMapPointsStore();

const props = defineProps<{
  data: CardData;
  big: boolean;
}>();
</script>

<template>
  <div v-if="props.big">
    <v-btn
      block
      size="large"
      color="green"
      prepend-icon="mdi-plus"
      v-if="!mapPointsStore.includes($props.data)"
      @click="mapPointsStore.add($props.data)"
      >Ajouter à l'intinéraire</v-btn
    >
    <v-btn
      block
      size="large"
      color="red"
      prepend-icon="mdi-minus"
      v-else
      @click="mapPointsStore.remove($props.data)"
      >Retirer de l'intinéraire</v-btn
    >
  </div>
  <div v-else>
    <v-btn
      variant="outlined"
      color="green"
      prepend-icon="mdi-plus"
      v-if="!mapPointsStore.includes($props.data)"
      @click="mapPointsStore.add($props.data)"
      >Ajouter</v-btn
    >
    <v-btn
      variant="outlined"
      color="red"
      prepend-icon="mdi-minus"
      v-else
      @click="mapPointsStore.remove($props.data)"
      >Retirer</v-btn
    >
  </div>
</template>
