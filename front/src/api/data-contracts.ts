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

export interface GraphqlError {
  /** @example "string" */
  error?: string;
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSet {
  results?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterest[];
  total?: number;
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterest {
  /** L&#039;agent à contacter pour affaires générales relatives à ce POI. */
  hasContact?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent[];
  /**
   * Description textuelle courte ou longue du POI pouvant être associée à une
   * audience. Par exemple, un POI peut avoir une description dédiée aux écoles et
   * une autre dédiée au grand public. Si une description n&#039;a aucune audience
   * renseignée, on suppose qu&#039;elle est dédiée à tous les publics.
   */
  hasDescription?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestHasDescription[];
  /** La localisation du POI, et donc le lieu où il peut être potentiellement consommé. Lieu de départ d&#039;un itinéraire. */
  isLocatedAt?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace[];
  lastUpdateDatatourisme?: string[];
  /** Description de la ressource. */
  rdfs_comment?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString[];
  /** Etiquette courte décrivant la ressource. */
  rdfs_label?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString[];
  /** Vrai si le produit propose un accès aux personnes à mobilité réduite */
  reducedMobilityAccess?: boolean[];
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent {
  /** L&#039;adresse du site internet d&#039;un Agent. */
  foaf_homepage?: string[];
  /** Un courriel, courrier électronique. */
  schema_email?: string[];
  /** Un numéro de téléphone. */
  schema_telephone?: string[];
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestHasDescription {
  /** Description longue de la ressource. */
  dc_description?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString[];
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace {
  /** L&#039;adresse postale du lieu concerné */
  schema_address?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress[];
  /** Les coordonnées géographiques de la ressource */
  schema_geo?: GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape[];
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress {
  /** La ville en format texte. */
  schema_addressLocality?: string[];
  /** Le code postal d&#039;une adresse. */
  schema_postalCode?: string[];
  /** Le nom de rue incluant le numéro d&#039;une adresse. */
  schema_streetAddress?: string[];
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape {
  /** Valeur de la latitude de la ressource. */
  schema_latitude?: number[];
  /** Valeur de la longitude de la ressource. */
  schema_longitude?: number[];
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetDrinksPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetDrinksResponse {
  poi?: GraphqlGetDrinksPoiPointOfInterestResultSet;
}

export interface GraphqlGetEatsPoiPointOfInterestResultSet {
  results?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterest[];
  total?: number;
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterest {
  /** L&#039;agent à contacter pour affaires générales relatives à ce POI. */
  hasContact?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent[];
  /**
   * Description textuelle courte ou longue du POI pouvant être associée à une
   * audience. Par exemple, un POI peut avoir une description dédiée aux écoles et
   * une autre dédiée au grand public. Si une description n&#039;a aucune audience
   * renseignée, on suppose qu&#039;elle est dédiée à tous les publics.
   */
  hasDescription?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestHasDescription[];
  /** La localisation du POI, et donc le lieu où il peut être potentiellement consommé. Lieu de départ d&#039;un itinéraire. */
  isLocatedAt?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace[];
  lastUpdateDatatourisme?: string[];
  /** Description de la ressource. */
  rdfs_comment?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString[];
  /** Etiquette courte décrivant la ressource. */
  rdfs_label?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString[];
  /** Vrai si le produit propose un accès aux personnes à mobilité réduite */
  reducedMobilityAccess?: boolean[];
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent {
  /** L&#039;adresse du site internet d&#039;un Agent. */
  foaf_homepage?: string[];
  /** Un courriel, courrier électronique. */
  schema_email?: string[];
  /** Un numéro de téléphone. */
  schema_telephone?: string[];
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestHasDescription {
  /** Description longue de la ressource. */
  dc_description?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString[];
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace {
  /** L&#039;adresse postale du lieu concerné */
  schema_address?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress[];
  /** Les coordonnées géographiques de la ressource */
  schema_geo?: GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape[];
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress {
  /** La ville en format texte. */
  schema_addressLocality?: string[];
  /** Le code postal d&#039;une adresse. */
  schema_postalCode?: string[];
  /** Le nom de rue incluant le numéro d&#039;une adresse. */
  schema_streetAddress?: string[];
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape {
  /** Valeur de la latitude de la ressource. */
  schema_latitude?: number[];
  /** Valeur de la longitude de la ressource. */
  schema_longitude?: number[];
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetEatsPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetEatsResponse {
  poi?: GraphqlGetEatsPoiPointOfInterestResultSet;
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSet {
  results?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterest[];
  total?: number;
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterest {
  /** L&#039;agent à contacter pour affaires générales relatives à ce POI. */
  hasContact?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent[];
  /**
   * Description textuelle courte ou longue du POI pouvant être associée à une
   * audience. Par exemple, un POI peut avoir une description dédiée aux écoles et
   * une autre dédiée au grand public. Si une description n&#039;a aucune audience
   * renseignée, on suppose qu&#039;elle est dédiée à tous les publics.
   */
  hasDescription?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestHasDescription[];
  /** La localisation du POI, et donc le lieu où il peut être potentiellement consommé. Lieu de départ d&#039;un itinéraire. */
  isLocatedAt?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace[];
  lastUpdateDatatourisme?: string[];
  /** Description de la ressource. */
  rdfs_comment?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString[];
  /** Etiquette courte décrivant la ressource. */
  rdfs_label?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString[];
  /** Vrai si le produit propose un accès aux personnes à mobilité réduite */
  reducedMobilityAccess?: boolean[];
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent {
  /** L&#039;adresse du site internet d&#039;un Agent. */
  foaf_homepage?: string[];
  /** Un courriel, courrier électronique. */
  schema_email?: string[];
  /** Un numéro de téléphone. */
  schema_telephone?: string[];
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestHasDescription {
  /** Description longue de la ressource. */
  dc_description?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString[];
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace {
  /** L&#039;adresse postale du lieu concerné */
  schema_address?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress[];
  /** Les coordonnées géographiques de la ressource */
  schema_geo?: GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape[];
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress {
  /** La ville en format texte. */
  schema_addressLocality?: string[];
  /** Le code postal d&#039;une adresse. */
  schema_postalCode?: string[];
  /** Le nom de rue incluant le numéro d&#039;une adresse. */
  schema_streetAddress?: string[];
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape {
  /** Valeur de la latitude de la ressource. */
  schema_latitude?: number[];
  /** Valeur de la longitude de la ressource. */
  schema_longitude?: number[];
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetEnjoysPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetEnjoysResponse {
  poi?: GraphqlGetEnjoysPoiPointOfInterestResultSet;
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSet {
  results?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterest[];
  total?: number;
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterest {
  /** L&#039;agent à contacter pour affaires générales relatives à ce POI. */
  hasContact?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent[];
  /**
   * Description textuelle courte ou longue du POI pouvant être associée à une
   * audience. Par exemple, un POI peut avoir une description dédiée aux écoles et
   * une autre dédiée au grand public. Si une description n&#039;a aucune audience
   * renseignée, on suppose qu&#039;elle est dédiée à tous les publics.
   */
  hasDescription?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestHasDescription[];
  /** La localisation du POI, et donc le lieu où il peut être potentiellement consommé. Lieu de départ d&#039;un itinéraire. */
  isLocatedAt?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace[];
  lastUpdateDatatourisme?: string[];
  /** Description de la ressource. */
  rdfs_comment?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString[];
  /** Etiquette courte décrivant la ressource. */
  rdfs_label?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString[];
  /** Vrai si le produit propose un accès aux personnes à mobilité réduite */
  reducedMobilityAccess?: boolean[];
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent {
  /** L&#039;adresse du site internet d&#039;un Agent. */
  foaf_homepage?: string[];
  /** Un courriel, courrier électronique. */
  schema_email?: string[];
  /** Un numéro de téléphone. */
  schema_telephone?: string[];
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestHasDescription {
  /** Description longue de la ressource. */
  dc_description?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString[];
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace {
  /** L&#039;adresse postale du lieu concerné */
  schema_address?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress[];
  /** Les coordonnées géographiques de la ressource */
  schema_geo?: GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape[];
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress {
  /** La ville en format texte. */
  schema_addressLocality?: string[];
  /** Le code postal d&#039;une adresse. */
  schema_postalCode?: string[];
  /** Le nom de rue incluant le numéro d&#039;une adresse. */
  schema_streetAddress?: string[];
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape {
  /** Valeur de la latitude de la ressource. */
  schema_latitude?: number[];
  /** Valeur de la longitude de la ressource. */
  schema_longitude?: number[];
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetSleepsPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetSleepsResponse {
  poi?: GraphqlGetSleepsPoiPointOfInterestResultSet;
}

export interface GraphqlGetTotalPoiPointOfInterestResultSet {
  total?: number;
}

export interface GraphqlGetTotalResponse {
  poi?: GraphqlGetTotalPoiPointOfInterestResultSet;
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSet {
  results?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterest[];
  total?: number;
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterest {
  /** L&#039;agent à contacter pour affaires générales relatives à ce POI. */
  hasContact?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent[];
  /**
   * Description textuelle courte ou longue du POI pouvant être associée à une
   * audience. Par exemple, un POI peut avoir une description dédiée aux écoles et
   * une autre dédiée au grand public. Si une description n&#039;a aucune audience
   * renseignée, on suppose qu&#039;elle est dédiée à tous les publics.
   */
  hasDescription?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestHasDescription[];
  /** La localisation du POI, et donc le lieu où il peut être potentiellement consommé. Lieu de départ d&#039;un itinéraire. */
  isLocatedAt?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace[];
  lastUpdateDatatourisme?: string[];
  /** Description de la ressource. */
  rdfs_comment?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString[];
  /** Etiquette courte décrivant la ressource. */
  rdfs_label?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString[];
  /** Vrai si le produit propose un accès aux personnes à mobilité réduite */
  reducedMobilityAccess?: boolean[];
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestHasContactAgent {
  /** L&#039;adresse du site internet d&#039;un Agent. */
  foaf_homepage?: string[];
  /** Un courriel, courrier électronique. */
  schema_email?: string[];
  /** Un numéro de téléphone. */
  schema_telephone?: string[];
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestHasDescription {
  /** Description longue de la ressource. */
  dc_description?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString[];
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestHasDescriptionDcDescriptionLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlace {
  /** L&#039;adresse postale du lieu concerné */
  schema_address?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress[];
  /** Les coordonnées géographiques de la ressource */
  schema_geo?: GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape[];
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaAddressSchemaPostalAddress {
  /** La ville en format texte. */
  schema_addressLocality?: string[];
  /** Le code postal d&#039;une adresse. */
  schema_postalCode?: string[];
  /** Le nom de rue incluant le numéro d&#039;une adresse. */
  schema_streetAddress?: string[];
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestIsLocatedAtPlaceSchemaGeoSchemaGeoCoordinatesSchemaGeoShape {
  /** Valeur de la latitude de la ressource. */
  schema_latitude?: number[];
  /** Valeur de la longitude de la ressource. */
  schema_longitude?: number[];
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestRdfsCommentLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetTravelsPoiPointOfInterestResultSetResultsPointOfInterestRdfsLabelLangString {
  /** Literal value */
  value?: string;
}

export interface GraphqlGetTravelsResponse {
  poi?: GraphqlGetTravelsPoiPointOfInterestResultSet;
}
