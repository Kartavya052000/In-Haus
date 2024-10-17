import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Typography from '../../typography/Typography'; // Asegúrate de que la ruta a Typography.js sea la correcta

const RadioButton = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handlePress = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioOption}
          onPress={() => handlePress(option)}
        >
          <View style={[styles.circle, selectedOption === option && styles.selectedCircle]} />
          <Typography variant="BodyS" color="#333">
            {option}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 10,
  },
  selectedCircle: {
    backgroundColor: '#555', // Color de relleno cuando está seleccionado
  },
});

export default RadioButton;
