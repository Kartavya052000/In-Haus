import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomLoadingScreen from './src/components/Loading/CustomLoadingScreen'; // Custom loading screen
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import 'react-native-reanimated';


// Import your screens
import { Haus, Calendar, MealAI, Profile, Rewards, CameraScreen, ResultScreen, FixMealCameraScreen, FixMealResultScreen } from './src/components/screens';
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import HomePage from './src/pages/HomePage';
import CalendarPage from './src/pages/CalenderPage';
import CreateTaskEvent from './src/pages/CreateTaskEvent';
import EditTaskEvent from './src/pages/EditTaskEvent'
import OnboardingScreen from './src/pages/OnboardingScreen';

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Stack Navigator for MealAI
const MealStack = createStackNavigator();
// Main Stack Navigator
const Stack = createStackNavigator();

// Apollo Client setup
const client = new ApolloClient({
  // uri: 'http://98.81.234.60/api/graphql', // Your GraphQL endpoint
  uri: 'http://10.128.226.175:4000/api/graphql', // Your GraphQL endpoint
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

  const client = new ApolloClient({
    uri: 'http://10.128.226.175:4000/graphql',
    // uri: 'http://98.81.234.60/api/graphql',
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
    },
    // connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="HomePage" component={HomePage}  options={{ headerShown: false }} />
          <Stack.Screen name="CalenderPage" component={CalendarPage} />
          <Stack.Screen name="CreateTaskEvent" component={CreateTaskEvent} />
          <Stack.Screen name="EditTaskEvent" component={EditTaskEvent} />
        </Stack.Navigator>
      </NavigationContainer>
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