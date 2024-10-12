import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import OptionTabs from "../components/TabsNavigators/OptionTabs/OptionTabs"; 
import EditTask from "../components/TaskComponent/EditTask";
import EditEvent from "../components/EventComponent/EditEvent";

const CreateTaskEvent = () => {
  const [activeTab, setActiveTab] = useState("Task");

  // Handle tab change (Task or Event)
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    console.log("Active Tab:", tabName);
  };

  // Define the options for the tabs
  const options = [
    { name: 'Task' },
    { name: 'Event' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Edit</Text>
        </View>

        {/* Display Content Based on Selected Tab */}
        {activeTab === "Task" ? (
          <EditTask />
        ) : (
          <EditEvent />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: "center",
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CreateTaskEvent;
