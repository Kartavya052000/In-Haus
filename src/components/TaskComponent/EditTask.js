import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute
import { GET_TASK, EDIT_TASK } from "../../graphql/mutations/taskMutations";
import InputField from "../Inputs/InputField";
import Dropdown from "../Dropdown/Dropdown";
import DateTimeComponent from "../DateTime/DateTimeComponent";
import * as SecureStore from "expo-secure-store";
import Typography from "../typography/Typography";
import CategorySelection from "../CategoryComponent/CategorySelection";

const EditTask = () => {
  const route = useRoute(); // Get the route object
  const { id } = route.params; // Destructure taskId from route.params
  const navigation = useNavigation();

  // Fetch task details
  const [getTask, { loading, error, data }] = useLazyQuery(GET_TASK, {
    variables: { taskId: id },
    // Optionally, you can add `fetchPolicy`, `onCompleted`, etc.
  });

  const fetchTaskData = async (token) => {
    console.log(token, "++++", id);
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

  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [repeat, setRepeat] = useState("Never");
  const [category, setCategory] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [points, setPoints] = useState(100);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
          setAuthToken(token);
          fetchTaskData(token);
          console.log("Token retrieved:", token);
        } else {
          console.error("No auth token found");
        }
      } catch (error) {
        console.error("Error retrieving auth token:", error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    console.log(data, "DATTAA");
    if (data && data.getTask) {
      const task = data.getTask;
      setTitle(task.taskName);
      setStartDateTime(new Date(task.startDate));
      setEndDateTime(new Date(task.endDate));
      // setRepeat(task.repeat);
      setRepeat("Never");
      setCategory(data.category);
      setAssignedTo(task.assignedTo.id);
      setPoints(100);
      console.log(repeat);
      // console.log('Fetched Task:', task);
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
        category,
        type: category,
      };

      const response = await editTask({
        variables: {
          taskId: id,
          updatedTaskDetails,
        },
        context: {
          headers: {
            Authorization: authToken ? `${authToken}` : "",
          },
        },
      });
      Alert.alert("Updated Successfully");
      navigation.replace("CalenderPage");

      console.log("Task updated:", response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error loading task details: {error.message}</Text>;

  return (
    <View style={styles.mainContentContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.fieldContainer}>
          {/* Task Name */}
          <InputField
            label="Task name"
            placeholder={title || "Task Name"}
            value={title}
            onChangeText={setTitle}
            style={styles.inputField}
          />
        </View>

        {/* Date & Time */}
        <View style={styles.fieldContainer}>
          <View style={styles.dateTimeComponent}>
            <DateTimeComponent
              startDateTime={startDateTime}
              endDateTime={endDateTime}
              onDateTimeChange={(start, end) => {
                setStartDateTime(start);
                setEndDateTime(end);
              }}
              repeat2={repeat}
            />
          </View>
        </View>

        {/* Repeat */}
        {/* <View style={styles.fieldContainer}>
        <Text style={styles.label}>Repeat</Text>
        <Dropdown
          options={['Never', 'Daily', 'Weekly', 'Monthly']}
          selectedValue={repeat}
          onValueChange={setRepeat}
        />
      </View> */}

        {/* Category */}
        <View style={styles.fieldContainer}>
          <View style={styles.categoryComponent}>
            <CategorySelection
              setCategory={setCategory}
              onSelect={(selectedCategory) => setCategory(selectedCategory)}
            />
          </View>
        </View>

        {/* Assign To */}
        <View style={styles.fieldContainer}>
          <Typography variant="SH4" style={styles.label}>
            Assign to
          </Typography>
          <Dropdown
            options={[
              { id: "67062299d001f960932e8c1b", username: "Mateo" },
              { id: "67062290d001f960932e8c18", username: "Aryan" },
              { id: "670622a3d001f960932e8c1e", username: "Kartavya" },
            ]}
            selectedValue={assignedTo}
            onValueChange={(value) => setAssignedTo(value)}
            labelExtractor={(item) => item.username}
            valueExtractor={(item) => item.id}
          />
        </View>

        {/* Amount of Points */}
        <View style={styles.fieldContainer}>
          <Typography variant="SH4" style={styles.label}>
            Amount of Points
          </Typography>
          <Dropdown
            options={[100, 200, 300, 5]} // Added the existing value for points (5)
            selectedValue={points}
            onValueChange={setPoints}
          />
        </View>

        {/* Save Button */}
        {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View> */}

        {/* Discard and Save Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={() => console.log("Discarded")}
          >
            <Text style={[styles.discardText, { color: "#476BFB" }]}>
              Discard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={[styles.saveText, { color: "#FFFFFF" }]}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContentContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
  },
  container: {
    padding: 20,
    // marginTop: 40
  },
  // inputField: {
  //   marginBottom: 20,
  // },
  fieldContainer: {
    marginBottom: 10,
  },
  dateTimeComponent: {
    marginBottom: 20,
  },
  categoryComponent: {
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
    borderColor: "#476BFB",
    borderWidth: 1,
    borderRadius: 16,
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
    backgroundColor: "#476BFB",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EditTask;
