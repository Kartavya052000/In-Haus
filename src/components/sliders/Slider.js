import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import Typography from '../typography/Typography'; // Asegúrate de que Typography esté correctamente implementado


const { width } = Dimensions.get('window');

const SliderGroup = ({ slidersData }) => {
  const [values, setValues] = useState(
    slidersData.map((slider) => slider.initialValue || 0)
  );

  const [showValue, setShowValue] = useState(false); // Estado para mostrar u ocultar el valor del slider

  const handleSliderChange = (value, index) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    setShowValue(true); // Mostrar el valor al mover el slider
  };

  const handleSliderComplete = () => {
    setTimeout(() => setShowValue(false), 1000); // Ocultar el valor después de 1 segundo de inactividad
  };

  return (
    <View style={styles.container}>

      {slidersData.map((slider, index) => {
        let valuePosition = ((values[index] - slider.minValue) / (slider.maxValue - slider.minValue)) * (width - 110); // Calcula la posición del valor basado en el ancho completo

        // Asegurar que el valor no se salga de la pantalla
        if (valuePosition < 0) valuePosition = 0;
        if (valuePosition > width - 100) valuePosition = width - 140; // Ajusta según el margen y ancho del valor

        return (
          <View key={index} style={styles.sliderContainer}>
            <View style={styles.labelContainer}>
              <Typography variant="BodyS" color="#333">
                {slider.label}
              </Typography>
            </View>

            {/* Contenedor para la etiqueta dinámica (se muestra solo si el slider está en uso) */}
            {showValue && (
              <View style={[styles.valueContainer, { left: valuePosition }]}>
                <Text style={styles.currentValue}>{values[index].toFixed(0)}</Text>
              </View>
            )}

            <View style={styles.sliderWrapper}>
              <Text style={styles.minMaxLabel}>{slider.minValue}</Text>

              <Slider
                style={styles.slider}
                minimumValue={slider.minValue}
                maximumValue={slider.maxValue}
                step={slider.step}
                value={values[index]}
                onValueChange={(value) => handleSliderChange(value, index)}
                onSlidingComplete={handleSliderComplete} // Detecta cuando el slider ha terminado de moverse
                minimumTrackTintColor="#333"
                maximumTrackTintColor="#E0E0E0"
                thumbTintColor="#B0B0B0"
              />

              <Text style={styles.minMaxLabel}>{slider.maxValue}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    padding: 20,
  },
  sliderContainer: {
    marginBottom: 30,
    width: '100%',
  },
  labelContainer: {
    marginBottom: 5,
  },
  valueContainer: {
    position: 'absolute', // Posición absoluta para colocar el valor sobre el thumb
    top: 50, // Ajusta la altura del texto para que esté cerca del thumb
    alignItems: 'center',
  },
  currentValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    // Fondo transparente eliminado
    padding: 5,
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Ocupar todo el ancho disponible
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  minMaxLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default SliderGroup;
