import {
  GraphqlGetDrinksResponse,
  GraphqlGetEatsResponse,
  GraphqlGetEnjoysResponse,
  GraphqlGetSleepsResponse,
  GraphqlGetTravelsResponse,
} from "@/api/data-contracts";

export type Test =
  | GraphqlGetDrinksResponse
  | GraphqlGetEnjoysResponse
  | GraphqlGetEatsResponse
  | GraphqlGetTravelsResponse
  | GraphqlGetSleepsResponse;
