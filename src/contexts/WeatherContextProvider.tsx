import { createContext, useEffect, useState } from "react";
import { getCurrentWeather, getDirectGeocoding } from "@/services/weatherApi";
import unitTempCovert from "@/utils/tempConversor";

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
} | null;

type WeatherContextType = {
  location: string;
  SetLocation: (location: string) => void;
  currentWeather: CurrentWeatherResponse;
  coordinates: {
    lat: number;
    lon: number;
  };
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
  const [location, SetLocation] = useState("");
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherResponse | null>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  }>({ lat: 0, lon: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Optionally set default coordinates
          setCoordinates({ lat: 0, lon: 0 });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location === "" && coordinates.lat !== 0 && coordinates.lon !== 0) {
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
        SetLocation,
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
