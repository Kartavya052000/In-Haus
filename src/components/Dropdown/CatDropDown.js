import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Typography from '../typography/Typography'; // Ensure this path is correct
import { OpenIcon, CloseIcon } from '../icons/icons'; // Import the icons

const CatDropdown = ({ label, options, disabled, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(option); // Pass the selected option to the parent
    }
  };

  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      <Typography variant="SH4" color="#000">
        {label}
      </Typography>

      <TouchableOpacity
        style={[styles.dropdown, disabled && styles.disabledDropdown]}
        onPress={toggleDropdown}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${label} dropdown`}
        accessibilityState={{ expanded: isOpen }}
      >
        <TextInput
          style={[styles.input, disabled && styles.disabledInput]}
          placeholder="Select an option"
          value={selectedOption || ''}
          editable={false} // Prevent direct editing
        />
        <View style={styles.icon}>{isOpen ? <CloseIcon /> : <OpenIcon />}</View>
      </TouchableOpacity>

      {isOpen && !disabled && (
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleOptionPress(option)}
            >
              <Typography variant="BodyS" color="#333">
                {option}
              </Typography>
            </TouchableOpacity>
          ))}
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
  input: {
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
  icon: {
    marginLeft: 10,
  },
});

export default CatDropdown;