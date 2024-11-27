import { CurrentWeatherResponse } from "@/services/api/types";
import {
  getCurrentWeather,
  getDirectGeocoding,
} from "@/services/api/weatherApi";
import { useEffect } from "react";

function useFetchWeather(
  location: string,
  coordinates: { lat: number; lon: number } | null,
  setCurrentWeather: (weather: CurrentWeatherResponse | null) => void
) {
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!location && coordinates) {
          const weather = await getCurrentWeather(
            coordinates.lat,
            coordinates.lon
          );
          setCurrentWeather(weather);
        } else if (location.length > 3) {
          const data = await getDirectGeocoding(location);
          if (data.length === 0) return;

          const { lat, lon } = data[0];

          const weather = await getCurrentWeather(lat, lon);
          setCurrentWeather(weather);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [location, coordinates, setCurrentWeather]);
}
export default useFetchWeather;
