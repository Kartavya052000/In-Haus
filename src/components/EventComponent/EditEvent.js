import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TASK , EDIT_TASK } from '../../graphql/mutations/taskMutations'; 
import InputField from '../Inputs/InputField'; 
import Dropdown from '../Dropdown/Dropdown'; 
import DateTimeComponent from '../DateTime/DateTimeComponent';
import * as SecureStore from 'expo-secure-store'; 

const EditEvent = () => {
  // Hardcoded ID
  const taskId = '6706f1f4c6f40e8246a2d6e7'; 

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { taskId },
  });

  const [editTask] = useMutation(EDIT_TASK);

  const [eventName, setEventName] = useState(''); 
  const [description, setDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [repeat, setRepeat] = useState('');
  const [category, setCategory] = useState('Vacations');
  const [assignedTo, setAssignedTo] = useState('');

  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken'); 
        if (token) {
          setAuthToken(token);
          console.log('Token retrieved:', token);
        } else {
          console.error('No auth token found');
        }
      } catch (error) {
        console.error('Error retrieving auth token:', error);
      }
    };

    getToken();
  }, []);

  // Populate form fields with fetched data
  useEffect(() => {
    if (data && data.getEvent) {
      const task = data.getTask;
      setEventName(task.taskName);
      // setDescription(event.description);
      setStartDateTime(new Date(task.startDate));
      setEndDateTime(new Date(task.endDate));
      setRepeat(task.repeat);
      setCategory(task.category);
      setAssignedTo(task.assignedTo.id); 

      console.log('Fetched Event:', task);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      const updatedTaskDetails = {
        taskName: eventName,
        // description: description,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        repeat,
        assignedTo,
        // category,
        type: 'event',
      };
    
      const response = await editTask({
        variables: {
          taskId, 
          updatedTaskDetails 
        },

        context: {
          headers: {
            Authorization: authToken ? `${authToken}` : '',
          },
        },
      });
    
      console.log('Event updated:', response.data);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading event details: {error.message}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Event Name */}
      <InputField
        label="Event name"
        placeholder={eventName || "Event Name"} 
        value={eventName}
        onChangeText={setEventName}
        style={styles.inputField}
      />

      {/* Date & Time */}
      <View style={styles.fieldContainer}>
        <DateTimeComponent
          startDateTime={startDateTime}
          endDateTime={endDateTime}
          onDateTimeChange={(start, end) => {
            setStartDateTime(start);
            setEndDateTime(end);
          }}
        />
      </View>

      {/* Repeat */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Repeat</Text>
        <Dropdown
          options={['Never', 'Daily', 'Weekly', 'Monthly']}
          selectedValue={repeat}
          onValueChange={setRepeat}
        />
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
        <Text style={styles.label}>Assign to</Text>
        <Dropdown
          options={[
            { id: '67062299d001f960932e8c1b', username: 'Mateo' },
            { id: '67062290d001f960932e8c18', username: 'Aryan' },
            { id: '670622a3d001f960932e8c1e', username: 'Kartavya' }
          ]}
          selectedValue={assignedTo}
          onValueChange={(value) => setAssignedTo(value)}
          labelExtractor={(item) => item.username}
          valueExtractor={(item) => item.id}
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

      {/* Save Button */}
      <View style={styles.buttonContainer}>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 30,
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
