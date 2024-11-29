import CurrentLocation from "./components/CurrentLocation";
import FiveDaysForecast from "./components/FiveDaysForecast";
import Header from "./components/Header";
import OtherCitiesWeather from "./components/OtherCitiesWeather";
import TodayForecast from "./components/TodayForecast";
import "./App.css";

function App() {
  return (
    <div className="px-6 lg:px-8 xl:px-[72px] py-7 ">
      <Header />
      <div className="grid min-[800px]:grid-cols-[auto,1fr]  gap-x-11 gap-y-9 mt-4">
        <div>
          <CurrentLocation />
        </div>
        <TodayForecast />
        <OtherCitiesWeather />
        <FiveDaysForecast />
      </div>
    </div>
  );
}

export default App;
