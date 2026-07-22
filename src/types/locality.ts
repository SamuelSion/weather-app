// Represents a single settlement (locality) record as returned
// from the data.gov.il localities API resource.
export interface Locality {
  city_code: number;
  city_name_he: string;
  city_name_en: string;
  region_name: string;
}

// Shape of the raw response returned by the data.gov.il datastore_search endpoint.
export interface LocalitiesApiResponse {
  success: boolean;
  result: {
    records: Locality[];
  };
}
