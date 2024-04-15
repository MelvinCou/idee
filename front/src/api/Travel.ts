/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { GraphqlError, GraphqlGetTravelsResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Travel<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get available travel (bus station, train station, ...) in a city
   *
   * @tags graphql
   * @name TravelList
   * @summary Travel
   * @request GET:/travel
   */
  travelList = (
    query: {
      /** @example "Paris" */
      city: string;
      /**
       * @min 1
       * @example 1
       */
      page: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GraphqlGetTravelsResponse, GraphqlError>({
      path: `/travel`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
