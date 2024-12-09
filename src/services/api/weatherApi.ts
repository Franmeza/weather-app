import { API_CONFIG } from "./config";

import {
  Coordinates,
  CurrentWeatherResponse,
  ForecastResponse,
  GeocodingResponse,
} from "./types";

function createUrl(endpoint: string, params: Record<string, string | number>) {
  const searchParams = new URLSearchParams({
    ...params,
    appid: API_CONFIG.API_KEY,
  });
  return `${endpoint}?${searchParams.toString()}`;
}

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

async function getReverseGeocode({ lat, lon }: Coordinates) {
  const url = createUrl(`${API_CONFIG.GEO}/reverse`, {
    lat: lat.toString(),
    lon: lon.toString(),
  });
  const data = fetchData<GeocodingResponse[]>(url);
  return data;
}

async function getDirectGeocoding(location: string) {
  const url = createUrl(`${API_CONFIG.GEO}/direct`, {
    q: location,
  });
  const data = await fetchData<GeocodingResponse[]>(url);
  return data;
}

async function getCurrentWeather(lat: number, lon: number) {
  const url = createUrl(`${API_CONFIG.BASE_URL}/weather`, {
    lat: lat.toString(),
    lon: lon.toString(),
  });
  const data = await fetchData<CurrentWeatherResponse>(url);
  return data;
}

async function getForecast(lat: number, lon: number) {
  const url = createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
    lat,
    lon,
  });
  const data = await fetchData<ForecastResponse>(url);
  return data;
}

export {
  getDirectGeocoding,
  getReverseGeocode,
  getCurrentWeather,
  getForecast,
};
