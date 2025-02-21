import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { WeatherForecasts } from '@/types';

const useWeatherForecast = (lat: string, long: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecasts[]>([]);
  const [selectedForecast, setSelectedForecast] = useState<WeatherForecasts | null>(null);
  const watherApi = process.env.EXPO_PUBLIC_WEATHER_API_URL;
  const key = process.env.EXPO_PUBLIC_API_KEY;

  const getForecast = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${watherApi}?lat=${lat}&lon=${long}&units=metric&appid=${key}`,
      );
      setWeatherForecast(data.daily);
      setSelectedForecast(data.daily[0]);
    } catch (error) {
      setWeatherForecast([]);
      setSelectedForecast(null);
    } finally {
      setIsLoading(false);
    }
  }, [lat, long]);

  useEffect(() => {
    getForecast();
  }, [getForecast]);

  const selectForecast = (forecast: WeatherForecasts) => {
    setSelectedForecast(forecast);
  };

  return { isLoading, weatherForecast, selectedForecast, selectForecast };
};

export default useWeatherForecast;
