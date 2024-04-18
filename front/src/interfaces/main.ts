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
