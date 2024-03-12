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

import { MainResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Ping<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Ping the server
   *
   * @tags ping
   * @name PingList
   * @summary Ping
   * @request GET:/ping
   */
  pingList = (params: RequestParams = {}) =>
    this.request<MainResponse, string>({
      path: `/ping`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
