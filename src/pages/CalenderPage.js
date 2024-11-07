import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, Platform, StatusBar } from "react-native";
import TabsNavigation from "../components/TabsNavigators/TabsNavigation";
import TaskCard from "../components/CardComponent/TaskCard";
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from "@apollo/client"; 
import { GET_GROUP, GET_USER_TASK } from '../graphql/mutations/taskMutations';
import * as SecureStore from 'expo-secure-store';  
import Typography from "../components/typography/Typography";
import { AddIcon } from "../components/icons/icons";
import TaskCalendar from "../components/calendar/TaskCalendar";

  const CalendarPage = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [token, setToken] = useState(null);
    const [members, setMembers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [groupId, setGroupId] = useState('');
    
    const navigation = useNavigation();
    
    const [fetchGroup, { loading, error }] = useLazyQuery(GET_GROUP, {
      onCompleted: (data) => {
        const transformedMembers = data.getGroup.members.map((member) => ({
          name: member.username,
          id: member.id
        }));
        console.log(data.getGroup)
        setTasks(data.getGroup.filteredTasks);
        setMembers(transformedMembers); 
        setGroupId(data.getGroup.id);  
      },
      onError: (error) => {
        console.error('Error fetching group:', error.message);
      },
    });

    const [fetchUserTask, { loading: userTaskLoading, error: userTaskError }] = useLazyQuery(GET_USER_TASK, {
      onCompleted: (data) => {
      console.log("Hit2",data.getUserTasksInGroup)

        setTasks(data.getUserTasksInGroup.filteredTasks);
      },
      onError: (error) => {
        console.error('Error fetching user tasks:', error.message);
      },
    });

    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          setToken(token);
          fetchGroupData(token);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
        Alert.alert('Retrieval Error', 'Failed to retrieve authentication token.');
      }
    };

    const fetchGroupData = async (token) => {
      if (token) {
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
      }
    };

    const fetchUserData = async (token, userId) => {
      console.log("Hit1")
      if (token && groupId) {
        fetchUserTask({
          context: {
            headers: {
              Authorization: `${token}`,
            },
          },
          variables: {
            groupId: groupId,
            userId,
          },
        });
      }
    };

    useEffect(() => {
      getToken(); 
    }, []);

    // useEffect(() => {
    //   if (token && groupId) {
    //     fetchUserData(token, tabId); // Handle appropriate user ID based on the tab.
    //   }
    // }, [groupId]);

    if (loading || userTaskLoading) return <Text>Loading...</Text>;
    if (error || userTaskError) return <Text>Error fetching data: {error?.message}</Text>;

    const handleTabChange = (tabName) => {
      setActiveTab(tabName.name);
      if (tabName.name === 'All') {
        fetchGroupData(token);
      } else {
        fetchUserData(token, tabName.id);
      }
    };

    const handleClick = () => {
      navigation.navigate('CreateTaskEvent');
    };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography variant="H4" style={styles.headerTitle}>Calendar</Typography>
        <TouchableOpacity style={styles.addMealButton} onPress={handleClick}>
          <View style={styles.addMealContent}>
            <Typography variant="Body" style={styles.addMealText}>Create</Typography>
            <AddIcon style={styles.addIcon} />
          </View>
        </TouchableOpacity>
     
      </View>
      <View style={styles.taskCalendar}>
      <TaskCalendar
              markedDates={{}} // Placeholder for marked dates
              activities={[]} // Placeholder for activities
              themeColors={{ primary: '#000', arrowColor: '#000', monthTextColor: '#000' }} // Example theme colors
              selectedDate={new Date()} // Pass selectedDate to CalendarComponent
            />
              
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
            <TaskCard taskName={data.taskName} startTime={data.startDate} endTime={data.endDate} id={data.id} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 16,
  },
  taskCalendar:{
    height:400,
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  addMealButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  addMealContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2,
  },
  addMealText: {
    lineHeight: 17,
  },
  addIcon: {
    marginBottom: -2,
  },
  scrollView: {
    padding: 16,
  },
});

export default CalendarPage;
