import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import PrimaryButton2 from "../components/buttons/PrimaryButton2";
import CustomToggle from "../components/Toggles/Toggles";
import { AddIcon, CameraIcon } from "../components/icons/icons";
import { useNavigation } from "@react-navigation/native";

const logo = require("../../assets/logo-main.png");

const { width } = Dimensions.get("window");

const data = [
  {
    description:
      "The all-in-one app for managing your family’s tasks, meal planning, and rewards. Let’s get you started on creating a more organized and balanced home life.",
    buttonText: "Get Started",
  },
  {
    title: "Set Up Your Family",
    description:
      "Add your family members and assign roles. This helps you organize tasks, events, and rewards for each person. Don’t worry, you can edit or update these details later.",
    buttonText: "Next",
  },
  {
    title: "Discover the Calendar",
    description:
      "Use the calendar to create tasks or events for specific family members or the entire household. Stay on top of responsibilities by keeping everyone’s schedule in sync.",
    buttonText: "Next",
  },
  {
    title: "Explore MealAI",
    description:
      "Plan your weekly meals and get personalized ingredient lists. With MealAI, you can also take a picture of ingredients to get recipe suggestions or snap photos of prepared meals to discover how they were made.",
    buttonText: "Next",
  },
  {
    title: "Add Your Meals",
    description:
      "Choose and schedule your favorite recipes for the week, and let MealAI organize your grocery list automatically.",
    buttonText: "Next",
  },
  {
    title: "Earn & Redeem Rewards",
    description:
      "Motivate your family by setting up rewards. Earn points by completing tasks and redeem them for rewards set by the household admin. Make daily chores fun and rewarding!",
    buttonText: "Next",
  },
  {
    title: "Notifications & Reminders",
    description:
      "Enable notifications to stay up to date on tasks, meal suggestions, and rewards. Get timely reminders to keep your household organized.",
    buttonText: "Next",
  },
  {
    title: "You're All Set!",
    description:
      "You’re ready to start using in-haus. Manage tasks, plan meals, and earn rewards for your family. Let’s make home life easier, one step at a time.",
    buttonText: "Go to Dashboard",
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const renderCreateEventButton = () => (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => navigation.navigate("CreateTaskEvent")}
    >
      <AddIcon style={styles.icon} width={24} height={24} fill="#476BFB" />
      <Text style={styles.buttonText}>Create Event</Text>
    </TouchableOpacity>
  );

  const renderNewMemberButton = () => (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => navigation.navigate("AddMember")}
    >
      <AddIcon
        style={styles.icon}
        width={24}
        height={24}
        marginRight={20}
        fill="#476BFB"
      />
      <Text style={styles.buttonText}>New Member</Text>
    </TouchableOpacity>
  );

  const renderMealAiButton = () => (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => console.log("MealAI button pressed")}
    >
      <CameraIcon style={styles.icon} width={24} height={24} fill="#476BFB" />
      <Text style={styles.buttonText}>Explore MealAI</Text>
    </TouchableOpacity>
  );

  const renderAddMealPlanButton = () => (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => console.log("New Meal Plan button pressed")}
    >
      <AddIcon
        style={styles.icon}
        width={24}
        height={24}
        marginRight={20}
        fill="#476BFB"
      />
      <Text style={styles.buttonText}>Prepare your week</Text>
    </TouchableOpacity>
  );

  const renderAddRewardButton = () => (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => navigation.navigate("CreateReward", {undefined})}
    >
      <AddIcon
        style={styles.icon}
        width={24}
        height={24}
        marginRight={20}
        fill="#476BFB"
      />
      <Text style={styles.buttonText}>Set Rewards</Text>
    </TouchableOpacity>
  );

  // const renderNotificationButton = () => (
  //   <CustomToggle
  //     label="Enable Notifications"
  //     initialValue={notificationsEnabled}
  //     onToggle={(value) => {
  //       setNotificationsEnabled(value);
  //       console.log("Notifications enabled:", value);
  //     }}
  //     // style={{ width: 250 }}
  //   />
  // );

  const renderItem = ({ title, description }, index) => (
    <View style={styles.slide}>
      {/* Display logo image on the first slide */}
      {index === 0 && <Image source={logo} style={styles.logo} />}

      {title && <Text style={styles.title}>{title}</Text>}
      <Text style={styles.description}>{description}</Text>

      {index === 1 && renderNewMemberButton()}
      {index === 2 && renderCreateEventButton()}
      {index === 3 && renderMealAiButton()}
      {index === 4 && renderAddMealPlanButton()}
      {index === 5 && renderAddRewardButton()}
      {/* {index === 6 && renderNotificationButton()} */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Row with Dots and Skip Button */}
      <View style={styles.topRow}>
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { opacity: currentIndex === index ? 1 : 0.3 },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate("HomePage")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          width={width}
          data={data}
          renderItem={({ item, index }) => renderItem(item, index)}
          onSnapToItem={(index) => setCurrentIndex(index)}
          loop={false}
          // index={currentIndex}
        />
      </View>

      {/* Primary Button at the Bottom */}
      <View style={styles.buttonContainer}>
        <PrimaryButton2
          backgroundColor="#476BFB"
          textColor="#FFFFFF"
          buttonText={data[currentIndex].buttonText}
          size="large"
          disabled={false}
          hasIcon={false}
          hasText={true}
          textAlignment="center"
          onPress={() => {
            if (currentIndex < data.length - 1) {
              const newIndex = currentIndex + 1;
              setCurrentIndex(newIndex);
              if (carouselRef.current) {
                carouselRef.current.scrollTo({
                  index: newIndex,
                  animated: true,
                });
              }
            } else {
              navigation.navigate("HomePage");
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: "row",
  },
  dot: {
    width: 30,
    height: 3,
    borderRadius: 4,
    backgroundColor: "#4A90E2",
    marginHorizontal: 4,
  },
  skipButton: {},
  skipText: {
    color: "#476BFB",
    fontSize: 16,
  },
  carouselContainer: {
    flex: 1,
    paddingBottom: 100,
  },
  slide: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333232",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#000000",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginVertical: 20,
    width: "95%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    borderStyle: "solid",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#6F6D6D",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default OnboardingScreen;
