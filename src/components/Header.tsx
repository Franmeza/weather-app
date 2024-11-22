import SearchIcon from "@/assets/Search.svg";
import { useWeatherContext } from "./hooks/useWeatherContext";

function Header() {
  const { tempUnit, handleTempUnit } = useWeatherContext();
  return (
    <header className="flex w-full items-center justify-between ">
      <div className=" relative">
        <input
          className="rounded-full pl-11 py-2 bg-[#20293A] border border-[#20293A] focus:border-[#030616] focus:outline-none"
          type="text"
          placeholder="Search city..."
        />
        <span className="flex items-center absolute top-0 inset-y-0 ml-2  mr-4">
          <img src={SearchIcon} alt="magnifier" />
        </span>
      </div>
      <div className="bg-[#20293A] rounded-full p-1 text-white font-bold">
        <button
          className={`${
            tempUnit === "C" ? "bg-white text-[#20293A]" : "bg-none"
          } rounded-full h-8 w-8 `}
          onClick={() => handleTempUnit("C")}
        >
          °C
        </button>
        <button
          className={`${
            tempUnit === "F" ? " bg-white text-[#20293A]" : "bg-none"
          } rounded-full h-8 w-8  `}
          onClick={() => handleTempUnit("F")}
        >
          °F
        </button>
      </div>
    </header>
  );
}

export default Header;
