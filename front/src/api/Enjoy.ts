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

import { GraphqlError, GraphqlGetEnjoysResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Enjoy<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get events|activities from our DATATourisme API
   *
   * @tags graphql
   * @name EnjoyList
   * @summary Enjoy
   * @request GET:/enjoy
   */
  enjoyList = (
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
    this.request<GraphqlGetEnjoysResponse, GraphqlError>({
      path: `/enjoy`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
