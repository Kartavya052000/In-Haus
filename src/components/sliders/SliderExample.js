import React from 'react';
import { View, StyleSheet } from 'react-native';
import SliderGroup from './Slider';

const SliderExample = () => {
  const slidersData = [
    { label: 'Brightness', minValue: 0, maxValue: 100, step: 1, initialValue: 50 },
    { label: 'Volume', minValue: 0, maxValue: 100, step: 1, initialValue: 30 },
  ];

  return (
    <View style={styles.container}>
      <SliderGroup slidersData={slidersData} />
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
});

export default SliderExample;
