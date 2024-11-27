import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import InputField from '../components/Inputs/InputField';
import Dropdown from '../components/Dropdown/Dropdown';
import DateTimeComponent from '../components/DateTime/DateTimeComponent';
import DropDownTask from '../components/Dropdown/DropDownTask'; // Assuming this is a dropdown for assigning to members
import DateTimeForRewards from '../components/DateTime/DateTimeForRewards';
import { useRoute } from '@react-navigation/native';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_GROUP } from '../graphql/mutations/taskMutations';
import * as SecureStore from 'expo-secure-store'; 
import CatDropdown from '../components/Dropdown/CatDropDown';
import Typography from "../components/typography/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { BackIcon } from "../components/icons/icons";
import { CREATE_REWARD } from '../graphql/mutations/rewardsMutations';
import { Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
import Colors from "../components/Colors/Colors";


export default function CreateRewards() {
  const [rewardName, setRewardName] = useState('Reward01');
  const [rewardPoints, setRewardPoints] = useState(100);
  const [assignedTo, setAssignedTo] = useState(null);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const route = useRoute(); // Get the route object
  const navigation = useNavigation(); 
  const { text } = route.params|| {}; // Destructure taskId from route.params
  const [authToken, setAuthToken] = useState(null);
  const [members,setMembers] = useState([]);
  const [createReward, { loading: taskLoading, error: taskError, data: taskData }] = useMutation(CREATE_REWARD);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    // Handle the save logic here if needed
    console.log({
      rewardName,
      rewardPoints,
      assignedTo,
      expiryDate,
      category
    });

    const expiryDateISO = expiryDate.toISOString();
    let variables={}
      variables= {
        name: rewardName,
        pointsAssigned: rewardPoints,
        assignedTo: assignedTo,
        expiryDate: expiryDateISO,
        assignedTo: assignedTo, 
        category:category
      }
      console.log(variables,"variables")
      const response = await createReward({
        variables,
           context: {
             headers: {
               Authorization: authToken ? `${authToken}` : '',
             },
           },
         });
Alert.alert(" Reward Created Successfully")
console.log("Task saved:", response.data);

  };
  useEffect(() => { 
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken'); 
        if (token) {
          setAuthToken(token);
          fetchGroupData(token)
          console.log('Token retrieved:', token);
        } else {
          console.error('No auth token found');
        }
      } catch (error) {
        console.error('Error retrieving auth token:', error);
      }
    };

    getToken();
  }, []);
  const [fetchGroup, { loading, error, data }] = useLazyQuery(GET_GROUP, {
    onCompleted: (data) => {
      // console.log(data.getGroup.members);
            setMembers(data.getGroup.members);  
       
     },
    onError: (error) => {
      console.error('Error fetching group:', error.message);
    },
  });
  const fetchGroupData = async (token) => {
    fetchGroup({
      context: {
        headers: {
          Authorization: `${token}`, // Use token passed as argument
        },
      },
      variables: {
        groupID: "test", // Replace with actual groupID if necessary
      },
    });
  };

  
  
  return (
    
       <View style={styles.container}>
       <LinearGradient
        colors={["rgba(255, 223, 247, 1)", "rgba(253, 183, 235, 1)"]}
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
            <BackIcon color="#FFFFFF" style={styles.addIcon} />
          </View>
        </TouchableOpacity>
        <Typography
          variant="H4"
          style={[
            styles.headerTitle,
            { textAlign: "center", color: "#891E6E" },
          ]}
        >
          Add Reward
        </Typography>
      </View>
    <View style={styles.mainContentContainer}>
    <ScrollView style={styles.containerIn} showsVerticalScrollIndicator={false}>

      {/* Reward Name */}
      <InputField
        label="Reward Name"
        placeholder="Enter reward name"
        value={rewardName}
        onChangeText={setRewardName}
      />

      {/* Reward Points */}
      <InputField
        label="Reward Points"
        placeholder="Enter reward points"
        value={rewardPoints} // Convert number to string for InputField
        keyboardType="numeric"
        onChangeText={(value) => setRewardPoints(parseInt(value, 10))}
      />

      {/* Assigned To */}
      <View style={styles.fieldContainer}>
        <Typography style={styles.label}>Assign to</Typography>
      
          <DropDownTask
    options={members}
    selectedValue={assignedTo}
    onValueChange={(value) => {
      console.log('Selected user ID:', value); // Debugging log
      setAssignedTo(value);
    }}
    labelExtractor={(item) => item.username}
    valueExtractor={(item) => item.id}
  />
      </View>
    
      {/* Expiry Date */}
      <DateTimeForRewards
        label="Expiry Date"
        selectedDate={expiryDate}
        onDateTimeChange={() => setExpiryDate(expiryDate)}
      />

      {/* Category */}
      <View style={styles.fieldContainer}>
        <Typography style={styles.label}>Category</Typography>
        <CatDropdown
          options={['Shopping', 'Gift Cards', 'Coupons']}
          selectedValue={category}
          onValueChange={(value) => setCategory(value)} // Pass the selected value to setCategory
          />
      </View>

      <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.discardButton} onPress={() => console.log("Task discarded")}>
              <Typography style={[styles.discardText, { color: "#476BFB" }]}>Discard</Typography>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Typography style={[styles.saveText, { color: "#FFFFFF" }]}>Save</Typography>
            </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F2F2F2F",
  },
  contentContainer: {
    alignItems: "center",
    marginTop: height * 0.12,
    marginBottom: 20
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
    backgroundColor: Colors.Secondary.Pink[500],
  },
  addIcon: {
    marginBottom: -2,
  },
  mainContentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 30,
    // marginTop: 30,
    paddingTop: 10,
    paddingBottom: 20
  },
  containerIn: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    // marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 30,
  },
  discardButton: {
    borderColor: "#476BFB",
    borderWidth: 1,
    borderRadius: 8,
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
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});