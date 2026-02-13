import type { Unit, WeatherData } from "../config/types";
import { config } from "../config/config";

export async function fetchWeatherData(
  city: string,
  unit: Unit,
): Promise<WeatherData | null> {
  try {
    const url = `${config.api.weatherBaseUrl}/${city}?unitGroup=${unit}&key=${config.api.weatherKey}&contentType=json`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Weather API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const rawData = await res.json();
    return {
      temp: rawData.currentConditions.temp,
      condition: rawData.currentConditions.conditions,
      description: rawData.description,
      humidity: rawData.currentConditions.humidity,
      pressure: rawData.currentConditions.pressure,
      sunrise: rawData.currentConditions.sunrise,
      sunset: rawData.currentConditions.sunset,
      dew: rawData.currentConditions.dew,
      windSpeed: rawData.currentConditions.windspeed,
      cloudcover: rawData.currentConditions.cloudcover,
      visibility: rawData.currentConditions.visibility,
      unit: unit,
      hours: rawData.days[0].hours.map((h: any) => ({
        datetime: h.datetime,
        temp: h.temp,
        condition: h.conditions,
        icon: h.icon,
      })),
    };
  } catch (error) {
    console.error("Weather Fetch Error:", error);
    return null;
  }
}