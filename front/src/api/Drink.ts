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

import { GraphqlError, GraphqlGetDrinksResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Drink<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get available drinks (bars, bistros) in a city
   *
   * @tags graphql
   * @name DrinkList
   * @summary Drink
   * @request GET:/drink
   */
  drinkList = (
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
    this.request<GraphqlGetDrinksResponse, GraphqlError>({
      path: `/drink`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
