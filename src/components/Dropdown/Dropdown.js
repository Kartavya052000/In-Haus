import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Typography from '../typography/Typography';

const Dropdown = ({ label, options, selectedValue, onValueChange, disabled, labelExtractor, valueExtractor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionPress = (value) => {
    onValueChange(value); 
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => {
    const optValue = valueExtractor ? valueExtractor(opt) : opt;
    return optValue === selectedValue;
  });

  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      {label && (
        <Typography variant="SH4" color="#000">
          {label}
        </Typography>
      )}
      <TouchableOpacity
        style={[styles.dropdown, disabled && styles.disabledDropdown]}
        onPress={toggleDropdown}
        disabled={disabled}
      >
        <Text style={[styles.inputText, disabled && styles.disabledInput]}>
          {selectedOption
            ? labelExtractor
              ? labelExtractor(selectedOption)
              : selectedValue.toString()
            : 'Select an option'}
        </Text>
        <AntDesign name={isOpen ? 'up' : 'down'} size={16} color={disabled ? '#ccc' : '#000'} />
      </TouchableOpacity>

      {isOpen && !disabled && (
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => {
            const optionValue = valueExtractor ? valueExtractor(option) : option;
            return (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => handleOptionPress(optionValue)}
              >
                <Typography variant="BodyS" color="#333">
                  {labelExtractor ? labelExtractor(option) : optionValue.toString()}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
    marginTop: 6,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginTop: 4,
    marginBottom: 4,
  },
  dropdownOptions: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  option: {
    padding: 10,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  disabledDropdown: {
    borderColor: '#ccc',
  },
  disabledInput: {
    color: '#ccc',
  },
});

export default Dropdown;
