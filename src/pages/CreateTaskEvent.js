import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import OptionTabs from "../components/TabsNavigators/OptionTabs/OptionTabs";
import CreateTask from "../components/TaskComponent/CreateTask";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "../components/typography/Typography";
import { BackIcon } from "../components/icons/icons";
import Colors from "../components/Colors/Colors";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");

const CreateTaskEvent = () => {
  const [activeTab, setActiveTab] = useState("Task");
  const [showMicAnimation, setShowMicAnimation] = useState(false);

  const rippleScale = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
const [showwaveLoader,setShowwaveLoader]=useState(false)
  // Handle tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const startRippleAnimation = () => {
    // Reset values before starting the animation
    rippleScale.setValue(0);
    rippleOpacity.setValue(1);

    Animated.loop(
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 3,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 1500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopRippleAnimation = () => {
    rippleScale.stopAnimation();
    rippleOpacity.stopAnimation();
    rippleScale.setValue(0);
    rippleOpacity.setValue(1);
  };

  const toggleMicAnimation = () => {
    if (showMicAnimation) {
      stopRippleAnimation();
    } else {
      startRippleAnimation();
    }
    setShowMicAnimation(!showMicAnimation);
  };

  const optionsFromDatabase = [{ name: "Task" }, { name: "Event" }];

  useEffect(() => {
    // Reset animation if the mic animation is toggled off
    if (!showMicAnimation) {
      stopRippleAnimation();
    }
  }, [showMicAnimation]);
  const getAnimation = (data) => {
    setShowwaveLoader(data);
  };
  return (
    <>
      {showwaveLoader && (
       
      <View style={styles.overlayContainer}>
      <View style={styles.overlay}>
        <LottieView
          autoPlay
          loop={true}
          style={styles.animation}
          source={require('../../assets/animations/wave.json')} // Replace with your Lottie file
        />
      </View>
    </View>
      )}
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(243, 245, 255, 1)", "rgba(199, 210, 255, 1)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      />
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleBack}>
          <View style={styles.addContainer}>
            <BackIcon color="#183AC1" style={styles.addIcon} />
          </View>
        </TouchableOpacity>
        <Typography
          variant="H4"
          style={[
            styles.headerTitle,
            { textAlign: "center", color: "#183AC1" },
          ]}
        >
          Create
        </Typography>
        <TouchableOpacity onPress={toggleMicAnimation}>
          <View style={styles.addContainer}>
            <Ionicons name="mic-outline" size={24} color="#183AC1" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Option Tabs Section */}
      <View style={styles.optionTabsContainer}>
        <OptionTabs
          options={optionsFromDatabase}
          containerColor={Colors.Secondary.Gray[100]}
          activeColor={"#DEE3FA"}
          inactiveColor={"#FFF"}
          textColor={Colors.Primary.Purple}
          onTabChange={handleTabChange}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CreateTask activeTab={activeTab} showMicAnimation={showMicAnimation} getAnimation={getAnimation}/>
      </ScrollView>

      {/* Mic Animation */}
      {showMicAnimation && (
        <View style={styles.micAnimationContainer}>
          {/* Ripple Effect */}
          <Animated.View
            style={[
              styles.ripple,
              {
                transform: [{ scale: rippleScale }],
                opacity: rippleOpacity,
              },
            ]}
          />
          {/* Mic Icon */}
          <TouchableOpacity onPress={toggleMicAnimation}>
            <Ionicons name="mic" size={100} color="#183AC1" />
          </TouchableOpacity>
        </View>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F2F2F2",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: height * 0.12,
    paddingHorizontal: 16,
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
    color: "#183AC1",
    textAlign: "center",
    flex: 1,
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  addContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  addIcon: {
    marginBottom: -2,
  },
  optionTabsContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  micAnimationContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 50,
  },
  ripple: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "rgba(24, 58, 193, 0.3)",
  },
});

export default CreateTaskEvent;
