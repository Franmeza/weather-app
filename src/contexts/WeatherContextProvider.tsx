import { createContext, useEffect, useState } from "react";
import { getCurrentWeather, getDirectGeocoding } from "@/services/weatherApi";
import unitTempCovert from "@/utils/tempConversor";
import { CurrentWeatherResponse } from "@/utils/types";
import { getGeolocation } from "@/utils/geoLocation";

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
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  useEffect(() => {
    //Get user geolocation
    const geoLocation = async () => {
      const { lat, lon } = await getGeolocation();
      setCoordinates({ lat, lon });
    };
    geoLocation();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (location === "" && coordinates) {
          const weather = await getCurrentWeather(
            coordinates.lat,
            coordinates.lon
          );
          setCurrentWeather(weather);
        } else if (location !== "") {
          const { lat, lon } = await getDirectGeocoding(location);
          const weather = await getCurrentWeather(lat, lon);
          setCurrentWeather(weather);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };
    fetchWeather();
  }, [coordinates, location]);

  const handleTempUnit = (unit: string) => {
    setTempUnit(unit);
  };
  return (
    <WeatherContext.Provider
      value={{
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
                temp_min: unitTempCovert(
                  currentWeather.main.temp_min,
                  tempUnit
                ),
                temp_max: unitTempCovert(
                  currentWeather.main.temp_max,
                  tempUnit
                ),
              },
            }
          : null,
        coordinates,
        handleTempUnit,
        tempUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
export default WeatherContextProvider;
