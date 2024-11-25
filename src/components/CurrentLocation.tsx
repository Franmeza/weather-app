import CardsContainer from "./reusable/CardsContainer";
import windIcon from "@/assets/wind.png";
import { localTime } from "@/utils/localTime";
import { useWeatherContext } from "./hooks/useWeatherContext";

function CurrentLocation() {
  const { currentWeather } = useWeatherContext();
  const {
    main,
    weather: [weather],
    name,
    wind,
  } = currentWeather!;
  return (
    <section className="bg-[#20293A] rounded-2xl px-5 py-6 space-y-3 w-full">
      <CardsContainer>
        <h1 className="text-6xl font-semibold">{main.temp}°</h1>
        <div className="text-end">
          <h2 className="text-2xl font-medium">{name}</h2>
          <span className="text-xs">{localTime}</span>
        </div>
      </CardsContainer>
      <CardsContainer>
        <div className="flex items-center ">
          <img
            className="inline"
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            width={36}
            height={36}
          />
          <span className="ml-3">{weather.main}</span>
        </div>
        <div>
          <img
            className="inline"
            src={windIcon}
            width={36}
            height={36}
            alt="wind"
          />
          <span className="ml-3">{wind.speed} m/s</span>
        </div>
      </CardsContainer>
      <CardsContainer>
        <p>Feel like: {main.feels_like}°</p>
        <p>
          {main.temp_min}° to {main.temp_max}°
        </p>
      </CardsContainer>
    </section>
  );
}

export default CurrentLocation;
