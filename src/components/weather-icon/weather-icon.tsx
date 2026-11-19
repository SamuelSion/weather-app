import styles from "./weather-icon.module.css";

type ConditionKind =
  | "sunny"
  | "clearNight"
  | "partlyCloudyDay"
  | "partlyCloudyNight"
  | "cloudy"
  | "rain"
  | "thunder"
  | "snow"
  | "fog";

type WindTier = "calm" | "breeze" | "windy" | "gale";

interface WeatherIconProps {
  conditionText: string;
  isDay: boolean;
  windSpeedKph: number;
}

// Classifies the free-text condition string returned by the API into one
// of a small set of icon kinds, using keyword matching.
function getConditionKind(conditionText: string, isDay: boolean): ConditionKind {
  const text = conditionText.toLowerCase();

  if (text.includes("thunder")) {
    return "thunder";
  }

  if (text.includes("snow") || text.includes("sleet") || text.includes("ice") || text.includes("blizzard")) {
    return "snow";
  }

  if (text.includes("rain") || text.includes("drizzle") || text.includes("shower")) {
    return "rain";
  }

  if (text.includes("fog") || text.includes("mist")) {
    return "fog";
  }

  if (text.includes("overcast") || (text.includes("cloudy") && !text.includes("partly"))) {
    return "cloudy";
  }

  if (text.includes("partly") || text.includes("partial")) {
    return isDay ? "partlyCloudyDay" : "partlyCloudyNight";
  }

  return isDay ? "sunny" : "clearNight";
}

// Buckets the real wind speed reading into an animation-speed tier,
// so faster wind visibly animates faster on screen.
function getWindTier(windSpeedKph: number): WindTier {
  if (windSpeedKph < 10) {
    return "calm";
  }

  if (windSpeedKph < 25) {
    return "breeze";
  }

  if (windSpeedKph < 45) {
    return "windy";
  }

  return "gale";
}

const windTierClassMap: Record<WindTier, string> = {
  calm: "windCalm",
  breeze: "windBreeze",
  windy: "windWindy",
  gale: "windGale",
};

export function WeatherIcon({ conditionText, isDay, windSpeedKph }: WeatherIconProps) {
  const conditionKind = getConditionKind(conditionText, isDay);
  const windTier = getWindTier(windSpeedKph);
  const windTierClass = styles[windTierClassMap[windTier]];

  return (
    <div className={styles.iconWrapper}>
      <svg className={styles.icon} viewBox="0 0 100 100" role="img" aria-label={conditionText}>
        {(conditionKind === "sunny" || conditionKind === "partlyCloudyDay") && (
          <g className={styles.sunGroup}>
            <circle className={styles.sunCore} cx="42" cy="38" r="16" />
            <g className={styles.sunRays}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  className={styles.sunRay}
                  x1="42"
                  y1="10"
                  x2="42"
                  y2="18"
                  transform={`rotate(${angle} 42 38)`}
                />
              ))}
            </g>
          </g>
        )}

        {(conditionKind === "clearNight" || conditionKind === "partlyCloudyNight") && (
          <path
            className={styles.moon}
            d="M50 20 a18 18 0 1 0 0 36 a14 14 0 1 1 0 -36 z"
          />
        )}

        {(conditionKind === "cloudy" ||
          conditionKind === "rain" ||
          conditionKind === "thunder" ||
          conditionKind === "snow" ||
          conditionKind === "partlyCloudyDay" ||
          conditionKind === "partlyCloudyNight") && (
          <g className={styles.cloudGroup}>
            <ellipse className={styles.cloudPart} cx="40" cy="60" rx="16" ry="13" />
            <ellipse className={styles.cloudPart} cx="58" cy="55" rx="20" ry="16" />
            <ellipse className={styles.cloudPart} cx="74" cy="63" rx="14" ry="11" />
            <rect className={styles.cloudBase} x="28" y="60" width="54" height="16" rx="8" />
          </g>
        )}

        {conditionKind === "fog" && (
          <g className={styles.fogGroup}>
            <line className={styles.fogLine} x1="18" y1="42" x2="82" y2="42" />
            <line className={styles.fogLine} x1="24" y1="56" x2="88" y2="56" />
            <line className={styles.fogLine} x1="16" y1="70" x2="80" y2="70" />
          </g>
        )}

        {conditionKind === "rain" && (
          <g className={styles.rainGroup}>
            <line className={styles.raindrop} x1="38" y1="80" x2="34" y2="92" />
            <line className={`${styles.raindrop} ${styles.raindropDelay1}`} x1="52" y1="80" x2="48" y2="92" />
            <line className={`${styles.raindrop} ${styles.raindropDelay2}`} x1="66" y1="80" x2="62" y2="92" />
          </g>
        )}

        {conditionKind === "snow" && (
          <g className={styles.snowGroup}>
            <circle className={styles.snowflake} cx="38" cy="84" r="2.6" />
            <circle className={`${styles.snowflake} ${styles.snowflakeDelay1}`} cx="52" cy="88" r="2.6" />
            <circle className={`${styles.snowflake} ${styles.snowflakeDelay2}`} cx="66" cy="84" r="2.6" />
          </g>
        )}

        {conditionKind === "thunder" && (
          <path className={styles.thunderbolt} d="M58 76 L48 90 L54 90 L44 98 L60 84 L52 84 Z" />
        )}

        <g className={`${styles.windGroup} ${windTierClass}`}>
          <path className={styles.windLine} d="M70 16 h20" />
          <path className={styles.windLine} d="M74 24 h26" />
          <path className={styles.windLine} d="M78 32 h16" />
        </g>
      </svg>
    </div>
  );
}
