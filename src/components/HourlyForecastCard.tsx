import { useWeatherContext } from "@/hooks/useWeatherContext";
import { timeFormatter } from "@/utils/timeFormatter";
import unitTempCovert from "@/utils/tempConversor";

function HourlyForecastCard({ hourWeather }) {
  const { tempUnit } = useWeatherContext();

  return (
    <div className="flex flex-col items-center  px-2 py-4 bg-[#20293A] rounded-2xl">
      <span className="text-xs mb-3">{timeFormatter(hourWeather.dt_txt)}</span>
      <div className="border-t-2 w-16 border-[#030616] "></div>

      <img
        className="mt-4"
        src={`https://openweathermap.org/img/wn/${hourWeather?.weather[0].icon}@4x.png`}
        alt=""
        height={36}
        width={36}
      />
      <span className="font-medium text-[10px] text-[#97A3B6]">
        {hourWeather?.weather[0].main}
      </span>

      <h2 className="font-semibold text-[32px] mt-5">
        {unitTempCovert(hourWeather?.main.temp, tempUnit)}°
      </h2>
    </div>
  );
}

export default HourlyForecastCard;