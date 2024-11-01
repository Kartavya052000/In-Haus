import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';

const GradientSlider = () => {
  const [value, setValue] = useState(3000);
  const maxValue = 5000;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{value}/{maxValue}</Text>

      <View style={styles.sliderContainer}>
        <LinearGradient
          colors={['#f3a0e8', '#8b207c', '#ffe0f0']}
          style={styles.gradientBackground}
        >
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={maxValue}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            thumbTintColor="#8b207c" // Color of the slider thumb
            value={value}
            onValueChange={setValue}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  sliderContainer: {
    width: '100%',
  },
  gradientBackground: {
    borderRadius: 10,
    height: 10, // Slider height
    width: '100%',
    overflow: 'hidden',
  },
  slider: {
    width: '100%',
    height: 40, // Height to make it touchable
  },
});

export default GradientSlider;
