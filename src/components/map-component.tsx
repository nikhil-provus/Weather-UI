import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { initMap, flyToCity } from "../api/getMap";
import maplibregl from "maplibre-gl";

export default function MapComponent({ city }: { city: string }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const { map: mapInstance, observer } = initMap(mapContainer.current);
    map.current = mapInstance;

    return () => {
      observer.disconnect();
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (map.current && city) {
      flyToCity(map.current, city);
    }
  }, [city]);

  return (
    <div
      ref={mapContainer}
      className="map-panel"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
