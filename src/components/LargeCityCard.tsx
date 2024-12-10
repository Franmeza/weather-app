import unitTempConvert from "@/utils/tempConversor";
import CardsContainer from "./reusable/CardsContainer";
import { CurrentWeatherResponse } from "@/services/api/types";
import { useWeatherContext } from "@/hooks/useWeatherContext";

function LargeCityCard({ largeCity }: { largeCity: CurrentWeatherResponse }) {
  const { tempUnit } = useWeatherContext();
  return (
    <>
      <div className="bg-[#20293A] rounded-2xl px-5 py-5 ">
        <CardsContainer>
          <div className="space-y-1">
            <p className="text-sm text-[#97A3B6]">{largeCity.sys.country}</p>
            <p className="font-medium text-2xl">{largeCity.name}</p>
          </div>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${largeCity.weather[0].icon}@4x.png`}
              alt="weather icon"
              width={36}
              height={36}
            />
          </div>
        </CardsContainer>
        <CardsContainer>
          <p className="text-xs ">{largeCity.weather[0].main}</p>
          <span className="text-2xl">
            {unitTempConvert(largeCity.main.temp, tempUnit)}°
          </span>
        </CardsContainer>
      </div>
    </>
  );
}

export default LargeCityCard;
