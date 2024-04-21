import type {
  GraphqlGetDrinksResponse,
  GraphqlGetEatsResponse,
  GraphqlGetEnjoysResponse,
  GraphqlGetSleepsResponse,
  GraphqlGetTravelsResponse,
} from "@/api/data-contracts";

export type GraphQlDataResponse =
  | GraphqlGetDrinksResponse
  | GraphqlGetEnjoysResponse
  | GraphqlGetEatsResponse
  | GraphqlGetTravelsResponse
  | GraphqlGetSleepsResponse;

export interface TabsInterface {
  name: string;
  action: () => void;
  icon: string;
}

export interface MainLayoutActiveTabs {
  data: GraphQlDataResponse;
  actualTab: string;
  paginationMax: number;
}

export interface MapBoxSuggestion {
  mapbox_id: string;
  name: string;
  place_formatted: string;
}

export interface CardData {
  title?: string;
  comment?: string;
  description?: string;
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
}

export interface DirectionResponse {
  waypoints: Waypoint[];
  routes: Route[];
  code: string;
}

export interface Route {
  legs: Leg[];
  weight_name: string;
  geometry: Geometry;
  weight: number;
  distance: number;
  duration: number;
}

export interface Geometry {
  coordinates: Array<number[]>;
  type: string;
}

export interface Leg {
  steps: any[];
  weight: number;
  distance: number;
  summary: string;
  duration: number;
}

export interface Waypoint {
  location: number[];
  name: string;
}

export interface MapState {
  map: mapboxgl.Map | null;
}
