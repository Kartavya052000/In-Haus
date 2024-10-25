import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Typography from '../typography/Typography';
import { MaterialIcons } from '@expo/vector-icons'; // Importing Material Icons for the calendar icon

export default function DateTimeForRewards({ label, selectedDate, onDateTimeChange, disabled = false }) {
  const [show, setShow] = React.useState(false);

  const onChange = (event, date) => {
    const currentDate = date || selectedDate;
    setShow(false);
    onDateTimeChange(currentDate); // Update the parent state with the selected date
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      {/* Etiqueta del campo (Label) */}
      <Typography variant="SH4" style={styles.label}>
        {label}
      </Typography>

      {/* Espacio entre Label y el Input */}
      <View style={{ height: 4 }} />

      <TouchableOpacity 
        style={styles.dropdownContainer} 
        onPress={showDatePicker}
        disabled={disabled}
      >
        <Text style={styles.dropdownText}>
          {selectedDate ? selectedDate.toDateString() : 'Select a date'}
        </Text>
        <MaterialIcons name="calendar-today" size={24} color="#333" style={styles.icon} />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Spacing between fields
    borderRadius: 24, // Rounded corners
    paddingHorizontal: 12, // Horizontal padding
    paddingVertical: 12, // Vertical padding
  },
  label: {
    marginBottom: 4, // Spacing between label and button
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdownText: {
    color: '#333',
    flex: 1, // Take up available space
  },
  icon: {
    marginLeft: 10, // Spacing between text and icon
  },
});
