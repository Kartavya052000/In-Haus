import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import InputField from '../Inputs/InputField'; 
import Dropdown from '../Dropdown/Dropdown'; 
import DateTimeComponent from '../DateTime/DateTimeComponent';
import { useMutation, useQuery } from "@apollo/client";
import * as SecureStore from 'expo-secure-store'; 
import { CREATE_TASK } from "../../graphql/mutations/taskMutations";
import { GET_GROUP } from "../../graphql/mutations/taskMutations";

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState(''); 
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [category, setCategory] = useState('Vacations');
  const [assignedTo, setAssignedTo] = useState(null);
  const [repeat, setRepeat] = useState("Never");
  const [authToken, setAuthToken] = useState(null);

  // Fetch auth token
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

  const [createTask, { loading, error, data }] = useMutation(CREATE_TASK);

  const groupId = "670622bdd001f960932e8c20";

  const { loading: groupLoading, error: groupError, data: groupData } = useQuery(GET_GROUP, {
    variables: { groupId },
  });

  const handleDateTimeChange = (startDateTime, endDateTime, repeatValue) => {
    setStartDateTime(startDateTime);
    setEndDateTime(endDateTime);
    setRepeat(repeatValue);
  };

  const handleSave = async () => {
    try {
      const startDateTimeISO = startDateTime.toISOString();
      const endDateTimeISO = endDateTime.toISOString();

      console.log("Start DateTime:", startDateTimeISO);
      console.log("End DateTime:", endDateTimeISO);
      console.log("Repeat:", repeat);
      console.log("Event Name:", eventName);
      console.log("Description:", description);
      console.log("Assigned To User ID:", assignedTo);
      console.log("Category:", category);

      // Execute mutation 
      const response = await createTask({
        variables: {
          taskName: eventName,
          // description: description,
          startDate: startDateTimeISO,
          endDate: endDateTimeISO,
          repeat: repeat,
          assignedTo: assignedTo,
          // category: category,
          points: 100,
          type: "event",
        },
        context: {
          headers: {
            Authorization: authToken ? `${authToken}` : '',
          },
        },
      });

      console.log("Event saved:", response.data);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  if (groupLoading) {
    return <Text>Loading group data...</Text>;
  }

  if (groupError) {
    return <Text>Error loading group data: {groupError.message}</Text>;
  }

  // Extract members from group data
  const members = groupData?.getGroup?.members || [];

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
        <DateTimeComponent onDateTimeChange={handleDateTimeChange} />
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
          options={members}
          selectedValue={assignedTo}
          onValueChange={(value) => {
            setAssignedTo(value);
          }}
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

      {/* Discard and Save Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.discardButton} onPress={() => console.log('Event discarded')}>
          <Text style={styles.discardText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Error Handling */}
      {loading && <Text>Saving...</Text>}
      {error && <Text>Error saving event: {error.message}</Text>}
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
