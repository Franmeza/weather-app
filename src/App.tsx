import CurrentLocation from "./components/CurrentLocation";
import FiveDaysForecast from "./components/FiveDaysForecast";
import Header from "./components/Header";
import OtherCitiesWeather from "./components/OtherCitiesWeather";
import TodayForecast from "./components/TodayForecast";
import "./App.css";
import { useWeatherContext } from "./hooks/useWeatherContext";
import { useGeolocation } from "./hooks/useGeoLocation";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { AlertTriangle } from "lucide-react";
import LoadingSkeleton from "./components/LoadingSkeleton";

function App() {
  const { currentWeather, weatherForecast } = useWeatherContext();

  const { coordinates, isLoading, error } = useGeolocation();

  if (isLoading) return <LoadingSkeleton />;

  if (error || !coordinates)
    return (
      <Alert variant="destructive" className="mt-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );

  if (!currentWeather || !weatherForecast) return <LoadingSkeleton />;

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
