import { createContext, useState } from "react";
import unitTempCovert from "@/utils/tempConversor";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { CurrentWeatherResponse } from "@/services/api/types";
import useFetchWeather from "@/hooks/useFetchWeather";

type WeatherContextType = {
  location: string;
  setLocation: (location: string) => void;
  currentWeather: CurrentWeatherResponse | null;
  coordinates: {
    lat: number;
    lon: number;
  } | null;
  tempUnit: string;
  handleTempUnit: (unit: string) => void;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tempUnit, setTempUnit] = useState("C");

  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherResponse | null>(null);

  const { coordinates } = useGeolocation();

  useFetchWeather(location, coordinates, setCurrentWeather);

  const handleTempUnit = (unit: string) => {
    setTempUnit(unit);
  };

  const contextValue = {
    location,
    setLocation,
    currentWeather: currentWeather
      ? {
          ...currentWeather,
          main: {
            temp: unitTempCovert(currentWeather.main.temp, tempUnit),
            feels_like: unitTempCovert(
              currentWeather.main.feels_like,
              tempUnit
            ),
            temp_min: unitTempCovert(currentWeather.main.temp_min, tempUnit),
            temp_max: unitTempCovert(currentWeather.main.temp_max, tempUnit),
          },
        }
      : null,
    coordinates,
    handleTempUnit,
    tempUnit,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}
export default WeatherContextProvider;
