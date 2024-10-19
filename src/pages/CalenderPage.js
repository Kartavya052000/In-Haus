import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import TabsNavigation from "../components/TabsNavigators/TabsNavigation";
import TaskCard from "../components/CardComponent/TaskCard";
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from "@apollo/client"; // Use useLazyQuery to control when query is triggered
import { GET_GROUP, GET_USER_TASK } from '../graphql/mutations/taskMutations';
import * as SecureStore from 'expo-secure-store';  // Import SecureStore



const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [token, setToken] = useState(null); // Add state for token
  const navigation = useNavigation();
const [members,setMembers] = useState([]);
const [tasks,setTasks] = useState([]);
const [groupId,setGroupId] = useState('')
  // Define lazy query for GET_GROUP
  const [fetchGroup, { loading, error, data }] = useLazyQuery(GET_GROUP, {
    onCompleted: (data) => {
      const transformedMembers = data.getGroup.members.map((member) => ({
        name: member.username,
        id:member.id
      }));
      setTasks(data.getGroup.filteredTasks)
      setMembers(transformedMembers); 
      setGroupId(data.getGroup.id)  
      console.log(data.getGroup.id,"GROUPPP")
      // console.log(members);
       
     },
    onError: (error) => {
      console.error('Error fetching group:', error.message);
    },
  });
  // function to get user task individual
  const [fetchUserTask, { loading: userTaskLoading, error: userTaskError, data: userTaskData }] = useLazyQuery(GET_USER_TASK, {
  onCompleted: (data) => {
    console.log(data, "IMAAA");
    setTasks(data.getUserTasksInGroup.filteredTasks);
  },
  onError: (error) => {
    console.error('Error fetching user tasks:', error.message);
    // Optionally: set an error state here for UI feedback
  },
});
// Function to retrieve the stored token
const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      setToken(token);
fetchGroupData(token)
      return token;
    }
    console.log('No token found');
    return null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    Alert.alert('Retrieval Error', 'Failed to retrieve authentication token.');
    return null;
  }
};
  // Fetch token and then trigger query
  const fetchGroupData = async (token) => {
    if (token) {
      fetchGroup({
        context: {
          headers: {
            Authorization: `${token}`, // Use token in headers
          },
        },
        variables: {
          groupID: "test", // Replace with actual groupID if necessary
        },
      });
    }
  };
// fetch user data tasks
const fetchUserData = async (token,userId) => {
  console.log(token, "III", groupId); // Ensure groupId is defined in scope
  if (token) {
    fetchUserTask({
      context: {
        headers: {
          Authorization: `${token}`, // Use token in headers
        },
      },
      variables: {
        groupId: groupId, // Make sure groupId is initialized and valid
        userId
      },
    });
  }
};
  useEffect(() => {
    getToken(); // Fetch group data on component mount
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data: {error.message}</Text>;

  const handleTabChange = (tabName) => {
    setActiveTab(tabName.name);
    console.log(tabName.name,"+++++")
    if(tabName.name=='All'){
      fetchGroupData(token)
    }else{
      fetchUserData(token,tabName.id)
    }
  };

  const handleClick = () => {
    navigation.navigate('CreateTaskEvent');
  };

  // const users = [
  //   { name: "Molly" },
  //   { name: "Fred" },
  //   { name: "George" },
  //   { name: "Ron" },
  // ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.createButton} onPress={handleClick}>
          <Text style={styles.saveText}>Create</Text>
        </TouchableOpacity>
      </View>

      <TabsNavigation
        users={members}
        activeColor="black"
        inactiveColor="gray"
        onTabChange={handleTabChange}
      />

      <ScrollView style={styles.scrollView}>
      {tasks?.map((data) => (
  <View key={data.id}> 
    {/* <Text style={styles.sectionTitle}>Morning (05:00 - 11:59 AM)</Text> */}
    <TaskCard taskName={data.taskName} startTime={data.startDate} endTime={data.endDate} id={data.id}/>
  </View>
))}

        
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
  scrollView: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CalendarPage;
