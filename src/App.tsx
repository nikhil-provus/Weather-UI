import { useState, useEffect } from "react";
import "./style.css";
import LeftPanel from "./components/left-panel";
import MapComponent from "./components/map-component";
import HourlyForecast from "./components/hourly-forecast";
import Navbar from "./components/navbar";
import ChatPanel from "./components/climate-assisstant";
import { GridCell } from "./components/grid-cell";
import { fetchWeatherData } from "./api/weatherService";
import { fetchLocation } from "./api/getLocation";
import { Unit } from "./config/types";
import type { WeatherData } from "./config/types";

export default function App() {
  const [currentCity, setCurrentCity] = useState<string>("");
  const [homeCity, setHomeCity] = useState<string>("Jaipur");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [unit, setUnit] = useState<Unit>(Unit.Metric);
  const [weatherMap, setWeatherMap] = useState<Record<string, WeatherData>>({});

  const formatCityName = (str: string) => {
    if (!str) return "";
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const toggleUnit = () => {
    setUnit(prev => prev === Unit.Metric ? Unit.Imperial : Unit.Metric);
  };

  useEffect(() => {
    fetchLocation().then(city => { 
      const targetCity = city ? formatCityName(city) : "Jaipur";
      setCurrentCity(targetCity); 
      setHomeCity(targetCity); 
    });
  }, []);

  useEffect(() => {
    if (!currentCity) return;

    const updateWeather = async () => {
      setIsLoading(true);
      const data = await fetchWeatherData(currentCity, unit);
      
      if (data) {
        // Force a fresh object reference to trigger re-render
        setWeatherMap(prev => ({
          ...prev,
          [currentCity]: data
        }));
      } else {
        alert(`Error: "${currentCity}" unknown. Reverting...`);
        setCurrentCity(homeCity);
      }
      setIsLoading(false);
    };
    
    updateWeather();
  }, [currentCity, unit]); // This ensures switcher triggers a re-fetch

  const currentWeather = weatherMap[currentCity];

  // Helper for dynamic unit symbols
  const tempSymbol = unit === Unit.Metric ? "°C" : "°F";
  const distUnit = unit === Unit.Metric ? "km" : "mi";

  return (
    <div className={`main-wrapper ${isLoading ? 'loading-blur' : ''}`}>
      <Navbar 
        onSearch={(city) => setCurrentCity(formatCityName(city))} 
        onGoHome={() => setCurrentCity(homeCity)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        unit={unit}
        toggleUnit={toggleUnit}
      />

      <main className="bento-dashboard">
        <div className="bento-item weather-main">
          {currentWeather && (
            <LeftPanel 
              key={`${currentCity}-${unit}`} // Key change forces component refresh
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

        <GridCell label="Atmosphere" value={currentWeather?.pressure} sub="hPa" />
        
        <GridCell 
          label="Humidity" 
          value={`${Math.round(currentWeather?.humidity || 0)}%`} 
          sub={`Dew: ${Math.round(currentWeather?.dew || 0)}${tempSymbol}`} 
        />

        <GridCell label="Sun Times">
          <div className="sun-times-grid">
            <div className="sun-row">
              <span className="sun-icon">🌅</span>
              <span className="sun-text">{currentWeather?.sunrise?.slice(0, 5)}</span>
            </div>
            <div className="sun-row">
              <span className="sun-icon">🌇</span>
              <span className="sun-text">{currentWeather?.sunset?.slice(0, 5)}</span>
            </div>
          </div>
        </GridCell>

        <GridCell 
          label="Cloud Cover" 
          value={`${Math.round(currentWeather?.cloudcover || 0)}%`} 
          sub={`Visibility: ${currentWeather?.visibility} ${distUnit}`} 
        />

        <div className="bento-item hourly-tile">
          {currentWeather && <HourlyForecast hourly={currentWeather.hours} unit={unit} />}
        </div>
      </main>
    </div>
  );
}