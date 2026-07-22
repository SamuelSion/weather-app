import type { Locality, LocalitiesApiResponse } from "../types/locality";

// The government open-data resource that holds all Israeli localities.
const LOCALITIES_RESOURCE_ID = "8f714b6f-c35c-4b40-a0e7-547b675eee0e";

const LOCALITIES_API_URL =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=" +
  LOCALITIES_RESOURCE_ID +
  "&limit=1500";

// Fetches every Israeli locality (Hebrew + English name pairs).
export async function fetchLocalities(): Promise<Locality[]> {
  const response = await fetch(LOCALITIES_API_URL);

  if (!response.ok) {
    throw new Error("שגיאה בטעינת רשימת היישובים מהשרת");
  }

  const data: LocalitiesApiResponse = await response.json();

  if (!data.success) {
    throw new Error("השרת החזיר תשובה לא תקינה עבור רשימת היישובים");
  }

  // The source data has trailing whitespace on names, and some records
  // have an empty English name — both are trimmed out / filtered here.
  const localities = data.result.records
    .map((record) => ({
      city_code: record.city_code,
      city_name_he: record.city_name_he.trim(),
      city_name_en: record.city_name_en.trim(),
      region_name: record.region_name.trim(),
    }))
    .filter((record) => record.city_name_he.length > 0 && record.city_name_en.length > 0)
    .sort((first, second) => first.city_name_he.localeCompare(second.city_name_he, "he"));

  return localities;
}
