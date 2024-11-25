export const API_CONFIG = {
  BASE_URL: "http://api.openweathermap.org",
  API_KEY: import.meta.env.VITE_API_KEY,
  ENNDPOINTS: {
    weather: "/data/2.5/weather",
    forecast: "/data/2.5/forecast",
    direct_geocoding: "/geo/1.0/direct",
    reverse_geocoding: "/geo/1.0/reverse",
  },
  DEFAULT_PARAMS: {
    appid: import.meta.env.VITE_API_KEY,
  },
};
