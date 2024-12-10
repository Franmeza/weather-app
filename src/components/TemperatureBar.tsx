type TemperatureBarProps = {
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
};

function TemperatureBar({
  currentTemp,
  minTemp,
  maxTemp,
}: TemperatureBarProps) {
  const range = Math.abs(maxTemp - minTemp);

  return (
    <div className="flex w-full max-w-sm items-center  gap-3">
      <span>{minTemp}°</span>
      <div className="relative h-[6px] w-full rounded-full  bg-[#030616]">
        <div
          className="absolute h-full rounded-full bg-blue-500 "
          style={{
            width: `${range}%`,
            left: `${Math.max(
              0,
              Math.min(
                100 - 10,
                ((currentTemp - minTemp) / range) * 100 - 10 / 2
              )
            )}%`,
          }}
        ></div>
      </div>
      <span>{maxTemp}°</span>
    </div>
  );
}

export default TemperatureBar;
