import { WeatherContext } from "@/contexts/WeatherContextProvider";
import { useContext } from "react";

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error(
      "useWeatherContext must be used within a WeatherContextProvider"
    );
  return context;
};
