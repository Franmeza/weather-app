import { useEffect, useState } from "react";
import H2 from "./reusable/H2";
import { getCurrentWeather } from "@/services/api/weatherApi";
import { CurrentWeatherResponse } from "@/services/api/types";
import LargeCityCard from "./LargeCityCard";

function OtherCitiesWeather() {
  const [largeCities, setLargeCities] = useState<CurrentWeatherResponse[]>([]);
  console.log(largeCities);

  const coordinatesLargeCities = {
    newyork: {
      lat: 40.7127281,
      lon: -74.0060152,
    },
    london: {
      lat: 51.5073219,
      lon: -0.1276474,
    },
    tokyo: {
      lat: 35.69,
      lon: 139.69,
    },
  };

  useEffect(() => {
    const getLargeCities = async () => {
      const data = await Promise.all(
        Object.values(coordinatesLargeCities).map((coordinates) => {
          return getCurrentWeather(coordinates.lat, coordinates.lon);
        })
      );

      setLargeCities(data);
    };
    getLargeCities();
  }, []);

  return (
    <section className="flex flex-col gap-6 w-full ">
      <H2>Other large cities</H2>
      {largeCities.length > 0 &&
        largeCities.map((city) => (
          <LargeCityCard key={city.name} largeCity={city} />
        ))}
    </section>
  );
}

export default OtherCitiesWeather;
