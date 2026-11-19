import type { Locality, LocalitiesApiResponse } from "../types/locality";
import { AppConfig } from "../config";

const LOCALITIES_API_URL =
  AppConfig.LOCALITIES_API_BASE_URL +
  "?resource_id=" +
  AppConfig.LOCALITIES_RESOURCE_ID +
  "&limit=" +
  AppConfig.LOCALITIES_FETCH_LIMIT;

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
