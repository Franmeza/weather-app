import CardsContainer from "./reusable/CardsContainer";
import snowIcon from "@/assets/13d.png";
import windIcon from "@/assets/wind.png";
import { localTime } from "@/utils/localTime";
import { useWeatherContext } from "./hooks/useWeatherContext";

function CurrentLocation() {
  const { currentWeather } = useWeatherContext();

  return (
    <section className="bg-[#20293A] rounded-2xl px-5 py-6 space-y-3 w-full">
      <CardsContainer>
        <h1 className="text-6xl font-semibold">{currentWeather?.main.temp}</h1>
        <div className="text-end">
          <h2 className="text-2xl font-medium">{currentWeather?.name}</h2>
          <span className="text-xs">{localTime}</span>
        </div>
      </CardsContainer>
      <CardsContainer>
        <div>
          <img
            className="inline"
            src={snowIcon}
            alt="Snow Icon"
            width={36}
            height={36}
          />
          <span className="ml-3">{currentWeather?.weather[0].main}</span>
        </div>
        <div>
          <img
            className="inline"
            src={windIcon}
            width={36}
            height={36}
            alt="wind"
          />
          <span className="ml-3">{currentWeather?.wind.speed} m/s</span>
        </div>
      </CardsContainer>
      <CardsContainer>
        <p>Feel like: {currentWeather?.main.feels_like}°</p>
        <p>
          {currentWeather?.main.temp_min}° to {currentWeather?.main.temp_max}°
        </p>
      </CardsContainer>
    </section>
  );
}

export default CurrentLocation;
