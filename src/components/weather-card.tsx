import type { WeatherData } from "../config/types";

export default function WeatherCard({
  city,
  weather,
}: {
  city: string;
  weather: WeatherData;
}) {
  return (
    <div className="weather-card">
      <div className="card-header">
        <h2>{city}</h2>
        <p className="condition">{weather.condition}</p>
      </div>

      <div className="temp-display">
        <h1>{Math.round(weather.temp)}°</h1>
      </div>

      <div className="weather-description">
        <p>{weather.description}</p>
      </div>

      <div className="weather-details"></div>
    </div>
  );
}
