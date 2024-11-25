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

async function FetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  return data;
}

export async function getReverseGeocode({ lat, lon }: Coordinates) {
  const url = createUrl(API_CONFIG.ENNDPOINTS.reverse_geocoding, {
    lat: lat.toString(),
    lon: lon.toString(),
  });
  const data = FetchData<GeocodingResponse[]>(url);
  return data;
}

async function getDirectGeocoding(location: string) {
  const url = createUrl(API_CONFIG.ENNDPOINTS.direct_geocoding, {
    q: location,
  });
  const data = await FetchData<GeocodingResponse[]>(url);
  return data;
}

async function getCurrentWeather(lat: number, lon: number) {
  const url = createUrl(API_CONFIG.ENNDPOINTS.weather, {
    lat: lat.toString(),
    lon: lon.toString(),
  });
  const data = await FetchData<CurrentWeatherResponse>(url);
  return data;
}

async function getForecast(lat: string, lon: string) {
  const url = createUrl(API_CONFIG.ENNDPOINTS.forecast, {
    lat,
    lon,
  });
  const data = await FetchData<ForecastResponse[]>(url);
  return data;
}

export { getDirectGeocoding, getCurrentWeather, getForecast };
