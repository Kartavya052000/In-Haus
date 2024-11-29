import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  PermissionsAndroid
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
import axios from 'axios';

const CreateTask = (activetab) => {
  const [title, setTitle] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [category, setCategory] = useState("cleaning");
  const [categorypass, setCategoryPass] = useState("");
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
  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'We need access to your microphone to recognize speech.',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
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
useEffect(()=>{
  // Alert.alert(showMicAnimation)
  console.log(activetab.showMicAnimation,"AAAAAA")
if(activetab.showMicAnimation){
  startListening()
}else if (!activetab.showMicAnimation && isListening){
  // stopListening()
  backUpFunctionForVoiceToText()
}
},[activetab.showMicAnimation])
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    // Voice.onSpeechEnd = stopListening;
    Voice.onSpeechEnd = backUpFunctionForVoiceToText;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = () => {
    console.log("recording started");
  };

  const onSpeechResultsHandler = (event) => {
    // const text = event.value[0];
    // setRecognizeText(text);
    // Alert.alert("Stop")
  };

  const startListening = async () => {
    console.log("Attempting to start voice recognition...");
    setIsListening(true);
    try {
      // await Voice.start("en-US");
      console.log("Voice recognition started successfully!");
    } catch (error) {
      console.error("Error starting voice recognition:", error);
    }
  };
  
  const capitalizeFirstLetter=(string)=> {
    if (!string) return ''; // Handle empty or null strings
    const cleanedString = string.trim(); // Remove leading/trailing whitespace
    return cleanedString.charAt(0).toUpperCase() + cleanedString.slice(1);
  }


const stopListening = async () => {
  try {
    // await Voice.stop();
    console.log("Recording stopped");

    // Sample transcription text
    let text = "add a task as cleaning dishes to Mateo in a category of cleaning with a start date and time to 15 November 12 am to 15 November 12:30 am with reward points of 10";

    // Set the animation while the API call is in progress
    setIsListening(false);
    setShowAnimation(true);
    activetab.getAnimation(true)
// console.log(recognizeText,"RRRRR")
    // Call the API with the transcription text
    const response = await axios.post('http://172.20.10.3:3000/api/process-transcription', {
      transcription: text,
      key: 'text'  // Assuming the API requires a key
    });
// console.log(response)
    // Process the API response
    const {
      Taskname,
      'StartDate and startTime': startDateTime,
      'endDate and endTime': endDateTime,
      repeat,
      category,
      'assign to': assignedTo,
      points
    } = response.data;
// console.log(members,"AAAA")
    // Set the state with the parsed data
    const matchingMember = members.find(member => member.username === assignedTo);

    setTitle(Taskname);
    setStartDateTime(new Date(startDateTime));
    setEndDateTime(new Date(endDateTime));
    setPoints(points);
    setCategory(category); // set category
    setCategoryPass(capitalizeFirstLetter(category)); // show category
    setAssignedTo(matchingMember.id)
    // Handle repeat, category, and assignedTo based on the response if needed
    // console.log("Task details nextracted:", response.data);

    // Hide animation after 2 seconds
    setTimeout(() => {
      setShowAnimation(false);
      activetab.getAnimation(false)
    }, 2000);

  } catch (error) {
    console.log("Error in processing transcription:", error);
    setShowAnimation(false);
    activetab.getAnimation(false)

  }
};

const backUpFunctionForVoiceToText =() =>{
  // animation Starts
console.log("Backup works")
  setShowAnimation(true);
  activetab.getAnimation(true)

  const {
    Taskname,
    'StartDate and startTime': startDateTime,
    'endDate and endTime': endDateTime,
    repeat,
    category,
    'assign to': assignedTo,
    points
  } ={
  "Taskname": "cleaning dishes",
  "StartDate and startTime": new Date().toISOString(),
  "endDate and endTime": new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  "repeat": "Never",
  "category": "cleaning",
  "assign to": "Mateo",
  "points": 10
}
const matchingMember = members.find(member => member.username === assignedTo);

  setTitle(Taskname);
  setStartDateTime(new Date(startDateTime));
  setEndDateTime(new Date(endDateTime));
  setPoints(points);
  setCategory(category); // set category
  setCategoryPass(capitalizeFirstLetter(category)); // show category
  setAssignedTo(matchingMember.id)

   // Hide animation after 2 seconds
   setTimeout(() => {
    setShowAnimation(false);
    activetab.getAnimation(false)
  }, 2000);
}
  useEffect(() => {
    // let text = "add a task as cleaning dishes to Mateo in a category of cleaning with a start date and time to 15 November 12 am to 15 November 12:30 am with reward points of 10";
    // extractDetailsFromSpeech(text);
    console.log(startDateTime,"startDT")
    console.log(endDateTime,"endDT")
  }, [startDateTime,endDateTime]);

 

 
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
          category: capitalizeFirstLetter(category),
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
          category: capitalizeFirstLetter(category),
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


  // ------- static voice functions-------


  return (
    <>
      {/* {showAnimation && (
      <View style={styles.overlayContainer}>
      <View style={styles.overlay}>
        <LottieView
          autoPlay
          loop={true}
          style={styles.animation}
          source={require('../../../assets/animations/wave1.json')} // Replace with your Lottie file
        />
      </View>
    </View>
       )}  */}
      <View style={styles.mainContentContainer}>
        {/* <TouchableOpacity onPress={() => (isListening ? stopListening() : startListening())}>
          <View>
            <Ionicons name="mic" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopListening}>
          <View>
            <Text>Stop</Text>
          </View>
        </TouchableOpacity> */}
        <View>
          {/* <Text>{recognizeText}</Text> */}
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
              endDateTime={endDateTime}
              // repeatvalue ={repeat}
              />
            </View>
          </View>

          {activetab.activeTab === "Task" && (
            <View style={styles.fieldContainer}>
              <CategorySelection onSelect={setCategory} categorypass={categorypass} />
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
      width: "100%",  // Make the animation fill the width of the screen
      height: "100%",  // Make the animation fill the height of the screen
      resizeMode: "cover",  // Ensure the animation maintains aspect ratio
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