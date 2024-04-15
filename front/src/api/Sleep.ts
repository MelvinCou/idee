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

import { GraphqlError, GraphqlGetSleepsResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Sleep<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get sleep places from our DATATourisme API
   *
   * @tags graphql
   * @name SleepList
   * @summary Sleep
   * @request GET:/sleep
   */
  sleepList = (
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
    this.request<GraphqlGetSleepsResponse, GraphqlError>({
      path: `/sleep`,
      method: "GET",
      query: query,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
