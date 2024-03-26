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

import { GraphqlError, GraphqlGetTotalResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Total<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Get total number of objets in database
   *
   * @tags graphql
   * @name TotalList
   * @summary Total
   * @request GET:/total
   */
  totalList = (params: RequestParams = {}) =>
    this.request<GraphqlGetTotalResponse, GraphqlError>({
      path: `/total`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
