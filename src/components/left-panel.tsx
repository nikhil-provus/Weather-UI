import { Unit } from "../config/types";
import type { WeatherData } from "../config/types";

export default function LeftPanel({
  city,
  weather,
  unit,
}: {
  city: string;
  weather: WeatherData;
  unit: Unit;
}) {
  const MET_BASE =
    "https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/";
  const unitSymbol = unit === Unit.Metric ? "C" : "F";

  const getIcon = (vcIcon: string) => {
    if (!vcIcon) return "cloudy";
    const icon = vcIcon.toLowerCase();
    if (icon.includes("thunder")) return "thunderstorm";
    if (icon.includes("snow")) return "snow";
    if (icon.includes("rain")) return "rain";
    if (icon.includes("cloudy"))
      return icon.includes("partly") ? "fair_day" : "cloudy";
    if (icon.includes("clear"))
      return icon.includes("night") ? "clearsky_night" : "clearsky_day";
    if (icon.includes("fog")) return "fog";
    return "cloudy";
  };

  if (!weather) {
    return (
      <div className="bento-info-display">
        <p>Loading weather...</p>
      </div>
    );
  }

  return (
    <div
      className="bento-info-display"
      style={{ height: "100%", position: "relative" }}
    >
      <p className="stat-label">{city}</p>

      {/* 1. Grouping Icon and Temp together */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <h1
          style={{
            fontSize: "4.5rem",
            margin: "0",
            fontWeight: "800",
            display: "inline-flex",
            alignItems: "flex-start",
            lineHeight: "0.9",
          }}
        >
          {Math.round(weather.temp)}
          <span
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "var(--text-secondary)",
              marginTop: "8px",
              marginLeft: "2px",
            }}
          >
            °{unitSymbol}
          </span>
        </h1>

        <img
          src={`${MET_BASE}${getIcon(weather.condition)}.svg`}
          style={{ width: "80px", height: "80px", flexShrink: 0 }}
          alt="weather icon"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `${MET_BASE}cloudy.svg`;
          }}
        />
      </div>

      <p
        style={{
          color: "var(--text-secondary)",
          textTransform: "capitalize",
          fontWeight: "600",
          marginTop: "15px",
        }}
      >
        {weather.condition}
      </p>

      {/* 2. Fix for Grid Length: Use line-clamp to prevent vertical expansion */}
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.85rem",
          lineHeight: "1.4",
          marginTop: "8px",
          display: "-webkit-box",
          WebkitLineClamp: 3, // Limits description to 3 lines
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {weather.description}
      </p>
    </div>
  );
}
