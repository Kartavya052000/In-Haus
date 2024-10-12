import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../Inputs/InputField'; 
import Dropdown from '../Dropdown/Dropdown'; 
import DateTimeComponent from '../DateTime/DateTimeComponent';
import PrimaryButton from '../buttons/PrimaryButton';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState(''); 
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState('Vacations');
  const [assignedTo, setAssignedTo] = useState('Me');

  const handleSave = () => {
    const event = {
      eventName,
      description,
      date,
      time,
      assignedTo,
      category,
      repeat,
    };
    console.log('Event saved:', event);
    // Add logic to save event to backend
  };

  return (
    <ScrollView style={styles.container}>

      {/* Event Name */}
      <InputField
        label="Event name"
        placeholder="Event Name Goes Here"
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

      {/* Assign To */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Assign to (Multiple people)</Text>
        <Dropdown
          options={['Me', 'Team', 'Family']}
          selectedValue={assignedTo}
          onValueChange={setAssignedTo}
        />
      </View> 

      {/* Description */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Description</Text>
        <InputField
          placeholder="Event description"
          value={description}
          onChangeText={setDescription}
          style={[styles.inputField, styles.textArea]} // Text area style
        />
      </View>

      {/* Discard and Save Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.discardButton} onPress={() => console.log('Event discarded')}>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  toggleButton: {
    marginHorizontal: 10,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 16,
    color: 'white',
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

export default CreateEvent;
