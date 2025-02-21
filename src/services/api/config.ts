export const API_CONFIG = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  OWN_API_URL: "http://ec2-18-232-83-24.compute-1.amazonaws.com/api",
  GEO: "https://api.openweathermap.org/geo/1.0",
  API_KEY: import.meta.env.VITE_API_KEY,
  DEFAULT_PARAMS: {
    appid: import.meta.env.VITE_API_KEY,
  },
};
