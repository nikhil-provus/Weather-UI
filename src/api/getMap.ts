import maplibregl from "maplibre-gl";

export const initMap = (container: HTMLDivElement) => {
  const map = new maplibregl.Map({
    container,
    style: `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${import.meta.env.VITE_STADIA_API_KEY}`,
    center: [0, 0],
    zoom: 2,
    attributionControl: false,
  });

  const observer = new ResizeObserver(() => {
    map.resize();
  });

  observer.observe(container);

  return { map, observer };
};

export const flyToCity = async (map: maplibregl.Map, city: string) => {
  if (!city) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_FLY_TO_CITY_URL}${city}`,
    );
    const data = await res.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      map.flyTo({
        center: [parseFloat(lon), parseFloat(lat)],
        zoom: 11,
        pitch: 45,
        speed: 1.2,
      });
    }
  } catch (err) {
    console.error("Geocoding error:", err);
  }
};
