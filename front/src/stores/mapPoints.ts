import { CardData } from "@/components/CardDetails.vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface MapPoints {
  from?: Point;
  to?: Point;
}

export interface Point {
  latitude: number | undefined;
  longitude: number | undefined;
  title: string | undefined;
}

export const useMapPointsStore = defineStore("map_points", () => {
  const mapPoints = ref<MapPoints>({
    from: undefined,
    to: undefined,
  });

  const setFrom = (data: CardData | undefined) => {
    if (data === undefined) {
      mapPoints.value.from = undefined;
    } else {
      mapPoints.value.from = {
        title: data.title,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      };
    }
  };

  const setTo = (data: CardData | undefined) => {
    if (data === undefined) {
      mapPoints.value.to = undefined;
    } else {
      mapPoints.value.to = {
        title: data.title,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      };
    }
  };

  return { mapPoints, setFrom, setTo };
});
