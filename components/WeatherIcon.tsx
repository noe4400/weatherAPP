import { Image } from 'react-native';
import React from 'react';

const WeatherIcon = ({
  height = 50,
  width = 50,
  icon,
}: {
  height?: number;
  width?: number;
  icon: string;
}) => {
  return (
    <Image
      style={{ height, width }}
      source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
    />
  );
};

export default WeatherIcon;
