// Central place for every external URL and the API key used by the app.
// The key lives in the .env file (VITE_WEATHER_API_KEY). See the
// "About the API key" section in README.md for why it is committed.
export class AppConfig {
  // Free demo WeatherAPI key, read from the .env file by Vite
  public static readonly WEATHER_API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY;

  public static readonly WEATHER_API_BASE_URL: string = "https://api.weatherapi.com/v1/current.json";

  public static readonly LOCALITIES_API_BASE_URL: string = "https://data.gov.il/api/3/action/datastore_search";

  public static readonly LOCALITIES_RESOURCE_ID: string = "8f714b6f-c35c-4b40-a0e7-547b675eee0e";

  public static readonly LOCALITIES_FETCH_LIMIT: number = 1500;
}
