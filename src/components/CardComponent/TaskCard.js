import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useMutation } from "@apollo/client";
import { TASK_COMPLETE } from "../../graphql/mutations/taskMutations";
import * as SecureStore from 'expo-secure-store';  

const TaskContainer = ({
  taskName = "No Task",
  startTime = "",
  endTime = "9:00",
  id
}) => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [token, setToken] = useState(null);

  // Fetch token on component mount
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('authToken');
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
        Alert.alert('Retrieval Error', 'Failed to retrieve authentication token.');
      }
    };
    getToken();
  }, []);

  const [completeTask] = useMutation(TASK_COMPLETE, {
    context: {
      headers: {
        Authorization: ` ${token}`,
      },
    },
    variables: { taskId: id },
    onCompleted: (data) => {
      Alert.alert("Task completed!");
      console.log("Task marked as completed:", data.completeTask);
      // conso
      // SecureStore.setItemAsync('points',data.completeTask.assignedTo.points)
      // navigation.replace("CalendarPage"); // Reload the current page
    },
    onError: (error) => {
      console.error("Error completing task:", error);
      Alert.alert("Error completing task:", error.message);
    },
  });

  const handleTaskPress = () => {
    setExpanded(!expanded);
  };

  const handleEditPress = () => {
    navigation.navigate("EditTaskEvent", { id });
  };

  const handleDonePress = () => {
    if (token) {
      completeTask(); // Executes the completeTask mutation with token in context
    } else {
      Alert.alert("Error", "No authentication token found.");
    }
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTaskPress}>
        <View style={styles.taskContainer}>
          <View style={styles.horizontalBar} />
          <Text style={styles.taskName}>{taskName}</Text>
          <Text style={styles.taskTime}>
            {startTime} - {endTime}
          </Text>
          <FontAwesome6 
            name={expanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            style={styles.chevronIcon} 
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.accordionContent}>
          <Text style={styles.taskDetails}>Details about the task go here.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDonePress} style={styles.doneButton}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  taskContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  horizontalBar: {
    height: 2,
    backgroundColor: "black",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskTime: {
    fontSize: 14,
    color: "#888",
  },
  chevronIcon: {
    paddingHorizontal: 10,
  },
  accordionContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#e6f0ff",
    borderRadius: 8,
  },
  taskDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#ffa726",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  doneButton: {
    backgroundColor: "#66bb6a",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TaskContainer;
