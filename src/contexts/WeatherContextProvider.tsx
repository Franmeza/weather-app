import { createContext, useEffect, useState } from "react";
import unitTempCovert from "@/utils/tempConversor";
import { useGeolocation } from "@/hooks/useGeoLocation";
import { Coordinates, CurrentWeatherResponse } from "@/services/api/types";
import useFetchWeather from "@/hooks/useFetchWeather";
import { getDirectGeocoding } from "@/services/api/weatherApi";

type WeatherContextType = {
  location: string;
  setLocation: (location: string) => void;
  currentWeather: CurrentWeatherResponse | null;
  newCoordinates: {
    lat: number;
    lon: number;
  } | null;
  tempUnit: string;
  handleTempUnit: (unit: string) => void;
  setNewCoordinates: (coordinates: { lat: number; lon: number }) => void;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { coordinates } = useGeolocation();
  const [tempUnit, setTempUnit] = useState("C");
  const [newCoordinates, setNewCoordinates] = useState<Coordinates | null>(
    null
  );
  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherResponse | null>(null);

  useFetchWeather(location, newCoordinates, setCurrentWeather);
  console.log(coordinates);

  useEffect(() => {
    setNewCoordinates(coordinates);
    const getCoordinates = async () => {
      if (location.length > 0) {
        const data = await getDirectGeocoding(location);
        if (data.length === 0) return;

        const { lat, lon } = data[0];
        setNewCoordinates({ lat, lon });
      }
    };
    getCoordinates();
  }, [coordinates, location]);

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
    newCoordinates,
    handleTempUnit,
    tempUnit,
    setNewCoordinates,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}
export default WeatherContextProvider;
