import { useWeatherContext } from "../hooks/useWeatherContext";
import HourlyForecastCard from "./HourlyForecastCard";

function TodayForecast() {
  const { weatherForecast } = useWeatherContext();

  return (
    <section className=" flex flex-wrap  w-full  gap-4 ">
      {weatherForecast?.list.slice(0, 8).map((item) => (
        <HourlyForecastCard key={item.dt} hourWeather={item} />
      ))}
    </section>
  );
}

export default TodayForecast;
