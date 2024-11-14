import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';

import { StyleSheet, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomLoadingScreen from './src/components/Loading/CustomLoadingScreen'; // Custom loading screen

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ShoppingListProvider } from './src/components/contexts/ShoppingListContext';
import 'react-native-reanimated';

import {Haus, Calendar, MealAI, Profile, Rewards, CameraScreen, ResultScreen, FixMealCameraScreen, FixMealResultScreen } from './src/components/screens';

import Toast from 'react-native-toast-message';


// Import your screens

import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import HomePage from './src/pages/HomePage';
import CalendarPage from './src/pages/CalenderPage';
import CreateTaskEvent from './src/pages/CreateTaskEvent';
import EditTaskEvent from './src/pages/EditTaskEvent';
import OnboardingScreen from './src/pages/OnboardingScreen';
import AddMember from './src/pages/AddMember';
import ComponentCompiler from './src/components/ComponentCompiler';
import CreateRewards from './src/Rewards/CreateRewards';
import RewardsList from './src/Rewards/RewardsList';
import WelcomePage from './src/pages/WelcomePage';
import Settings from './src/components/screens/Settings';
import Notifications from './src/components/screens/Notifications';
import UserProfile from './src/components/screens/UserProfile';
import AddRemoveMember from './src/components/screens/AddRemoveMember';
// import UserList from '/src/components/screens/UserList';
import UserDetails from './src/components/screens/UserDetails';



// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Stack Navigator for MealAI
const MealStack = createStackNavigator();
// Main Stack Navigator
const Stack = createStackNavigator();

// Apollo Client setup
const client = new ApolloClient({
 // uri: 'http://98.81.234.60/api/graphql', // Your GraphQL endpoint


//  uri: 'http://98.81.234.60/api/graphql', // Your GraphQL endpoint
  uri: 'http://10.128.226.175:4000/graphql', // Your GraphQL endpoint

  // uri: 'http://98.81.234.60/api/graphql', // Your GraphQL endpoint


  uri: 'http://10.128.243.115:4000/graphql', // Your GraphQL endpoint



  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
  },
});



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

// App component
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Aleo: require('./assets/Fonts/Aleo-Bold.ttf'),
        BostonRegular: require('./assets/Fonts/BostonRegular.ttf'),
        BostonSemiBold: require('./assets/Fonts/BostonSemiBold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) return <CustomLoadingScreen />;





  return (
    <ApolloProvider client={client}>
      <ShoppingListProvider>

        <NavigationContainer>
          <Stack.Navigator initialRouteName="WelcomePage">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddMember" component={AddMember} options={{ headerShown: false }} />
            <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="CalenderPage" component={CalendarPage} />
            <Stack.Screen name="CreateTaskEvent" component={CreateTaskEvent} options={{ headerShown: false }}/>
            <Stack.Screen name="EditTaskEvent" component={EditTaskEvent} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateReward" component={CreateRewards} />
            <Stack.Screen name="RewardsList" component={RewardsList} />
            <Stack.Screen name="ComponentCompiler" component={ComponentCompiler} />
            <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
            <Stack.Screen name="AddRemoveMember" component={AddRemoveMember} options={{ headerShown: false }} />
            {/* <Stack.Screen name="UserList" component={UserList} options={{ headerShown: false }} /> */}
            <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerShown: false }} />
          </Stack.Navigator>
      <Toast />
        </NavigationContainer>

      </ShoppingListProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
