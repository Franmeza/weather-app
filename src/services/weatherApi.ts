import { API_BASE_URL } from "@/utils/consts";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `${API_BASE_URL}/data/2.5`;

type GeoCodingResponse = {
  lat: number;
  lon: number;
};

type CurrentWeatherResponse = {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  name: string;
  wind: {
    speed: number;
  };
};

async function getDirectGeocoding(
  location: string
): Promise<GeoCodingResponse> {
  const res = await fetch(
    `${API_BASE_URL}/geo/1.0/direct?q=${location}&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
}

async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeatherResponse> {
  const res = await fetch(
    `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch current weather");
  const data = await res.json();
  return {
    main: data.main,
    weather: data.weather,
    wind: data.wind,
    name: data.name,
  };
}

async function getForecast(lat: string, lon: string) {
  const res = await fetch(
    `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch forecast");
  const data = res.json();
  return data;
}

export { getDirectGeocoding, getCurrentWeather, getForecast };
