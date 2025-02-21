export type Coordinates = {
  lat: number;
  lon: number;
};

export type GeocodingResponse = {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type CurrentWeatherResponse = {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  name: string;
};

export type ForecastResponse = {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: CurrentWeatherResponse["main"];
    weather: WeatherCondition[];
  }>;
};

export type WeatherHistoryResponse = {
  data: Array<{
    temperature: number;
    humidity: number;
    lightIntesity: number;
    atmosphericPressure: number;
    createdAt: string;
  }>;
};
