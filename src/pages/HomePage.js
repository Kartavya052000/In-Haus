import React from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import { Haus, Calendar, MealAI, Profile, Rewards, SearchCameraScreen, MealPlanner, SearchMeal, SearchResults, MealDetails, MealDetailsAI } from '../components/screens';
import CalendarPage from './CalenderPage';

// Import your SVG icons
import { HausIcon, CalendarIcon, MealAIIcon, RewardsIcon, ProfileIcon } from '../components/icons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Stack Navigator for MealAI
const MealStack = createStackNavigator();

// Define the MealAI Stack
function MealAIStack() {
  return (
    <MealStack.Navigator initialRouteName="MealPlanner">
      <MealStack.Screen name="SearchCameraScreen" component={SearchCameraScreen} options={{ headerShown: false, presentation: 'modal' }} />
      <MealStack.Screen name="MealPlanner" component={MealPlanner} options={{ headerShown: false }} />
      <MealStack.Screen name="SearchMeal" component={SearchMeal} options={{ headerShown: false }} />
      <MealStack.Screen name="SearchResults" component={SearchResults} options={{ headerShown: false }} />
      <MealStack.Screen name="MealDetails" component={MealDetails} options={{ headerShown: false }} />
      <MealStack.Screen name="MealDetailsAI" component={MealDetailsAI} options={{ headerShown: false }} />
    </MealStack.Navigator>
  );
}

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.1, // Responsive height
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.02, // Responsive horizontal padding
    alignItems: 'center',
    justifyContent: 'center',
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
            <View style={styles.tabItem}>
              <HausIcon color={focused ? '#3F80FF' : '#D0D5DD'} width={width * 0.07} height={width * 0.07} />
              <Text style={[styles.tabText, { color: focused ? '#3F80FF' : '#D0D5DD' }]}>Haus</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarPage} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <CalendarIcon color={focused ? '#3F80FF' : '#D0D5DD'} width={width * 0.07} height={width * 0.07} />
              <Text style={[styles.tabText, { color: focused ? '#3F80FF' : '#D0D5DD' }]}>Calendar</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="MealAI" 
        component={MealAIStack} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <MealAIIcon color={focused ? '#3F80FF' : '#D0D5DD'} width={width * 0.07} height={width * 0.07} />
              <Text style={[styles.tabText, { color: focused ? '#3F80FF' : '#D0D5DD' }]}>MealAI</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Rewards" 
        component={Rewards} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <RewardsIcon color={focused ? '#3F80FF' : '#D0D5DD'} width={width * 0.07} height={width * 0.07} />
              <Text style={[styles.tabText, { color: focused ? '#3F80FF' : '#D0D5DD' }]}>Rewards</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <FontAwesomeIcon icon={faUser} color={focused ? '#3F80FF' : '#D0D5DD'} size={width * 0.05} />
              <Text style={[styles.tabText, { color: focused ? '#3F80FF' : '#D0D5DD' }]}>Profile</Text>
              {/* <ProfileIcon color={focused ? '#3F80FF' : '#D0D5DD'} width={width * 0.07} height={width * 0.07} /> */}
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
      <View style={{ flex: 1, width: '100%' }}>
        <TabNavigator />
      </View>
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
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: width * 0.035, // Responsive font size
    marginTop: height * 0.005, // Responsive margin top for spacing
  },
  // logoutButton: {
  //   backgroundColor: 'black',
  //   borderRadius: 25,
  //   paddingVertical: height * 0.02, // Responsive padding
  //   paddingHorizontal: width * 0.1, // Responsive padding
  //   marginBottom: height * 0.02,
  // },
  logoutText: {
    color: 'white',
    fontSize: width * 0.04, // Responsive font size
    textAlign: 'center',
  },
});
