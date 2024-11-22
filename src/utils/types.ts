export type CurrentWeatherResponse = {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  name: string;
  wind: {
    speed: number;
  };
} | null;
