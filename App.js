import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ShoppingListProvider } from './src/components/contexts/ShoppingListContext';
import CustomLoadingScreen from './src/components/Loading/CustomLoadingScreen';
import 'react-native-reanimated';
import {Haus, Calendar, MealAI, Profile, Rewards, CameraScreen, ResultScreen, FixMealCameraScreen, FixMealResultScreen } from './src/components/screens';
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

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Stack Navigator for MealAI
const MealStack = createStackNavigator();
// Main Stack Navigator
const Stack = createStackNavigator();

// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://10.0.0.36:4000/graphql', // Your GraphQL endpoint
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

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        Aleo: require('./assets/Fonts/Aleo-VariableFont_wght.ttf'),
        BostonRegular: require('./assets/Fonts/BostonRegular.otf'),
        BostonSemiBold: require('./assets/Fonts/BostonSemiBold.otf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts', error);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <CustomLoadingScreen />;
  }

  return (
    <ApolloProvider client={client}>
      <ShoppingListProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WelcomePage">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddMember" component={AddMember} options={{ headerShown: false }} />
            <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="CalenderPage" component={CalendarPage} />
            <Stack.Screen name="CreateTaskEvent" component={CreateTaskEvent} />
            <Stack.Screen name="EditTaskEvent" component={EditTaskEvent} />
            <Stack.Screen name="CreateReward" component={CreateRewards} />
            <Stack.Screen name="RewardsList" component={RewardsList} />
            <Stack.Screen name="ComponentCompiler" component={ComponentCompiler} />
            <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
          </Stack.Navigator>
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
