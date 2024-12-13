type TemperatureBarProps = {
  minTemp: number;
  maxTemp: number;
  globalMinTemp: number;
  globalMaxTemp: number;
};

function TemperatureBar({
  minTemp,
  maxTemp,
  globalMinTemp,
  globalMaxTemp,
}: TemperatureBarProps) {
  const globalRange = globalMaxTemp - globalMinTemp;
  const left = ((minTemp - globalMinTemp) / globalRange) * 100;
  const width = ((maxTemp - minTemp) / globalRange) * 100;

  return (
    <div className="flex w-full max-w-sm items-center  gap-3">
      <span>{minTemp}°</span>
      <div className="relative h-[6px] w-full rounded-full  bg-[#030616]">
        <div
          className="absolute h-full rounded-full bg-blue-500 "
          style={{
            width: `${width}%`,
            left: `${left}%`,
          }}
        ></div>
      </div>
      <span>{maxTemp}°</span>
    </div>
  );
}

export default TemperatureBar;
