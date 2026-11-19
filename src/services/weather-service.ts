import type { CurrentWeather, WeatherApiResponse } from "../types/weather";
import { AppConfig } from "../config";

// Fetches the current weather for a locality, identified by its English name.
export async function fetchCurrentWeather(localityNameEn: string): Promise<CurrentWeather> {
  const url =
    AppConfig.WEATHER_API_BASE_URL +
    "?key=" +
    AppConfig.WEATHER_API_KEY +
    "&q=" +
    encodeURIComponent(localityNameEn);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("שגיאה בטעינת נתוני מזג האוויר");
  }

  const data: WeatherApiResponse = await response.json();

  const currentWeather: CurrentWeather = {
    country: data.location.country,
    city: data.location.name,
    temperatureCelsius: data.current.temp_c,
    conditionText: data.current.condition.text,
    windSpeedKph: data.current.wind_kph,
    isDay: data.current.is_day === 1,
  };

  return currentWeather;
}
