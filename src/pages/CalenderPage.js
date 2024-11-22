import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";

import TabsNavigation from "../components/TabsNavigators/TabsNavigation";
import TaskCard from "../components/Cards/TaskCard";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery } from "@apollo/client";
import { GET_GROUP, GET_USER_TASK } from "../graphql/mutations/taskMutations";
import * as SecureStore from "expo-secure-store";
import Typography from "../components/typography/Typography";
import { AddIcon } from "../components/icons/icons";
// import TaskCalendar from "../components/calendar/TaskCalendar"
import CalendarComponent from "../components/calendar/CalendarComponent";
import Colors from "../components/Colors/Colors";
import { LinearGradient } from "expo-linear-gradient";
import BottomSwipeableDrawer from "../components/Drawer/BottomSwipeableDrawer";
const { height } = Dimensions.get("window");

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeTabId,setActiveTabId]=useState("");
  const [token, setToken] = useState(null);
const [isVisible,setIsVisible]=useState(false)

  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Define selectedDate state

  const navigation = useNavigation();
const [currentTask,setCurrentTask] = useState([])
  const [fetchGroup, { loading, error }] = useLazyQuery(GET_GROUP, {
    fetchPolicy: "network-only", // Forces fresh data fetch from network

    onCompleted: (data) => {
      const transformedMembers = data.getGroup.members.map((member) => ({
        name: member.username,
        id: member.id,
      }));
      console.log(data.getGroup);
      setTasks(data.getGroup.filteredTasks);
      setMembers(transformedMembers);
      setGroupId(data.getGroup.id);
    },
    onError: (error) => {
      console.error("Error fetching group:", error.message);
    },
  });


  const [fetchUserTask, { loading: userTaskLoading, error: userTaskError }] =
    useLazyQuery(GET_USER_TASK, {
    fetchPolicy: "network-only", // Forces fresh data fetch from network

      onCompleted: (data) => {
        console.log("Hit2", data.getUserTasksInGroup);


        setTasks(data.getUserTasksInGroup.filteredTasks);
      },
      onError: (error) => {
        console.error("Error fetching user tasks:", error.message);
      },
    });

  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        setToken(token);
        fetchGroupData(token);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      Alert.alert(
        "Retrieval Error",
        "Failed to retrieve authentication token."
      );
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
            startDate:selectedDate
          },
        
       
      });
    }
  };

  const fetchUserData = async (token, userId) => {
    console.log("Hit1");
    if (token && groupId) {
      fetchUserTask({
        context: {
          headers: {
            Authorization: `${token}`,

          },
        },
        variables: {
          groupId: groupId, // Include groupId variable
          userId: userId,
          startDate:selectedDate   // Include userId variable if required
        },
      });
      }
    };

  useEffect(() => {
    getToken();
  }, []);


   

  const handleTabChange = (tabName) => {
    setActiveTab(tabName.name);
    setActiveTabId(tabName.id);
    if (tabName.name === "All") {
      fetchGroupData(token);
    } else {
      fetchUserData(token, tabName.id);
    }
  };

  const handleClick = () => {
    navigation.navigate("CreateTaskEvent");
  };

  const handleEdit = (task) => {
    // Navigate to the EditTaskEvent screen
    navigation.navigate('EditTaskEvent', { task });
  };

  const handleMarkAsDone = (taskId) => {
    // Logic to mark the task as done

  };
  const fetchGroupDataWithDate = async (token,startDate) => {
    if (token) {
      fetchGroup({
        context: {
          headers: {
            Authorization: `${token}`,
          },
        },
        variables: {
          groupID: "test", 
          startDate
        },
      
     
    });
  }
};

useEffect(() => {
console.log(selectedDate)
fetchGroupDataWithDate(token,selectedDate)
},[selectedDate])
useEffect(()=>{
console.log(currentTask,"currentTask");
// fetchGroupData(token);
fetchUserData(token,activeTabId)
},[currentTask])
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(243, 245, 255, 1)", "rgba(199, 210, 255, 1)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      />
      <View style={styles.contentContainer}>
        <Typography
          variant="H4"
          style={[
            styles.headerTitle,
            { textAlign: "center", color: "#183AC1" },

          ]}
        >
          Calendar
        </Typography>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleClick()}
        >
          <View style={styles.addContainer}>

            <AddIcon color="#FFFFFF" style={styles.addIcon} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Calendar Section */}
      <View style={styles.calendarSection}>
        <CalendarComponent
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDayColor="#476BFB"
          eventDotColor="#00adf5"
          iconColor="#476BFB"
          themeColors={{
            backgroundColor: "#F2F2F2",
            calendarBackground: "#F2F2F2",
            todayTextColor: "#333",
            arrowColor: "#333",
            monthTextColor: "#000",
          }}
        />
      </View>

      {/* Tabs and Task Cards */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabsWrapper}>
          <TabsNavigation
            users={members}
            activeColor="black"
            inactiveColor="gray"
            onTabChange={handleTabChange}
          />
        </View>
     
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.taskCardsContainer}
          showsVerticalScrollIndicator={false}
        >
                  {tasks && tasks.length > 0 ? (
          tasks?.map((task, index) => {
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
                  onEdit={() => handleEdit(task)} 
                  onMarkAsDone={() => handleMarkAsDone(task.id)}
                  taskNameColor={Colors.Secondary.Navy[400]}
                  timeColor={Colors.Secondary.Navy[400]}
                  backgroundColor={Colors.Secondary.Navy[100]}
                  borderColor={Colors.Secondary.Navy[400]}
                  selectedCategory={task.category}
                  setIsVisible={setIsVisible}
                  setCurrentTask={setCurrentTask}
                />
              </View>
            );
          })): (
            <Typography variant="SH4" style={styles.noTasksMessage}>
              No tasks for today
            </Typography>
          )}
        </ScrollView>

      </View>
      {isVisible && (
      <BottomSwipeableDrawer isVisible={isVisible} setIsVisible={setIsVisible} Details={currentTask}  />
        
      )}
      
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingVertical: 24,
    backgroundColor: "#F2F2F2",
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 60,
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
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },
  calendarSection: {
    // height: 30,
    // minHeight: 100,
    // felx: 1,
    marginTop:30,
    marginBottom:20
    // marginVertical: 20,

  },
  tabsContainer: {
    // alignItems: "center",
    flex: 1,
    width: "100%",
    marginVertical: 0,
  },
  tabsWrapper: {
    paddingBottom: 16,
  },
  addIcon: {
    marginBottom: -2,
  },
  addButton: {
    position: "absolute",
    right: 0,
    top: -10,
  },
  addContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Primary.Brand[400],
  },
  // scrollView: {
  //   // flex: 1,
  //   padding: 16,
  // },
  taskCardsContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  taskSection: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  headerBackground: {
    height: height * 0.19,
    left: 0,
    position: "absolute",
    top: 0,
    width: "120%",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },
  noTasksMessage: {
    height: 800,
    marginVertical:200,
    flex: 1, // Takes up the remaining space
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
    textAlign: "center", // Centers the text within the Text component
    color: "#333", // Optional: for styling text color
  },
});

export default CalendarPage;
