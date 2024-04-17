import { defineStore } from "pinia";
import { ref } from "vue";

export interface MapPoints {
  from?: Point;
  to?: Point;
}

export interface Point {
  longitude: number;
  latitude: number;
  name: String;
}

export const useMapPointsStore = defineStore("user", () => {
  const mapPoints = ref<MapPoints>({
    from: undefined,
    to: undefined,
  });

  const setFrom = (point: Point) => {
    mapPoints.value.from = point;
  };

  const setTo = (point: Point) => {
    mapPoints.value.to = point;
  };

  return { mapPoints, setFrom, setTo };
});
