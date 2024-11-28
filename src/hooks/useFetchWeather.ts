import { CurrentWeatherResponse } from "@/services/api/types";
import { getCurrentWeather } from "@/services/api/weatherApi";
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
        } else if (location.length > 3 && coordinates) {
          const weather = await getCurrentWeather(
            coordinates.lat,
            coordinates.lon
          );
          setCurrentWeather(weather);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [coordinates, setCurrentWeather, location]);
}
export default useFetchWeather;
