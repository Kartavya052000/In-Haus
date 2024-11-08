// import React from 'react';
// import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
// import { Swipeable } from 'react-native-gesture-handler';
// import Typography from '../../components/typography/Typography';
// import Colors from '../../components/Colors/Colors';
// import { FontAwesome } from '@expo/vector-icons';

// const TaskCard = ({
//   taskName,
//   startTime,
//   endTime,
//   assignedTo,
//   onDelete,
//   onPress,
//   taskNameColor,
//   infoColor, // Use a single color for the info text
//   backgroundColor,
//   borderColor,
// }) => {

//   const renderLeftActions = (progress, dragX) => {
//     const scale = dragX.interpolate({
//       inputRange: [0, 100],
//       outputRange: [0, 1],
//       extrapolate: 'clamp',
//     });

//     return (
//       <View style={[styles.deleteButtonContainer, { height: styles.filledCard.height }]}>
//         <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
//           <Animated.View style={{ transform: [{ scale }] }}>
//             <FontAwesome name="trash" size={24} color="#FFF" />
//           </Animated.View>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   // Concatenate the time and assignedTo with a '-'
//   const infoText = `${startTime} - ${endTime} - ${assignedTo}`;

//   return taskName ? (
//     <Swipeable renderLeftActions={renderLeftActions} containerStyle={{ height: styles.filledCard.height }}>
//       <TouchableOpacity
//         style={[
//           styles.card,
//           styles.filledCard,
//           { backgroundColor: backgroundColor || Colors.Secondary.Orange[100] }
//         ]}
//         onPress={onPress}
//       >
//         <View style={[styles.filledContent, { borderTopColor: borderColor }]}>
//           <View style={styles.icon} />
//           <View style={styles.textContainer}>
//             <Typography variant="SH3" color={taskNameColor} style={styles.taskName}>
//               {taskName}
//             </Typography>
//             <Typography variant="Caption" color={infoColor} style={styles.taskInfo}>
//               {infoText}
//             </Typography>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </Swipeable>
//   ) : (
//     <TouchableOpacity
//       style={[
//         styles.card,
//         styles.emptyCard,
//         { backgroundColor: backgroundColor || Colors.Secondary.Gray[100] }
//       ]}
//       // Uncomment the line below if you want to handle adding a new task
//       // onPress={onAddPress}
//     >
//       <Typography variant="SH4" color={taskNameColor} style={styles.addText}>
//         No Task
//       </Typography>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   emptyCard: {
//     height: 96,
//   },
//   filledCard: {
//     height: 72, // Adjusted height if needed
//   },
//   filledContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     margin: 16,
//     borderTopWidth: 2,
//     width: '95%',
//     padding: 12,
//   },
//   deleteButtonContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 80,
//     backgroundColor: '#ff0000',
//     borderTopLeftRadius: 12,
//     borderBottomLeftRadius: 12,
//   },
//   deleteButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//     width: '100%',
//   },
//   textContainer: {
//     flex: 1,
//   },
//   taskName: {
//     fontFamily: 'BostonRegular',
//     fontSize: 16,
//     fontWeight: '600',
//     lineHeight: 20,
//     textAlign: 'left',
//   },
//   taskInfo: {
//     fontFamily: 'BostonRegular',
//     fontSize: 12,
//     fontWeight: '400',
//     lineHeight: 16,
//     textAlign: 'left',
//     marginTop: 4,
//   },
//   addText: {
//     fontFamily: 'BostonRegular',
//     fontSize: 16,
//     fontWeight: '600',
//     lineHeight: 20,
//     textAlign: 'center',
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     marginRight: 8,
//     // Add any icon styles or replace with an actual icon component
//   },
// });

// export default TaskCard;
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import Typography from "../../components/typography/Typography";
import Colors from "../../components/Colors/Colors";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { TASK_COMPLETE } from "../../graphql/mutations/taskMutations";
import * as SecureStore from "expo-secure-store";
import { BuyIcon, CleaningIcon, DishesIcon, GroceriesIcon, HomeworkIcon, LaundryIcon } from "../icons/icons";

