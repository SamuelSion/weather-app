import { useEffect, useState } from "react";
import type { Locality } from "../../types/locality";
import type { CurrentWeather } from "../../types/weather";
import { fetchLocalities } from "../../services/localities-service";
import { fetchCurrentWeather } from "../../services/weather-service";
import { addSearchHistoryEntry } from "../../utils/history-storage";
import { LocationSearch } from "../../components/location-search/location-search";
import { WeatherIcon } from "../../components/weather-icon/weather-icon";
import styles from "./home-page.module.css";

type TemperatureAccent = "accentCold" | "accentMild" | "accentWarm" | "accentHot";

// Picks a signature accent tier for the result card based on the
// measured temperature: cool blue for cold readings, warm gold/clay for hot ones.
function getTemperatureAccentClass(temperatureCelsius: number): TemperatureAccent {
  if (temperatureCelsius < 12) {
    return "accentCold";
  }

  if (temperatureCelsius < 24) {
    return "accentMild";
  }

  if (temperatureCelsius < 32) {
    return "accentWarm";
  }

  return "accentHot";
}

export function HomePage() {
  const [localities, setLocalities] = useState<Locality[]>([]);
  const [isLoadingLocalities, setIsLoadingLocalities] = useState<boolean>(true);
  const [localitiesError, setLocalitiesError] = useState<string>("");

  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);
  const [weatherError, setWeatherError] = useState<string>("");

  useEffect(() => {
    async function loadLocalities() {
      try {
        const localitiesResult = await fetchLocalities();
        setLocalities(localitiesResult);
      } catch (error) {
        setLocalitiesError("Could not load the list of localities. Try refreshing the page.");
      } finally {
        setIsLoadingLocalities(false);
      }
    }

    loadLocalities();
  }, []);

  // Called by LocationSearch both when a suggestion is picked and when
  // free text is submitted, so there is a single weather-fetching path.
  // matchedLocality is set when the match came from Israel's official
  // locality list — in that case we trust that list's country (Israel)
  // and region name over WeatherAPI's own geocoding, which labels a few
  // Golan Heights communities under a different country and has no
  // concept of the government's region breakdown at all.
  async function handleSearch(query: string, displayName: string, matchedLocality: Locality | null) {
    setCurrentWeather(null);
    setSelectedRegion("");
    setWeatherError("");
    setIsLoadingWeather(true);

    try {
      const weatherResult = await fetchCurrentWeather(query);

      if (matchedLocality) {
        weatherResult.country = "Israel";
        setSelectedRegion(matchedLocality.region_name);
      }

      setCurrentWeather(weatherResult);

      addSearchHistoryEntry({
        searchedAt: new Date().toLocaleString("en-GB"),
        localityName: displayName,
        country: weatherResult.country,
      });
    } catch (error) {
      setWeatherError("Could not load weather data for that location.");
    } finally {
      setIsLoadingWeather(false);
    }
  }

  const temperatureAccentClass = currentWeather
    ? getTemperatureAccentClass(currentWeather.temperatureCelsius)
    : null;

  return (
    <main className="page-container">
      <section className={styles.searchSection}>
        <h2 className={styles.sectionTitle}>Find the weather</h2>

        {localitiesError && <p className={styles.errorText}>{localitiesError}</p>}

        <LocationSearch
          localities={localities}
          isLoadingLocalities={isLoadingLocalities}
          onSearch={handleSearch}
        />
      </section>

      {isLoadingWeather && <p className={styles.statusText}>Loading weather data...</p>}

      {weatherError && <p className={styles.errorText}>{weatherError}</p>}

      {currentWeather && temperatureAccentClass && (
        <section className={`${styles.weatherCard} ${styles[temperatureAccentClass]}`}>
          <div className={styles.weatherHeader}>
            <div>
              <h3 className={styles.weatherCity}>{currentWeather.city}</h3>
              <p className={styles.weatherCountry}>{currentWeather.country}</p>
              {selectedRegion && <p className={styles.weatherRegion}>Region: {selectedRegion}</p>}
            </div>
            <WeatherIcon
              conditionText={currentWeather.conditionText}
              isDay={currentWeather.isDay}
              windSpeedKph={currentWeather.windSpeedKph}
            />
          </div>

          <p className={styles.weatherTemperature}>{currentWeather.temperatureCelsius}°C</p>

          <p className={styles.weatherCondition}>{currentWeather.conditionText}</p>

          <p className={styles.weatherWind}>Wind speed: {currentWeather.windSpeedKph} kph</p>
        </section>
      )}
    </main>
  );
}
