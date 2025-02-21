import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ScreenBg from '@/components/ScreenBg';
import { router } from 'expo-router';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

function index() {
  const translateY = useSharedValue(200);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });
    opacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
  }, []);

  return (
    <ScreenBg source={require('@/assets/images/welcome-screen.png')}>
      <Animated.View style={[styles.mainContainer, animatedStyle]}>
        <View style={styles.innerContainer}>
          <MaterialIcons name="mode-of-travel" size={51} color="white" />
          <Text style={styles.title}>WeatherApp for Travelers</Text>
        </View>
        <Button
          buttonColor="black"
          textColor="white"
          mode="contained"
          style={styles.button}
          onPress={() => router.push('/search')}
        >
          Explore
        </Button>
      </Animated.View>
    </ScreenBg>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: 236,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
  },
});

export default index;
