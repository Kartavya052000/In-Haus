import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import OptionTabs from "../components/TabsNavigators/OptionTabs/OptionTabs"; 
import CreateEvent from "../components/EventComponent/CreateEvent"; 
import CreateTask from "../components/TaskComponent/CreateTask";

const CreateTaskEvent = () => {
  const [activeTab, setActiveTab] = useState("Task");

  // Handle tab change (Task or Event)
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    console.log("Active Tab:", tabName);
  };

  const options = [
    { name: 'Task' },
    { name: 'Event' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Create</Text>
        </View>

        <OptionTabs
          options={options}
          activeColor="black"
          inactiveColor="gray"
          textColor="white"
          onTabChange={handleTabChange}
        />

        {/* Display Content Based on Selected Tab */}
        {activeTab === "Task" ? (
          <CreateTask />
        ) : (
          <CreateEvent />
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
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default CreateTaskEvent;
