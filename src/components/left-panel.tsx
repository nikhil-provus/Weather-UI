import { Unit } from "../config/types";

export default function LeftPanel({
  city,
  weather,
  unit,
}: {
  city: string;
  weather: any;
  unit: Unit;
}) {
  const MET_BASE = "https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/";

  // Logic to determine the symbol
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
    <div className="bento-info-display">
      <p className="stat-label">{city}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {/* Enhanced inline-flex container to lock the baseline */}
          <h1
            style={{
              fontSize: "4.5rem",
              margin: "5px 0",
              fontWeight: "800",
              display: "inline-flex",
              alignItems: "flex-start",
              lineHeight: "0.9", // Tightened line-height to prevent vertical drift
            }}
          >
            {Math.round(weather.temp)}
            <span
              style={{
                fontSize: "1.8rem",
                fontWeight: "600",
                color: "var(--text-secondary)",
                marginTop: "10px", // Precise offset for the superscript look
                marginLeft: "2px",
              }}
            >
              °{unitSymbol}
            </span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              textTransform: "capitalize",
            }}
          >
            {weather.condition}
          </p>
        </div>
        <img
          src={`${MET_BASE}${getIcon(weather.iconCode || weather.condition)}.svg`}
          style={{ width: "100px", height: "100px" }}
          alt="weather icon"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `${MET_BASE}cloudy.svg`;
          }}
        />
      </div>
    </div>
  );
}