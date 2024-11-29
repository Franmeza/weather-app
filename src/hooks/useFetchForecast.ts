import { ForecastResponse } from "@/services/api/types";
import { getForecast } from "@/services/api/weatherApi";
import { useEffect } from "react";

function useFetchForecast(
  setForecast: (forecast: ForecastResponse | null) => void,
  coordinates: { lat: number; lon: number } | null
) {
  useEffect(() => {
    const fetchForecast = async () => {
      try {
        if (coordinates) {
          const forecast = await getForecast(coordinates.lat, coordinates.lon);
          setForecast(forecast);
        }
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }
    };
    fetchForecast();
  }, [coordinates]);
}

export default useFetchForecast;
