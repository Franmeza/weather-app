import CardsContainer from "./reusable/CardsContainer";
import windIcon from "@/assets/wind.png";
import { timeFormatter } from "@/utils/timeFormatter";
import { useWeatherContext } from "../hooks/useWeatherContext";
import { useEffect, useState } from "react";
import { getReverseGeocode } from "@/services/api/weatherApi";

function CurrentLocation() {
  const [city, setCity] = useState<string | undefined>("");

  const { currentWeather, newCoordinates } = useWeatherContext();

  useEffect(() => {
    const getLocationName = async () => {
      const city = newCoordinates
        ? await getReverseGeocode(newCoordinates)
        : null;
      setCity(city?.[0].name);
    };
    getLocationName();
  }, [newCoordinates]);

  return (
    <div>
      <section className="bg-[#20293A] rounded-2xl px-5 py-6 space-y-3 min-w-[340px]">
        <CardsContainer>
          <h1 className="text-6xl font-semibold">
            {currentWeather?.main.temp}°
          </h1>
          <div className="text-end">
            <h2 className="text-2xl font-medium">{city}</h2>
            <span className="text-xs">
              {timeFormatter(undefined, "h:mm a")}
            </span>
          </div>
        </CardsContainer>
        <CardsContainer>
          <div className="flex items-center ">
            <img
              className="inline"
              src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`}
              alt={currentWeather?.weather[0].description}
              width={45}
              height={45}
            />
            <span className="ml-3">{currentWeather?.weather[0].main}</span>
          </div>
          <div>
            <img
              className="inline"
              src={windIcon}
              width={45}
              height={45}
              alt="wind"
            />
            <span className="ml-3">{currentWeather?.wind.speed} m/s</span>
          </div>
        </CardsContainer>
        <CardsContainer>
          <p>Feel like: {currentWeather?.main.feels_like}°</p>
          <p>
            {currentWeather?.main.temp_min}° to {currentWeather?.main.temp_max}°{" "}
          </p>
        </CardsContainer>
      </section>
    </div>
  );
}

export default CurrentLocation;
