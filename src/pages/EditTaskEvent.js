import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import OptionTabs from "../components/TabsNavigators/OptionTabs/OptionTabs"; 
import EditTask from "../components/TaskComponent/EditTask";
import EditEvent from "../components/EventComponent/EditEvent";
import Typography from "../components/typography/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { BackIcon } from "../components/icons/icons";
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get("window");
import Colors from "../components/Colors/Colors";

const CreateTaskEvent = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

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
          Edit
        </Typography>
      </View>
      <ScrollView>
          <EditTask />
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
});

export default CreateTaskEvent;
