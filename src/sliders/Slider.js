import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import Typography from '../typography/Typography'; // Asegúrate de que Typography esté correctamente implementado

const SliderGroup = ({ slidersData }) => {
  const [values, setValues] = useState(
    slidersData.map((slider) => slider.initialValue || 0)
  );

  const handleSliderChange = (value, index) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <View style={styles.container}>
      {slidersData.map((slider, index) => (
        <View key={index} style={styles.sliderContainer}>
          {/* Mostrar la etiqueta pasada como prop */}
          <Typography variant="BodyS" color="#333">
            {slider.label}
          </Typography>

          {/* Mostrar el valor actual del slider */}
          <Text style={styles.number}>{values[index]}</Text>

          <Slider
            style={styles.slider}
            minimumValue={slider.minValue}
            maximumValue={slider.maxValue}
            step={slider.step}
            value={values[index]}
            onValueChange={(value) => handleSliderChange(value, index)}
            minimumTrackTintColor="#333"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#888"
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
    padding: 20,
  },
  number: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  sliderContainer: {
    marginBottom: 20,
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default SliderGroup;
