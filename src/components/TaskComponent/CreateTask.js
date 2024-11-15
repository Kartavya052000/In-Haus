import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLazyQuery, useMutation } from "@apollo/client";
import InputField from "../Inputs/InputField";
import Dropdown from "../Dropdown/Dropdown";
import DropDownTask from "../Dropdown/DropDownTask";
import DateTimeComponent from "../DateTime/DateTimeComponent";
import { CREATE_TASK } from "../../graphql/mutations/taskMutations";
import { GET_GROUP } from "../../graphql/mutations/taskMutations";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import Typography from "../typography/Typography";
import PrimaryButton from "../buttons/PrimaryButton";
import CategorySelection from "../CategoryComponent/CategorySelection";
import CategorySelectionEvent from "../CategoryComponent/CategotySelectionEvent";
import Voice from '@react-native-voice/voice';
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const CreateTask = (activetab) => {
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [category, setCategory] = useState("");
  const [assignedTo, setAssignedTo] = useState(null);
  const [points, setPoints] = useState(100);
  const [repeat, setRepeat] = useState("Never");
  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [recognizeText, setRecognizeText] = useState("");
  const [showAnimation, setShowAnimation] = useState(false); // New state for animation visibility

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
          setAuthToken(token);
          fetchGroupData(token);
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
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = stopListening;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = () => {
    console.log("recording started");
  };

  const onSpeechResultsHandler = (event) => {
    const text = event.value[0];
    setRecognizeText(text);
  };

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      console.log("recording stopped");
      // if (recognizeText) {
    let text = "add a task as cleaning dishes to Mateo in a category of cleaning with a start date and time to 15 November 12 am to 15 November 12:30 am with reward points of 10";

      // }
      setIsListening(false);
      
      // Show animation for 2 seconds
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        extractDetailsFromSpeech(text); // Call extraction after speech ends

      }, 2000);
      
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    // let text = "add a task as cleaning dishes to Mateo in a category of cleaning with a start date and time to 15 November 12 am to 15 November 12:30 am with reward points of 10";
    // extractDetailsFromSpeech(text);
    console.log(startDateTime,"startDT")
    console.log(endDateTime,"endDT")
  }, [startDateTime,endDateTime]);

  const extractDetailsFromSpeech = (text) => {
    let taskName = "";

    const taskNameMatch = text.match(/add a task as (.+?) to/i);
    if (taskNameMatch) {
      taskName = taskNameMatch[1].trim();
      setTitle(taskName);
      console.log("Parsed task name:", taskName);
    }

    const nameMatch = text.match(/to (\w+)/i);
    if (nameMatch) {
      const name = nameMatch[1];
      const member = members.find(member => member.username.toLowerCase() === name.toLowerCase());
      if (member) {
        const assignedTo = member.id;
        setAssignedTo(assignedTo);
      } else {
        console.log("No matching member found for:", name);
      }
    } else {
      console.log("Name not found");
    }

    const dateMatch = text.match(/(\d{1,2} \w+ \d{1,2} (?:AM|PM)) to (\d{1,2} \w+ \d{1,2}(?::\d{2})? (?:AM|PM))/i);
    if (dateMatch) {
      const start = parseDate(dateMatch[1]);
      const end = parseDate(dateMatch[2]);
      // console.log(dat)
      setStartDateTime(start);
      setEndDateTime(end);
    } else {
      console.log("Could not extract date and time from speech");
    }

    const rewardPointsMatch = text.match(/reward points of (\d+)/i);
    if (rewardPointsMatch) {
      const rewardPoints = parseInt(rewardPointsMatch[1], 10);
      setPoints(rewardPoints);
    } else {
      console.log("Reward points not found");
    }
  };

  const parseDate = (dateStr) => {
    const months = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 };
    
    const dateTimeMatch = dateStr.match(/(\d{1,2}) (\w+) (\d{1,2})(?::(\d{2}))? (AM|PM)/i);
    if (!dateTimeMatch) {
      return null;
    }

    const [_, day, month, hour, minutes = '0', period] = dateTimeMatch;

    let hour24 = parseInt(hour, 10);
    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }

    const year = new Date().getFullYear();
    const date = new Date(year, months[month], parseInt(day, 10), hour24, parseInt(minutes, 10), 0);
    return date;
  };

  const [createTask] = useMutation(CREATE_TASK);
  const [fetchGroup, { data }] = useLazyQuery(GET_GROUP, {
    onCompleted: (data) => {
      setMembers(data.getGroup.members);
    },
    onError: (error) => {
      console.error("Error fetching group:", error.message);
    },
  });

  const fetchGroupData = async (token) => {
    fetchGroup({
      context: {
        headers: {
          Authorization: `${token}`,
        },
      },
      variables: {
        groupID: "test",
      },
    });
  };

  const handleSave = async () => {
    try {
      const startDateTimeISO = startDateTime.toISOString();
      const endDateTimeISO = endDateTime.toISOString();
      let variables = {};

      if (activetab.activeTab === "Task") {
        variables = {
          taskName: title,
          startDate: startDateTimeISO,
          endDate: endDateTimeISO,
          repeat: repeat,
          assignedTo: assignedTo,
          points: points,
          category: category,
          type: "task",
        };
      } else {
        variables = {
          taskName: title,
          startDate: startDateTimeISO,
          endDate: endDateTimeISO,
          repeat: repeat,
          assignedTo: assignedTo,
          description: description,
          category: category,
          type: "event",
        };
      }

      const response = await createTask({
        variables,
        context: {
          headers: {
            Authorization: authToken ? `${authToken}` : "",
          },
        },
      });
      Alert.alert(activetab.activeTab + " Saved Successfully");
      navigation.navigate("CalenderPage");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <>
      {showAnimation && (
      <View style={styles.overlayContainer}>
      <View style={styles.overlay}>
        <LottieView
          autoPlay
          loop={false}
          style={styles.animation}
          source={require('../../../assets/animations/wave.json')} // Replace with your Lottie file
        />
      </View>
    </View>
      )}
      <View style={styles.mainContentContainer}>
        <TouchableOpacity onPress={() => (isListening ? stopListening() : startListening())}>
          <View>
            <Ionicons name="mic" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopListening}>
          <View>
            <Text>Stop</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text>{recognizeText}</Text>
        </View>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.fieldContainer}>
            <InputField
              label="Task name"
              placeholder="Task Name"
              value={title}
              onChangeText={setTitle}
              style={styles.inputField}
              inputWidth={"100%"}
            />
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.dateTimeComponent}>
              <DateTimeComponent onDateTimeChange={(start, end) => {
                setStartDateTime(start);
                setEndDateTime(end);
              }} 
              startDateTime={startDateTime}
              endDateTime={endDateTime}/>
            </View>
          </View>

          {activetab.activeTab === "Task" && (
            <View style={styles.fieldContainer}>
              <CategorySelection onSelect={setCategory} />
            </View>
          )}

          {activetab.activeTab === "Event" && (
            <View style={styles.fieldContainer}>
              <CategorySelectionEvent onSelect={setCategory} />
            </View>
          )}

          <View style={styles.fieldContainer}>
            <Typography variant="SH4" style={styles.label}>Assign to</Typography>
            <DropDownTask
              options={members}
              selectedValue={assignedTo}
              onValueChange={setAssignedTo}
              labelExtractor={(item) => item.username}
              valueExtractor={(item) => item.id}
            />
          </View>

          {activetab.activeTab === "Task" && (
            <View style={styles.fieldContainer}>
              <Typography variant="SH4" style={styles.label}>Amount of Points</Typography>
              <InputField
                placeholder="Points"
                value={points.toString()}
                onChangeText={(value) => setPoints(Number(value) || 0)}
                style={styles.inputField}
                inputWidth={"100%"}
              />
            </View>
          )}
          {activetab.activeTab === "Event" && (
            <View style={styles.fieldContainer}>
              <Typography variant="SH4" style={styles.label}>Description</Typography>
              <InputField
                placeholder="Event description"
                value={description}
                onChangeText={setDescription}
                style={[styles.inputField, styles.textArea]}
                inputWidth={"100%"}
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.discardButton} onPress={() => console.log("Task discarded")}>
              <Text style={[styles.discardText, { color: "#476BFB" }]}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={[styles.saveText, { color: "#FFFFFF" }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    // Fullscreen overlay to cover the screen
    overlayContainer: {
      position: "absolute",  // Position overlay absolutely relative to the screen
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
      zIndex: 1000, // Ensure the overlay appears on top of all components
    },
    overlay: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",  // Full width of the screen
      height: "100%",  // Full height of the screen
    },
    animation: {
      width: 200, // Set the size of the animation
      height: 200, // Set the size of the animation
    },
  mainContentContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
  },
  container: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  inputField: {
    width: "100%",
  },
  label: {
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  discardButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  discardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#476BFB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  animationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  fullScreenAnimation: {
    width: "100%",
    height: "100%",
  },
});

export default CreateTask;