const TaskCard = ({
  task,
  id, // Add the task ID prop
  taskName,
  startTime,
  endTime,
  taskNameColor,
  timeColor,
  backgroundColor,
  borderColor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const categories = [
    { label: 'Cleaning', Icon: CleaningIcon },
    { label: 'Laundry', Icon: LaundryIcon },
    { label: 'Dishes', Icon: DishesIcon },
    { label: 'Homework', Icon: HomeworkIcon },
    { label: 'Groceries', Icon: GroceriesIcon },
    { label: 'Buy', Icon: BuyIcon },
  ];
  const [categoryIcon, setCategoryIcon] = useState(null); // State for the category icon

  useEffect(() => {
    console.log(task.category,"CAR")
    const matchedCategory = categories.find((cat) => cat.label === task.category);
    console.log(matchedCategory,"NMMM");
    setCategoryIcon(matchedCategory ? matchedCategory.Icon :categories[2].Icon );
  }, [task.category]);
  // Fetch token on component mount
  React.useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("authToken");
        if (storedToken) {
          setToken(storedToken);
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
        Alert.alert("Retrieval Error", "Failed to retrieve authentication token.");
      }
    };
    getToken();
  }, []);

  const [completeTask] = useMutation(TASK_COMPLETE, {
    context: {
      headers: {
        Authorization: ` ${token}`,
      },
    },
    variables: { taskId: id },
    onCompleted: (data) => {
      Alert.alert("Task completed!");
      console.log("Task marked as completed:", data.completeTask);
      // Refresh or update the task list as needed
    },
    onError: (error) => {
      console.error("Error completing task:", error);
      Alert.alert("Error completing task:", error.message);
    },
  });

  const handleEditPress = () => {
    console.log('Navigating to EditTaskEvent with ID:', id);
    navigation.navigate("EditTaskEvent", { id });
  };
  

  const handleDonePress = () => {
    if (token) {
      completeTask(); // Executes the completeTask mutation with token in context
    } else {
      Alert.alert("Error", "No authentication token found.");
    }
  };

  return taskName ? (
    <TouchableOpacity
      style={[
        styles.card,
        styles.filledCard,
        { backgroundColor: backgroundColor || Colors.Secondary.Navy[100] },
      ]}
      activeOpacity={1} // Maintain opacity when pressed
      onPress={() => setIsExpanded(!isExpanded)} // Toggle expansion
    >
      <View style={[styles.filledContent, { borderTopColor: borderColor }]}>
        {/* <View style={styles.icon} /> */}
        {/* {categoryIcon && (
          <categoryIcon   /> // Render as a proper component

        )} */}
        <View>
          <Typography
            variant="SH3"
            color={taskNameColor}
            style={styles.taskName}
          >
            {taskName}
          </Typography>
          <Typography
            variant="Caption"
            color={timeColor}
            style={styles.taskTime}
          >
            {startTime} - {endTime}
          </Typography>
        </View>
      </View>
      {isExpanded && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={[styles.buttonText, { color: "#891E6E" }]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDonePress}>
            <Text style={[styles.buttonText, { color: "#476BFB" }]}>
              Mark as Done
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.card,
        styles.emptyCard,
        { backgroundColor: backgroundColor || Colors.Secondary.Gray[100] },
      ]}
    >
      <Typography variant="SH4" color={taskNameColor} style={styles.addText}>
        No Task
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    width: "100%",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  emptyCard: {
    height: 96,
  },
  filledCard: {
    minHeight: 72,
  },
  filledContent: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 12,
    borderTopWidth: 2,
    width: "95%",
  },
  taskName: {
    fontFamily: "BostonRegular",
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "left",
  },
  taskTime: {
    fontFamily: "BostonRegular",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "left",
  },
  addText: {
    fontFamily: "BostonRegular",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "center",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    width: "100%",
  },
  editButton: {
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  deleteButton: {
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#476BFB",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default TaskCard;
