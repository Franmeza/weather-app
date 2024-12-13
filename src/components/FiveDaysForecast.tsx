import H2 from "./reusable/H2";
import { format } from "date-fns";
import TemperatureBar from "./TemperatureBar";
import useDailyForecast from "@/hooks/useDailyForecast";

function FiveDaysForecast() {
  const { nextDays, globalTemps } = useDailyForecast();

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
                width={45}
                height={45}
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
