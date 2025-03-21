import { ImageBackground, StyleSheet, View } from 'react-native';
import React from 'react';
import { AssetReturnType } from '@/types';

type ScreenBg = {
  source: AssetReturnType;
  children: React.ReactNode;
  overlay?: boolean;
};

const ScreenBg = ({ source, children, overlay = true }: ScreenBg) => {
  return (
    <ImageBackground style={styles.backgroundImage} source={source}>
      <View style={overlay ? styles.overlay : {}}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default ScreenBg;
