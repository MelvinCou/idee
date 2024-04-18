import { CardData } from "@/components/CardDetails.vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface Point {
  latitude: number | undefined;
  longitude: number | undefined;
  title: string | undefined;
}

export const useMapPointsStore = defineStore("map_points", () => {
  const mapPoints = ref<Point[]>([]);

  const add = (data: CardData) => {
    mapPoints.value.push({
      title: data.title,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
    });
  };

  const includes = (data: CardData): boolean => {
    return mapPoints.value.some(
      (point) =>
        point.latitude === data.location.latitude && point.longitude === data.location.longitude,
    );
  };

  const remove = (data: CardData) => {
    // Find the index of the point to remove
    const index = mapPoints.value.findIndex(
      (point) =>
        point.latitude === data.location.latitude && point.longitude === data.location.longitude,
    );
    // Remove the point
    mapPoints.value.splice(index, 1);
  };

  return { mapPoints, add, includes, remove };
});
