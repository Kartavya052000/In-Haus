import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import InputField from "../Inputs/InputField";
import Dropdown from "../Dropdown/Dropdown";
import DateTimeComponent from "../DateTime/DateTimeComponent";
import { CREATE_TASK } from "../../graphql/mutations/taskMutations";
import { GET_GROUP } from "../../graphql/mutations/taskMutations";
import * as SecureStore from 'expo-secure-store'; 

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [category, setCategory] = useState("");
  const [assignedTo, setAssignedTo] = useState(null);
  const [points, setPoints] = useState(100);
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

  // Fetch group data 
  const { loading: groupLoading, error: groupError, data: groupData } = useQuery(GET_GROUP, {
    variables: { groupId },
  });

  const handleDateTimeChange = (startDateTime, endDateTime, repeatValue) => {
    setStartDateTime(startDateTime);
    setEndDateTime(endDateTime);
    setRepeat(repeatValue);
    console.log("Repeat value in CreateTask:", repeatValue);
  };

  const handleSave = async () => {
    try {
      const startDateTimeISO = startDateTime.toISOString();
      const endDateTimeISO = endDateTime.toISOString();

      // Log values 
      console.log("Start DateTime:", startDateTimeISO);
      console.log("End DateTime:", endDateTimeISO);
      console.log("Repeat:", repeat);
      console.log("Title:", title);
      console.log("Points:", points);
      console.log("Assigned To User ID:", assignedTo);

      // Execute mutation 
      const response = await createTask({
        variables: {
          taskName: title,
          startDate: startDateTimeISO,
          endDate: endDateTimeISO,
          repeat: repeat,
          assignedTo: assignedTo, 
          points: points,
          type: "task",
        },
        context: {
          headers: {
            Authorization: authToken ? `${authToken}` : '',
          },
        },
      });

      console.log("Task saved:", response.data);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  if (groupLoading) {
    return <Text>Loading group data...</Text>;
  }

  if (groupError) {
    return <Text>Error loading group data: {groupError.message}</Text>;
  }

  // Extract members from the group data
  const members = groupData?.getGroup?.members || [];

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

      <View style={styles.fieldContainer}>
        {/* DateTimeComponent */}
        <DateTimeComponent onDateTimeChange={handleDateTimeChange} />
      </View>

      {/* Category */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Category</Text>
        <Dropdown
          options={["Cleaning", "Cooking", "Shopping"]}
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

      {/* Points */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Amount of Points</Text>
        <Dropdown
          options={[100, 200, 300]}
          selectedValue={points}
          onValueChange={(value) => {
            setPoints(value);
          }}
        />
      </View>

      {/* Discard and Save Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.discardButton}
          onPress={() => console.log("Task discarded")}
        >
          <Text style={styles.discardText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Loading/Error Handling */}
      {loading && <Text>Saving...</Text>}
      {error && <Text>Error saving task: {error.message}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  discardButton: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  discardText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "black",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CreateTask;
