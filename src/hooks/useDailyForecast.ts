import { useMemo } from "react";
import { useWeatherContext } from "./useWeatherContext";
import { format } from "date-fns";
import unitTempConvert from "@/utils/tempConversor";

type DailyForecast = {
  temp: number;
  temp_min: number;
  temp_max: number;
  weather: {
    icon: string;
    main: string;
  };
  date: number;
};

function useDailyForecast() {
  const { weatherForecast, tempUnit } = useWeatherContext();

  const dailyForecast = useMemo(() => {
    if (!weatherForecast) return {};
    return weatherForecast.list.reduce((acc, forecast) => {
      const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

      if (!acc[date]) {
        acc[date] = {
          temp: unitTempConvert(forecast.main.temp, tempUnit),
          temp_min: unitTempConvert(forecast.main.temp_min, tempUnit),
          temp_max: unitTempConvert(forecast.main.temp_max, tempUnit),
          weather: forecast.weather[0],
          date: forecast.dt,
        };
      } else {
        acc[date].temp_min = Math.min(
          acc[date].temp_min,
          unitTempConvert(forecast.main.temp_min, tempUnit)
        );

        acc[date].temp_max = Math.max(
          acc[date].temp_max,
          unitTempConvert(forecast.main.temp_max, tempUnit)
        );
      }
      return acc;
    }, {} as Record<string, DailyForecast>);
  }, [weatherForecast, tempUnit]);

  // Global values for temp_min and temp_max
  const globalTemps = useMemo(() => {
    return Object.values(dailyForecast).reduce(
      (acc, day) => {
        acc.min = Math.min(acc.min, day.temp_min);
        acc.max = Math.max(acc.max, day.temp_max);

        return acc;
      },
      { min: Infinity, max: -Infinity } // Initial Values
    );
  }, [dailyForecast]);

  const nextDays = Object.values(dailyForecast).slice(0, 5);
  return { nextDays, globalTemps };
}

export default useDailyForecast;
