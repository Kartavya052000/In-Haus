import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../Inputs/InputField'; 
import Dropdown from '../Dropdown/Dropdown'; 
import DateTimeComponent from '../DateTime/DateTimeComponent';
import Icon from 'react-native-vector-icons/Ionicons'; // Use a suitable icon library

const EditTask = () => {
  const [title, setTitle] = useState(''); // Task name pre-filled for editing
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [category, setCategory] = useState('Cleaning');
  const [assignedTo, setAssignedTo] = useState('Me');
  const [points, setPoints] = useState(100);

  const handleSave = () => {
    const task = {
      title,
      date,
      time,
      assignedTo,
      points,
      category,
    };
    console.log('Task saved:', task);
    // Add logic to save task to backend
  };

  const handleDelete = () => {
    console.log('Task deleted');
    // Add logic to delete task from backend
  };

  return (
    <ScrollView style={styles.container}>

      {/* Task Name */}
      <InputField
        label="Task name"
        placeholder="Task Name"
        value={title}
        onChangeText={setTitle}
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
          options={['Cleaning', 'Cooking', 'Shopping']}
          selectedValue={category}
          onValueChange={setCategory}
        />
      </View>

      {/* Assign To */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Assign to</Text>
        <Dropdown
          options={['Me', 'User 1', 'User 2']}
          selectedValue={assignedTo}
          onValueChange={setAssignedTo}
        />
      </View>

      {/* Amount of Points */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Amount of Points</Text>
        <Dropdown
          options={[100, 200, 300]}
          selectedValue={points}
          onValueChange={setPoints}
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

export default EditTask;
