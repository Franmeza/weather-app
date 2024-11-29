import { useWeatherContext } from "../hooks/useWeatherContext";
import HourlyForecastCard from "./HourlyForecastCard";

function TodayForecast() {
  const { weatherForecast } = useWeatherContext();
  console.log(weatherForecast);

  return (
    <section className=" flex flex-wrap  w-full  gap-4 ">
      {weatherForecast?.list.map((item) => (
        <HourlyForecastCard key={item.dt} hourWeather={item} />
      ))}
    </section>
  );
}

export default TodayForecast;
