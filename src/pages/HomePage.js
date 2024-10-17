import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// Import your screens
import { Haus, Calendar, MealAI, Profile, Rewards, CameraScreen, ResultScreen, FixMealCameraScreen, FixMealResultScreen, MealPlanner } from '../components/screens';

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Stack Navigator for MealAI
const MealStack = createStackNavigator();

// Define the MealAI Stack
function MealAIStack() {
  return (
    <MealStack.Navigator initialRouteName="MealMenu">
      <MealStack.Screen name="MealMenu" component={MealAI} options={{ headerShown: false }} />
      <MealStack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
      <MealStack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }}/>
      <MealStack.Screen name="FixMealCameraScreen" component={FixMealCameraScreen} options={{ headerShown: false }} />
      <MealStack.Screen name="FixMealResultScreen" component={FixMealResultScreen} options={{ headerShown: false }} />
      <MealStack.Screen name="MealPlanner" component={MealPlanner} options={{ headerShown: false }} />
    </MealStack.Navigator>
  );
}

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 60,
    backgroundColor: '#ffffff',
  },
};

// Define the Tab Navigator for use within HomePage
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen 
        name="Haus" 
        component={Haus} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome6 name="house" size={24} color="black" />
              <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>Haus</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Calendar" 
        component={Calendar} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome6 name="calendar-day" size={24} color="black" />
              <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>Calendar</Text>
            </View>
          ),
        }} 
      />
      {/* MealAI now uses MealAIStack */}
      <Tab.Screen 
        name="MealAI" 
        component={MealAIStack} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome6 name="bowl-food" size={24} color="black" />
              <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>MealAI</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Rewards" 
        component={Rewards} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome6 name="ranking-star" size={24} color="black" />
              <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>Rewards</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome6 name="user-large" size={24} color="black" />
              <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>Profile</Text>
            </View>
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default function HomePage({ navigation }) {
  const handleLogout = async () => {
    try {
      if (Keychain) {
        await Keychain.resetGenericPassword();
        Alert.alert('Logout Successful', 'You have been logged out.');
        navigation.replace('Login');
      } else {
        Alert.alert('Error', 'Keychain is not available.');
      }
    } catch (error) {
      console.error('Error logging out', error);
      Alert.alert('Logout Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>HomePage</Text> */}

      {/* Render the TabNavigator here */}
      <View style={{ flex: 1, width: '100%' }}>
        <TabNavigator />
      </View>

      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
