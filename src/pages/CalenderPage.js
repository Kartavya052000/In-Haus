import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet,TouchableOpacity } from "react-native";
import TabsNavigation from "../components/TabsNavigators/TabsNavigation";
import TaskCard from "../components/CardComponent/TaskCard";
import CreateTaskEvent from "./CreateTaskEvent";
import { useNavigation } from '@react-navigation/native';



const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigation = useNavigation();

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    console.log("Active Tab:", tabName);
  };

  const handleClick = () => {
    navigation.navigate('CreateTaskEvent');
    console.log("Tab Clicked:");
  };

  // Example Data
  const users = [
    { name: "Molly" },
    { name: "Fred" },
    { name: "George" },
    { name: "Ron" },
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <TouchableOpacity style={styles.creteButton} onPress={handleClick}>
          <Text style={styles.saveText}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs Navigation */}
      <TabsNavigation
        users={users}
        activeColor="black"
        inactiveColor="gray"
        onTabChange={handleTabChange}
      />

      {/* Calendar Content */}
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.sectionTitle}>Morning (05:00 - 11:59 AM)</Text>
          {/* <TaskCard/> */}
          <TaskCard taskName="Morning Meeting" startTime="7:00" endTime="9:00" />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Afternoon (12:00 - 6:59 PM)</Text>
          <TaskCard />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Night (7:00 - 11:59 PM)</Text>
          <TaskCard />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scrollView: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
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
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskTime: {
    fontSize: 14,
    color: "#888",
  },
  taskText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default CalendarPage;
