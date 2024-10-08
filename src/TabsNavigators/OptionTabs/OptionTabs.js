import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const OptionTabs = ({ options = [], activeColor = '#ccc', inactiveColor = '#f9f9f9', textColor = '#333', onTabChange }) => {
  const [activeOption, setActiveOption] = useState(options[0]?.name || 'Option 1'); // Por defecto seleccionamos la primera opción

  const handleTabPress = (option) => {
    setActiveOption(option.name);
    if (onTabChange) {
      onTabChange(option.name);
    }
  };

  return (
    <View style={styles.container}>
      {/* Distribuimos las opciones sin scroll */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              {
                backgroundColor: activeOption === option.name ? activeColor : inactiveColor,
              },
            ]}
            onPress={() => handleTabPress(option)}
          >
            <Text style={[styles.optionText, { color: textColor }]}>
              {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
  },
  optionsContainer: {
    flexDirection: 'row', // Alineamos las opciones en una fila
    justifyContent: 'space-evenly', // Distribuimos las opciones uniformemente
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    flex: 1, // Cada opción ocupa el mismo ancho
    alignItems: 'center', // Centrar el texto
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default OptionTabs;
