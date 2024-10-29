import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import InputField from "../Inputs/InputField";
import Dropdown from "../Dropdown/Dropdown";
import DropDownTask from "../Dropdown/DropDownTask";
import DateTimeComponent from "../DateTime/DateTimeComponent";
import { CREATE_TASK } from "../../graphql/mutations/taskMutations";
import { GET_GROUP } from "../../graphql/mutations/taskMutations";
import * as SecureStore from 'expo-secure-store'; 
import { useNavigation } from "@react-navigation/native";

const CreateTask = (activetab) => {
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [category, setCategory] = useState("");
  const [assignedTo, setAssignedTo] = useState(null);
  const [points, setPoints] = useState(100);
  const [repeat, setRepeat] = useState("Never");
  const [members,setMembers] = useState([]);
  const [description, setDescription] = useState(''); 
  const navigation = useNavigation();

  const [authToken, setAuthToken] = useState(null);

  // Fetch auth token
  useEffect(() => {
    // Alert.alert(activetab)
    console.log(activetab,"ACCC");
    
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken'); 
        if (token) {
          setAuthToken(token);
          fetchGroupData(token)
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

  const [createTask, { loading: taskLoading, error: taskError, data: taskData }] = useMutation(CREATE_TASK);


  // Fetch group data 
  const [fetchGroup, { loading, error, data }] = useLazyQuery(GET_GROUP, {
    onCompleted: (data) => {
  
      console.log(data.getGroup.members);
      
      // setTasks(data.getGroup.filteredTasks)
      setMembers(data.getGroup.members);   
      // console.log(members);
       
     },
    onError: (error) => {
      console.error('Error fetching group:', error.message);
    },
  });
  const fetchGroupData = async (token) => {
      fetchGroup({
        context: {
          headers: {
            Authorization: `${authToken}`, // Use token in headers
          },
        },
        variables: {
          groupID: "test", // Replace with actual groupID if necessary
        },
      });
  };
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
      let variables={}
      if(activetab.activeTab=="Task"){
        variables= {
          taskName: title,
          startDate: startDateTimeISO,
          endDate: endDateTimeISO,
          repeat: repeat,
          assignedTo: assignedTo, 
          points: points,
          type:'task'
        }
      }else{
        variables= {
          taskName: title,
          startDate: startDateTimeISO,
          endDate: endDateTimeISO,
          repeat: repeat,
          assignedTo: assignedTo, 
          description:description,
          type:'event'
        }
      }
      
 
      const response = await createTask({
     variables,
        context: {
          headers: {
            Authorization: authToken ? `${authToken}` : '',
          },
        },
      });
Alert.alert(activetab.activeTab +" Saved Successfully")
navigation.navigate('CalenderPage');

      console.log("Task saved:", response.data);
    } catch (error) {
      console.error("Error saving task:", error);
    }
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
  <DropDownTask
    options={members}
    selectedValue={assignedTo}
    onValueChange={(value) => {
      console.log('Selected user ID:', value); // Debugging log
      setAssignedTo(value);
    }}
    labelExtractor={(item) => item.username}
    valueExtractor={(item) => item.id}
  />
</View>

{/* Points */}
{activetab.activeTab === "Task" && (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>Amount of Points</Text>
    <InputField
      placeholder="Points"
      value={points.toString()} // Convert points to string for display
      onChangeText={(value) => setPoints(Number(value) || 0)} // Convert input to a number
      style={styles.inputField}
    />

    {/* <Dropdown
      options={[100, 200, 300]} // Ensure these are numbers if points expects a number
      selectedValue={points} // points should be a number here
      onValueChange={setPoints} // Set points as a numeric value
    /> */}
  </View>
)}
{activetab.activeTab === "Event" && (

<View style={styles.fieldContainer}>
        <Text style={styles.label}>Description</Text>
        <InputField
          placeholder="Event description"
          value={description}
          onChangeText={setDescription}
          style={[styles.inputField, styles.textArea]} 
        />
      </View>
)}


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
