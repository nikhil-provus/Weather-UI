interface Config {
  api: {
    weatherKey: string;
    astroKey: string;
    geminiKey: string;
    weatherBaseUrl: string;
    astroBaseUrl: string;
    geminiBaseUrl: string;
  };
  defaults: {
    city: string;
    unitGroup: string;
  };
  theme: {
    iconBaseUrl: string;
  };
}

export const config: Config = {
  api: {
    weatherKey: import.meta.env.VITE_WEATHER_API_KEY,
    astroKey: import.meta.env.VITE_ASTRO_API_KEY,
    geminiKey: import.meta.env.VITE_GEMINI_API_KEY,
    weatherBaseUrl:
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
    astroBaseUrl: "https://api.ipgeolocation.io/astronomy",
    geminiBaseUrl:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  },
  defaults: {
    city: "Jaipur",
    unitGroup: "metric",
  },
  theme: {
    iconBaseUrl:
      "https://raw.githubusercontent.com/metno/weathericons/main/weather/svg/",
  },
};
