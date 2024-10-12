import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../Inputs/InputField'; 
import Dropdown from '../Dropdown/Dropdown'; 
import DateTimeComponent from '../DateTime/DateTimeComponent';
import Icon from 'react-native-vector-icons/Ionicons'; // Use an appropriate icon library

const EditEvent = () => {
  const [eventName, setEventName] = useState(''); 
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState('Vacations');

  const handleSave = () => {
    const event = {
      eventName,
      description,
      date,
      time,
      category,
      repeat,
    };
    console.log('Event saved:', event);
  };

  const handleDelete = () => {
    console.log('Event deleted');
    // Logic for deleting the event
  };


  return (
    <ScrollView style={styles.container}>

      {/* Event Name */}
      <InputField
        label="Event name"
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
        style={styles.inputField}
      />

      {/* Date & Time */}
      <View style={styles.fieldContainer}>
        <DateTimeComponent />
      </View>

      {/* Category */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Category</Text>
        <Dropdown
          options={['Vacations', 'Meetings', 'Personal']}
          selectedValue={category}
          onValueChange={setCategory}
        />
      </View>

      {/* Description */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Description</Text>
        <InputField
          placeholder="Event description"
          value={description}
          onChangeText={setDescription}
          style={[styles.inputField, styles.textArea]}
        />
      </View>

      {/* Discard and Save Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.discardButton} onPress={() => console.log('Changes discarded')}>
          <Text style={styles.discardText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    paddingRight: 10,
  },
  inputField: {
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    padding: 15,
    borderWidth: 1,
  },
  dropdownText: {
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 30,
  },
  discardButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  discardText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditEvent;
