import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native'; // Import useRoute
import { GET_TASK, EDIT_TASK } from '../../graphql/mutations/taskMutations';
import InputField from '../Inputs/InputField';
import Dropdown from '../Dropdown/Dropdown';
import DateTimeComponent from '../DateTime/DateTimeComponent';
import * as SecureStore from 'expo-secure-store';

const EditTask = () => {
  const route = useRoute(); // Get the route object
  const { id } = route.params; // Destructure taskId from route.params
  

  // Fetch task details
  const [getTask, { loading, error, data }] = useLazyQuery(GET_TASK, {
    variables: { taskId: id },
    // Optionally, you can add `fetchPolicy`, `onCompleted`, etc.
  });

  const fetchTaskData = async (token) => {
    console.log(token,"++++",id)
    if (token) {
      getTask({
        context: {
          headers: {
            Authorization: `${token}`, // Use token in headers
          },
        },
        variables: {
          taskID: id, // Replace with actual groupID if necessary
        },
      });
    }
  };
  const [editTask] = useMutation(EDIT_TASK);

  const [title, setTitle] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [repeat, setRepeat] = useState('');
  const [category, setCategory] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [points, setPoints] = useState(100);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          setAuthToken(token);
          fetchTaskData(token);
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

  useEffect(() => {
    if (data && data.getTask) {
      const task = data.getTask;
      setTitle(task.taskName);
      setStartDateTime(new Date(task.startDate));
      setEndDateTime(new Date(task.endDate));
      setRepeat(task.repeat);
      setCategory(task.type);
      setAssignedTo(task.assignedTo.id);
      setPoints(task.points);

      console.log('Fetched Task:', task);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      const updatedTaskDetails = {
        taskName: title,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        repeat,
        assignedTo,
        points,
        type: category,
      };

      const response = await editTask({
        variables: {
          taskId:id,
          updatedTaskDetails
        },
        context: {
          headers: {
            Authorization: authToken ? `${authToken}` : '',
          },
        },
      });
Alert.alert("Updated Successfully")
      console.log('Task updated:', response.data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading task details: {error.message}</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Task Name */}
      <InputField
        label="Task name"
        placeholder={title || "Task Name"}
        value={title}
        onChangeText={setTitle}
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
          options={['Cleaning', 'Cooking', 'Shopping', 'feature']}
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

      {/* Amount of Points */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Amount of Points</Text>
        <Dropdown
          options={[100, 200, 300, 5]} // Added the existing value for points (5)
          selectedValue={points}
          onValueChange={setPoints}
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

export default EditTask;
