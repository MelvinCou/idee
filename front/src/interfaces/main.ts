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
