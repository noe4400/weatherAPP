type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export type WeatherForecasts = {
  dt: number;
  temp: Temperature;
  feels_like: FeelsLike;
  weather: WeatherDescription[];
};
