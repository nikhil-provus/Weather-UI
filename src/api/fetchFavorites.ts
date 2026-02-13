export const getStoredFavorites = (): string[] => {
  try {
    const saved = localStorage.getItem("weather-favs");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

export const saveFavoritesToStorage = (favorites: string[]): void => {
  localStorage.setItem("weather-favs", JSON.stringify(favorites));
};

export const toggleCityInList = (list: string[], city: string): string[] => {
  if (!city) return list;
  return list.includes(city) ? list.filter((c) => c !== city) : [...list, city];
};
