// Shape of the relevant parts of the response returned by
// https://api.weatherapi.com/v1/current.json
export interface WeatherApiResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    wind_kph: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

// The simplified data our components actually render.
export interface CurrentWeather {
  country: string;
  city: string;
  temperatureCelsius: number;
  conditionText: string;
  windSpeedKph: number;
  isDay: boolean;
}

// A single row in the search history table.
export interface SearchHistoryEntry {
  searchedAt: string;
  localityName: string;
  country: string;
}
