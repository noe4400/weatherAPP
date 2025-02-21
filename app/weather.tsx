import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { Button, Card, MD3Colors, ProgressBar } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenBg from '@/components/ScreenBg';
import { BlurView } from 'expo-blur';
import { converUnixDateToLocal, getCardStyle } from '@/utils/converstion';
import WeatherIcon from '@/components/WeatherIcon';
import { useWeatherForecast } from '@/hooks';

const Weather = () => {
  const router = useRouter();
  const { lat, long, city }: { lat: string; long: string; city: string } = useLocalSearchParams();
  const roundTemp = (temp: number | undefined) => {
    return Math.ceil(temp || 0);
  };

  const { isLoading, weatherForecast, selectedForecast, selectForecast } = useWeatherForecast(
    lat,
    long,
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ProgressBar style={styles.progressBar} indeterminate color={MD3Colors.error100} />
      </View>
    );
  }

  const { weather, temp, feels_like, dt: selectedWeatherDate } = selectedForecast || {};
  const { day, min, max } = temp || {};
  const dayTemp = roundTemp(day);
  const minTemp = roundTemp(min);
  const maxTemp = roundTemp(max);
  const { day: feelsLikeTemp } = feels_like || {};
  const feelsLike = roundTemp(feelsLikeTemp);
  const { icon: weatherIcon, description, id: weatherId } = weather?.[0] || {};

  const { backgroundColor, textColor, assetImage } = getCardStyle(weatherId);

  return (
    <ScreenBg source={assetImage} overlay={false}>
      <SafeAreaView style={styles.safeAreaView}>
        <Button
          icon="arrow-left"
          style={{ width: 100, marginLeft: 20, backgroundColor }}
          textColor={textColor}
          mode="contained"
          onPress={() => router.back()}
        >
          back
        </Button>
        <View style={styles.cardContainer}>
          <Card style={[styles.card, { backgroundColor }]}>
            <Card.Content style={styles.cardContent}>
              <Text style={[styles.title, { color: textColor }]}>
                {selectedWeatherDate && converUnixDateToLocal(selectedWeatherDate)}
              </Text>
              <View style={styles.weatherInfo}>
                {weatherIcon && <WeatherIcon icon={weatherIcon} />}
                <Text style={[styles.temp, { color: textColor }]}>{dayTemp}</Text>
              </View>
              <Text style={[styles.weather, { color: textColor }]}>{description}</Text>
              <Text style={[styles.location, { color: textColor }]}>{city}</Text>
              <Text style={[styles.date, { color: textColor }]}>
                {`Min: ${minTemp} - Max: ${maxTemp}`}
              </Text>
              <Text style={[styles.feelsLike, { color: textColor }]}>Feels like {feelsLike}</Text>
            </Card.Content>
          </Card>

          <FlatList
            data={weatherForecast || []}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const date = converUnixDateToLocal(item.dt);
              const { day } = item.temp || {};
              const temp = roundTemp(day);
              const { icon: weatherIcon } = item.weather?.[0] || {};

              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    selectForecast(item);
                  }}
                >
                  <BlurView intensity={30} style={styles.blurView}>
                    <Card style={styles.transparentCard}>
                      <Card.Content style={styles.cardItemContent}>
                        <Text style={styles.dateText}>{date}</Text>
                        <View style={styles.weatherInfoRow}>
                          {weatherIcon && <WeatherIcon icon={weatherIcon} height={30} width={30} />}
                          <Text style={styles.tempText}>{temp}</Text>
                        </View>
                      </Card.Content>
                    </Card>
                  </BlurView>
                </TouchableWithoutFeedback>
              );
            }}
            keyExtractor={(item) => `${item.dt}`}
            style={styles.flatList}
          />
        </View>
      </SafeAreaView>
    </ScreenBg>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 7,
    width: '80%',
  },
  cardContainer: {
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  card: {
    minWidth: 320,
    minHeight: 300,
    borderRadius: 12,
    padding: 0,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 25,
    justifyContent: 'space-around',
    gap: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  temp: {
    fontSize: 85,
    fontWeight: 'bold',
  },
  weather: {
    fontSize: 20,
    textAlign: 'center',
  },
  location: {
    fontSize: 15,
    textAlign: 'center',
  },
  date: {
    fontSize: 15,
    textAlign: 'center',
  },
  feelsLike: {
    fontSize: 15,
    textAlign: 'center',
  },
  blurView: {
    minWidth: 30,
    borderRadius: 12,
    marginTop: 10,
    overflow: 'hidden',
  },
  transparentCard: {
    minHeight: 30,
    backgroundColor: 'transparent',
  },
  cardItemContent: {
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  weatherInfoRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallWeatherIcon: {
    width: 20,
    height: 20,
  },
  tempText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  flatList: {
    marginTop: 20,
    paddingBottom: 20,
    maxHeight: 350,
    flexGrow: 0,
  },
});

export default Weather;
