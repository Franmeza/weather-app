import { useWeatherContext } from "@/hooks/useWeatherContext";
import { timeFormatter } from "@/utils/timeFormatter";
import unitTempConvert from "@/utils/tempConversor";
import { CurrentWeatherResponse, WeatherCondition } from "@/services/api/types";

type HourlyForecastCardProps = {
  dt: number;
  dt_txt: string;
  main: CurrentWeatherResponse["main"];
  weather: WeatherCondition[];
};

function HourlyForecastCard({
  hourWeather,
}: {
  hourWeather: HourlyForecastCardProps;
}) {
  const { tempUnit } = useWeatherContext();

  return (
    <div className="flex flex-col items-center  px-2 py-4 bg-[#20293A] rounded-2xl">
      <span className="text-xs mb-3">
        {timeFormatter(hourWeather.dt_txt, "h:mm a")}
      </span>
      <div className="border-t-2 w-16 border-[#030616] "></div>

      <img
        className="mt-4"
        src={`https://openweathermap.org/img/wn/${hourWeather?.weather[0].icon}@4x.png`}
        alt=""
        height={45}
        width={45}
      />
      <span className="font-medium text-[10px] text-[#97A3B6]">
        {hourWeather?.weather[0].main}
      </span>

      <h2 className="font-semibold text-[32px] mt-4">
        {unitTempConvert(hourWeather?.main.temp, tempUnit)}°
      </h2>
    </div>
  );
}

export default HourlyForecastCard;
