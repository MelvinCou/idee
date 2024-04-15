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

import { GraphqlError, GraphqlGetEatsResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Eat<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get available eat (restaurants, bistros) in a city
   *
   * @tags graphql
   * @name GetEat
   * @summary Eat
   * @request GET:/eat
   */
  getEat = (
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
    this.request<GraphqlGetEatsResponse, GraphqlError>({
      path: `/eat`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
