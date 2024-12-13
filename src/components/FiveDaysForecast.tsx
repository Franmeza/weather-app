import { useWeatherContext } from "@/hooks/useWeatherContext";
import H2 from "./reusable/H2";
import { format } from "date-fns";
import unitTempConvert from "@/utils/tempConversor";
import TemperatureBar from "./TemperatureBar";

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

function FiveDaysForecast() {
  const { weatherForecast, tempUnit } = useWeatherContext();
  if (!weatherForecast) return null;

  const dailyForecast = weatherForecast.list.reduce((acc, forecast) => {
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

  const nextDays = Object.values(dailyForecast).slice(0, 5);
  console.log(nextDays);
  // Global values for temp_min and temp_max
  const globalTemps = Object.values(dailyForecast).reduce(
    (acc, day) => {
      acc.min = Math.min(acc.min, day.temp_min);
      acc.max = Math.max(acc.max, day.temp_max);
      return acc;
    },
    { min: Infinity, max: -Infinity } // Initial Values
  );

  return (
    <section className="space-y-5">
      <H2>5-day forecast</H2>
      <div className="flex flex-col gap-3">
        {nextDays.map((day) => (
          <div
            key={day.date}
            className="flex items-center justify-between gap-[40px]  lg:flex-nowrap lg:gap-[77px] bg-[#20293A] rounded-xl px-5 py-3"
          >
            <p>{format(new Date(day.date * 1000), "EEE")}</p>

            <div className="flex justify-center items-center ">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather.icon}@4x.png`}
                width={36}
                height={36}
              />
              <p className="text-[10px] text-[#97A3B6]">{day.weather.main}</p>
            </div>

            <TemperatureBar
              maxTemp={day.temp_max}
              minTemp={day.temp_min}
              globalMinTemp={globalTemps.min}
              globalMaxTemp={globalTemps.max}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FiveDaysForecast;
