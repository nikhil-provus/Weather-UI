import { Unit } from "../config/types";
import type { WeatherData } from "../config/types";

export const formatCityName = (str: string): string => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const convertWeatherUnits = (
  data: WeatherData,
  toUnit: Unit,
): WeatherData => {
  const isToMetric = toUnit === Unit.Metric;

  const convertTemp = (t: number) =>
    isToMetric ? (t - 32) * (5 / 9) : (t * 9) / 5 + 32;

  const convertDist = (d: number) =>
    isToMetric ? Math.round(d * 1.60934 * 100) : Math.round(d / 1.60934);

  return {
    ...data,
    temp: convertTemp(data.temp),
    dew: convertTemp(data.dew),
    windSpeed: convertDist(data.windSpeed),
    visibility: convertDist(data.visibility),
    hours: data.hours.map((h) => ({
      ...h,
      temp: convertTemp(h.temp),
    })),
  };
};
