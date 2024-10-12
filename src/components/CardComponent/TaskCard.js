import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import EditTaskEvent from '../../pages/EditTaskEvent';

const TaskContainer = ({
  taskName = "No Task",
  startTime = "",
  endTime = "9:00",
}) => {
  const navigation = useNavigation();

  const handleTaskPress = () => {
    navigation.navigate("EditTaskEvent", { taskName, startTime, endTime });
  };

  return (
    <TouchableOpacity onPress={handleTaskPress}>
      <View style={styles.taskContainer}>
        {/* Horizontal bar */}
        <View style={styles.horizontalBar} />
        <Text style={styles.taskName}>{taskName}</Text>
        <Text style={styles.taskTime}>
          {startTime} - {endTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical: 30,
    position: "relative",
    overflow: "hidden",
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
});

export default TaskContainer;
