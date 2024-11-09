  // Haus.js
  import React, { useEffect, useState } from 'react';
  import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import OptionTabs from '../../components/TabsNavigators/OptionTabs/OptionTabs';
  import CalendarGraph from '../calendar/calendarGraph';
  import Typography from '../typography/Typography';
  import RewardsCards1 from '../Cards/RewardsCards1';
  const { height } = Dimensions.get('window');
  import * as SecureStore from 'expo-secure-store'; 
import { useLazyQuery } from '@apollo/client';
import { MY_PROFILE } from '../../graphql/mutations/authMutations';
import { GET_MY_TASK } from '../../graphql/mutations/taskMutations';
import Colors from "../../components/Colors/Colors";
import TaskCard from '../Cards/TaskCard';

  // Example data for each tab
  const taskDataDashboard = [
    { day: 'Sun', tasksAssigned: 10, tasksCompleted: 7 },
    { day: 'Mon', tasksAssigned: 5, tasksCompleted: 2 },
    { day: 'Tue', tasksAssigned: 8, tasksCompleted: 8 },
    { day: 'Wed', tasksAssigned: 6, tasksCompleted: 4 },
    { day: 'Thu', tasksAssigned: 9, tasksCompleted: 9 },
    { day: 'Fri', tasksAssigned: 7, tasksCompleted: 7 },
    { day: 'Sat', tasksAssigned: 4, tasksCompleted: 3 },
  ];

  const taskDataFamily = [
    { day: 'Sun', tasksAssigned: 6, tasksCompleted: 3 },
    { day: 'Mon', tasksAssigned: 4, tasksCompleted: 1 },
    { day: 'Tue', tasksAssigned: 7, tasksCompleted: 5 },
    { day: 'Wed', tasksAssigned: 6, tasksCompleted: 3 },
    { day: 'Thu', tasksAssigned: 8, tasksCompleted: 6 },
    { day: 'Fri', tasksAssigned: 5, tasksCompleted: 4 },
    { day: 'Sat', tasksAssigned: 3, tasksCompleted: 2 },
  ];

  // Placeholder options until the database is connected
  const optionsFromDatabase = [
    { name: 'My dashboard' },
    { name: 'Family' }
  ];

  export default function Haus() {
    const [selectedTab, setSelectedTab] = useState(optionsFromDatabase[0].name);
    const [token,setToken]=useState('')
    const [rewardPoints,setRewardPoints]=useState(0)
    const [tasks, setTasks] = useState([]);
    const [isVisible,setIsVisible]=useState(false)
    const [currentTask,setCurrentTask] = useState([])

    const handleTabChange = (optionName) => {
      setSelectedTab(optionName);
    };
    useEffect(() => { 
      const getToken = async () => {
        try {
          const token = await SecureStore.getItemAsync('authToken'); 
          const points = await SecureStore.getItemAsync('points'); 
          if(points){
            setRewardPoints(points)
          }
          if (token) {
            setToken(token);
            fetchPoints(token)
            fetchUserData(token)
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
    const [fetchUserPoints, { loading, error }] = useLazyQuery(MY_PROFILE, {
      fetchPolicy: "network-only", // Forces fresh data fetch from network
  
      onCompleted: (data) => {
        console.log("+++++++++++",data.myProfile.points)
        setRewardPoints(data.myProfile.points)  
      },
      onError: (error) => {
        console.error('Error fetching group:', error.message);
      },
    });
    const [fetchTask, { loading: userTaskLoading, error: userTaskError }] =
    useLazyQuery(GET_MY_TASK, {
    fetchPolicy: "network-only", // Forces fresh data fetch from network

      onCompleted: (data) => {
        console.log("Hit2", data.getMyTasksInGroup);


        setTasks(data.getMyTasksInGroup.filteredTasks);
      },
      onError: (error) => {
        console.error("Error fetching user tasks:", error.message);
      },
    });
    const fetchPoints = async (token) => {
      if (token) {
        fetchUserPoints({
          context: {
            headers: {
              Authorization: `${token}`,
            },
          },
        });
      }
    };
    const fetchUserData = async (token, userId) => {
      console.log("Hit1");
      if (token ) {
        fetchTask({
          context: {
            headers: {
              Authorization: `${token}`,
  
            },
          }
         
        });
        }
      };
    // Determine the data to display based on the selected tab
    const taskData = selectedTab === 'My dashboard' ? taskDataDashboard : taskDataFamily;

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(135, 99, 233, 0.0)', 'rgba(154, 133, 233, 0.8)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.headerBackground}
        />
        <View style={styles.contentContainer}>
          <Typography 
            variant="H5" 
            color={Colors.Secondary.Purple[500]}
            align="center"
            style={styles.headerText}
          >
            Dashboard
          </Typography>
          
          <OptionTabs
            options={optionsFromDatabase}
            containerColor={Colors.Secondary.Purple[100]}
            activeColor={'#F4EFFA'}
            textColor={Colors.Primary.Purple}
            onTabChange={handleTabChange}
          />
        {/* Pass taskData to CalendarGraph */}
        <View style={styles.graphContainer}>
          <CalendarGraph data={taskData} iconColor={Colors.Primary.Success[300]} />
          <RewardsCards1  currentPoints={rewardPoints}/>
        </View>
      
        </View>  
          <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.taskCardsContainer}
          showsVerticalScrollIndicator={false}
        >
          <Typography variant="SH3" style={styles.taskSectionHeading} >Today's Tasks</Typography>
        {tasks?.map((task, index) => {
            // Parse ISO string to Date objects
            const startDate = new Date(task.startDate);
            const endDate = new Date(task.endDate);

            // Format dates into readable time format 
            const startTimeFormatted = startDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            const endTimeFormatted = endDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <View key={task.id} style={styles.taskSection}>
                <TaskCard
                task={task}
                id={task.id}
                  taskName={task.taskName}
                  startTime={startTimeFormatted}
                  endTime={endTimeFormatted}
                  // onEdit={() => handleEdit(task)} 
                  // onMarkAsDone={() => handleMarkAsDone(task.id)}
                  taskNameColor={Colors.Secondary.Navy[400]}
                  timeColor={Colors.Secondary.Navy[400]}
                  backgroundColor={Colors.Secondary.Navy[100]}
                  borderColor={Colors.Secondary.Navy[400]}
                  setIsVisible={setIsVisible}
                  setCurrentTask={setCurrentTask}
                />
              </View>
            );
          })}
        </ScrollView>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
    },
    taskCardsContainer: {
      backgroundColor: "#fff",
      borderRadius: 16,
      paddingTop: 8,
      paddingBottom: 8,
      marginHorizontal:16,
      marginTop:16,
      paddingHorizontal:16
    },
    taskSectionHeading:{
marginBottom: 12,
    },
    headerBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: height * 0.19,
    },
    contentContainer: {
      marginTop: height * 0.12,
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    headerText: {
      marginBottom: 20,
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 28,
    },
    graphContainer: {
      paddingTop: 20,
    },
  });
