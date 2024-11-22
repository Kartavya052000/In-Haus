import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Animated,
} from "react-native";
import Typography from "../../components/typography/Typography";
import Colors from "../../components/Colors/Colors";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { TASK_COMPLETE } from "../../graphql/mutations/taskMutations";
import * as SecureStore from "expo-secure-store";
import {
  BuyIcon,
  CleaningIcon,
  DishesIcon,
  GroceriesIcon,
  HomeworkIcon,
  LaundryIcon,
} from "../icons/icons";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const TaskCard = ({
  task,
  id,
  taskName,
  startTime,
  endTime,
  taskNameColor,
  timeColor,
  backgroundColor,
  borderColor,
  selectedCategory,
  setIsVisible,
  setCurrentTask,
  onDelete, // New prop for handling delete
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const categoryIcons = {
    Cleaning: CleaningIcon,
    Laundry: LaundryIcon,
    Dishes: DishesIcon,
    Homework: HomeworkIcon,
    Groceries: GroceriesIcon,
    Buy: BuyIcon,
  };
  const CategoryIcon = categoryIcons[selectedCategory];

  useEffect(() => {
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
      setIsVisible(true);
      setCurrentTask(task);
      console.log("Task marked as completed:", data.completeTask);
    },
    onError: (error) => {
      console.error("Error completing task:", error);
      Alert.alert("Error completing task:", error.message);
    },
  });

  const handleEditPress = () => {
    console.log("Navigating to EditTaskEvent with ID:", id);
    navigation.navigate("EditTaskEvent", { id });
  };

  const handleDonePress = () => {
    if (token) {
      completeTask();
    } else {
      Alert.alert("Authentication Error", "Token not found.");
    }
  };

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
  
    return (
      <View style={styles.leftActionsContainer}>
        {/* Done Button */}
        <TouchableOpacity onPress={handleDonePress} style={styles.doneButton}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <FontAwesome name="check" size={24} color="#FFF" />
          </Animated.View>
        </TouchableOpacity>
  
        {/* Edit Button */}
        <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <FontAwesome name="edit" size={24} color="#FFF" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };
  

  return taskName ? (
    <Swipeable
      renderLeftActions={renderLeftActions}
      containerStyle={{ height: styles.filledCard.height }}
    >
      <TouchableOpacity
        style={[
          styles.card,
          styles.filledCard,
          { backgroundColor: backgroundColor || Colors.Secondary.Orange[100] },
        ]}
        onPress={handleEditPress}
      >
        <View style={[styles.filledContent, { borderTopColor: borderColor }]}>
          {CategoryIcon && (
            <CategoryIcon
              width={24}
              height={24}
              style={styles.icon}
              fill={Colors.Primary.Brand[500]}
            />
          )}
          <View style={styles.textContainer}>
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
              style={styles.taskInfo}
            >
              {`${startTime} - ${endTime}`}
            </Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  emptyCard: {
    height: 96,
  },
  filledCard: {
    height: 72,
  },
  leftActionsContainer: {
    flexDirection: 'row', // Arrange buttons side by side
    height: '100%',
  },
  filledContent: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    borderTopWidth: 2,
    width: "95%",
    padding: 12,
  },
  deleteButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    backgroundColor: "#ff0000",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  doneButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    backgroundColor: '#4CAF50', // Green background
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    backgroundColor: '#476BFB', // Yellow background
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  textContainer: {
    flex: 1,
  },
  taskName: {
    fontFamily: "BostonRegular",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    textAlign: "left",
  },
  taskInfo: {
    fontFamily: "BostonRegular",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "left",
    marginTop: 4,
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
});

export default TaskCard;
