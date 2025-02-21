import { WeatherHistoryResponse } from "@/services/api/types";
import { getWeatherHistory } from "@/services/api/weatherApi";
import { useEffect, useState } from "react";

export function useSensorData() {
  const [sensorData, setSensorData] = useState<WeatherHistoryResponse>();

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const data = await getWeatherHistory();
        setSensorData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSensorData();
  }, []);

  return sensorData;
}
