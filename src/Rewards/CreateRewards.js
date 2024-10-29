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
import { CREATE_REWARD } from '../graphql/mutations/rewardsMutations';

export default function CreateRewards() {
  const [rewardName, setRewardName] = useState('Reward01');
  const [rewardPoints, setRewardPoints] = useState(100);
  const [assignedTo, setAssignedTo] = useState(null);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const route = useRoute(); // Get the route object
  const { text } = route.params; // Destructure taskId from route.params
  const [authToken, setAuthToken] = useState(null);
  const [members,setMembers] = useState([]);
  const [createReward, { loading: taskLoading, error: taskError, data: taskData }] = useMutation(CREATE_REWARD);

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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{!text?"Create Reward":"Edit Reward"}</Text>

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
        value={rewardPoints.toString()} // Convert number to string for InputField
        keyboardType="numeric"
        onChangeText={(value) => setRewardPoints(parseInt(value, 10))}
      />

      {/* Assigned To */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Assign to</Text>
      
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
        <Text style={styles.label}>Category</Text>
        <CatDropdown
          options={['Shopping', 'Gift Cards', 'Coupons']}
          selectedValue={category}
          onValueChange={(value) => setCategory(value)} // Pass the selected value to setCategory
          />
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={handleSave}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#476BFB',
    borderRadius: 5,
    padding: 15,
    marginTop: 5,
  }, 
  cancelButton: {
    backgroundColor: '#C7D2FF',
    borderRadius: 5,
    padding: 15,
    // marginTop: 5,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  cancelText:{
    // color:"#C7D2FF",
    fontSize: 16,
    textAlign: 'center',
  }
});
