import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import OptionTabs from "../components/TabsNavigators/OptionTabs/OptionTabs"; 
import CreateEvent from "../components/EventComponent/CreateEvent"; 
import CreateTask from "../components/TaskComponent/CreateTask";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "../components/typography/Typography";
import { AddIcon } from "../components/icons/icons";
import { BackIcon } from "../components/icons/icons";
import Colors from "../components/Colors/Colors";
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get("window");


const CreateTaskEvent = () => {
  const [activeTab, setActiveTab] = useState("Task");
  const navigation = useNavigation();

  // Handle tab change (Task or Event)
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    console.log("Active Tab:", tabName);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const optionsFromDatabase = [{ name: "Task" }, { name: "Event" }];
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(243, 245, 255, 1)", "rgba(199, 210, 255, 1)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      />
      <View style={styles.contentContainer}>
      <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleBack()}
        >
          <View style={styles.addContainer}>
            <BackIcon color="#183AC1" style={styles.addIcon} />
          </View>
        </TouchableOpacity>
        <Typography
          variant="H4"
          style={[
            styles.headerTitle,
            { textAlign: "center", color: "#183AC1" },
          ]}
        >
          Create
        </Typography>
      </View>

         {/* Option Tabs Section */}
         <View style={styles.optionTabsContainer}>
          <OptionTabs
            options={optionsFromDatabase}
            containerColor={Colors.Secondary.Gray[100]} // Cambia el color del contenedor
            activeColor={"#DEE3FA"} // Color activo igual que en `Haus`
            inactiveColor={"#FFF"} // Color inactivo si es necesario (opcional)
            textColor={Colors.Primary.Purple} // Color de texto igual que en `Haus`
            onTabChange={handleTabChange} // Manejador de cambio de pestaña
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}> 
        {/* Display Content Based on Selected Tab */}
        {/* {activeTab === "Task" ? (
          <CreateTask />
        ) : (
          <CreateEvent />
        )} */}
        <CreateTask activeTab={activeTab} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F2F2F2",
  },
  contentContainer: {
    alignItems: "center",
    marginTop: height * 0.12,
  },
  headerBackground: {
    height: height * 0.19,
    left: 0,
    position: "absolute",
    top: 0,
    width: "120%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },
  addButton: {
    position: "absolute",
    left: 0,
    top: -10,
  },
  addContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  addIcon: {
    marginBottom: -2,
  },
  optionTabsContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
});

export default CreateTaskEvent;
