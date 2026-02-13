import { useState, useEffect } from "react";
import "./style.css";

import LeftPanel from "./components/left-panel";
import MapComponent from "./components/map-component";
import HourlyForecast from "./components/hourly-forecast";
import Navbar from "./components/navbar";
import ChatPanel from "./components/climate-assisstant";
import FavoritesPanel from "./components/favorites-panel";
import { GridCell } from "./components/grid-cell";

import { fetchWeatherData } from "./api/weatherService";
import { fetchLocation } from "./api/getLocation";
import {
  getStoredFavorites,
  saveFavoritesToStorage,
  toggleCityInList,
} from "./api/fetchFavorites";
import { formatCityName, convertWeatherUnits } from "./api/weatherHelpers";

import { Unit } from "./config/types";
import type { WeatherData } from "./config/types";

export default function App() {
  const [currentCity, setCurrentCity] = useState<string>("");
  const [homeCity, setHomeCity] = useState<string>("Jaipur");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites());
  const [unit, setUnit] = useState<Unit>(Unit.Metric);
  const [weatherMap, setWeatherMap] = useState<Record<string, WeatherData>>({});

  // 1. Initial location setup
  useEffect(() => {
    fetchLocation().then((city) => {
      const targetCity = city ? formatCityName(city) : "Jaipur";
      setCurrentCity(targetCity);
      setHomeCity(targetCity);
    });
  }, []);

  // 2. Favorites
  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  // 3. Unit Toggle
  const toggleUnit = () => {
    const nextUnit = unit === Unit.Metric ? Unit.Imperial : Unit.Metric;

    setWeatherMap((prev) => {
      const updatedMap: Record<string, WeatherData> = {};
      Object.keys(prev).forEach((city) => {
        updatedMap[city] = convertWeatherUnits(prev[city], nextUnit);
      });
      return updatedMap;
    });

    setUnit(nextUnit);
  };

  const onToggleFavorite = (city: string) => {
    setFavorites((prev) => toggleCityInList(prev, city));
  };

  // 4. Optimized Data Fetching
  useEffect(() => {
    if (!currentCity) return;

    const syncWeather = async () => {
      setIsLoading(true);

      // Only fetch cities not already in the map
      const favoritesToFetch = favorites.filter((city) => !weatherMap[city]);
      const citiesToFetch = Array.from(
        new Set([currentCity, ...favoritesToFetch]),
      );

      if (citiesToFetch.length === 0) {
        setIsLoading(false);
        return;
      }

      const results = await Promise.all(
        citiesToFetch.map((city) => fetchWeatherData(city, unit)),
      );

      const updates: Record<string, WeatherData> = {};
      results.forEach((data, index) => {
        const city = citiesToFetch[index];
        if (data) {
          updates[city] = data;
        } else if (city === currentCity) {
          alert(`City "${currentCity}" not found.`);
          setCurrentCity(homeCity);
        }
      });

      setWeatherMap((prev) => ({ ...prev, ...updates }));
      setIsLoading(false);
    };

    syncWeather();
  }, [currentCity, favorites]);

  const currentWeather = weatherMap[currentCity];
  const tempSymbol = unit === Unit.Metric ? "°C" : "°F";
  const distUnit = unit === Unit.Metric ? "km" : "mi";

  return (
    <div className={`main-wrapper ${isLoading ? "loading-blur" : ""}`}>
      <Navbar
        onSearch={(city) => setCurrentCity(formatCityName(city))}
        onGoHome={() => setCurrentCity(homeCity)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        unit={unit}
        toggleUnit={toggleUnit}
      />

      <main className="bento-dashboard">
        <FavoritesPanel
          favorites={favorites}
          weatherMap={weatherMap}
          currentCity={currentCity}
          onSelectCity={setCurrentCity}
          onToggleFavorite={onToggleFavorite}
          unit={unit}
        />

        <div className="bento-item weather-main">
          {currentWeather && (
            <LeftPanel
              key={`${currentCity}-${unit}`}
              city={currentCity}
              weather={currentWeather}
              unit={unit}
            />
          )}
        </div>

        <ChatPanel city={currentCity} weather={currentWeather} />

        <div className="bento-item map-tile">
          <MapComponent city={currentCity} />
        </div>

        <GridCell
          label="Atmosphere"
          value={currentWeather?.pressure}
          sub="hPa"
        />

        <GridCell
          label="Humidity"
          value={`${Math.round(currentWeather?.humidity || 0)}%`}
          sub={`Dew: ${Math.round(currentWeather?.dew || 0)}${tempSymbol}`}
        />

        <GridCell label="Sun Times">
          <div className="sun-times-grid">
            <div className="sun-row">
              <span className="sun-icon">🌅</span>
              <span className="sun-text">
                {currentWeather?.sunrise?.slice(0, 5)}
              </span>
            </div>
            <div className="sun-row">
              <span className="sun-icon">🌇</span>
              <span className="sun-text">
                {currentWeather?.sunset?.slice(0, 5)}
              </span>
            </div>
          </div>
        </GridCell>

        <GridCell
          label="Cloud Cover"
          value={`${Math.round(currentWeather?.cloudcover || 0)}%`}
          sub={`Visibility: ${currentWeather?.visibility} ${distUnit}`}
        />

        <div className="bento-item hourly-tile">
          {currentWeather && (
            <HourlyForecast hourly={currentWeather.hours} unit={unit} />
          )}
        </div>
      </main>
    </div>
  );
}
