import type { CardData } from "@/interfaces/main";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Interface for a geographical point on the map.
 */
export interface Point {
  latitude: number | undefined;
  longitude: number | undefined;
  title: string | undefined;
}

/**
 * Store for managing map points data.
 */
export const useMapPointsStore = defineStore("map_points", () => {
  /**
   * Reference to the array of map points.
   */
  const mapPoints = ref<Point[]>([]);

  /**
   * Add a new map point.
   *
   * @param {CardData} data - The card data containing the point details.
   */
  const add = (data: CardData) => {
    mapPoints.value.push({
      title: data.title,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
    });
  };

  /**
   * Check if a map point with the same coordinates exists.
   *
   * @param {CardData} data - The card data containing the point details to check.
   * @returns {boolean} - Returns true if a point with the same coordinates exists, otherwise false.
   */
  const includes = (data: CardData): boolean => {
    return mapPoints.value.some(
      (point) =>
        point.latitude === data.location.latitude && point.longitude === data.location.longitude,
    );
  };

  /**
   * Remove a map point.
   *
   * @param {CardData} data - The card data containing the point details to remove.
   */
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
