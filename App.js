import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomLoadingScreen from './src/components/Loading/CustomLoadingScreen'; // Custom loading screen
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { ShoppingListProvider } from './src/components/contexts/ShoppingListContext';

import 'react-native-reanimated';
import Toast from 'react-native-toast-message';


// Import your screens
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import HomePage from './src/pages/HomePage';
import CalendarPage from './src/pages/CalenderPage';
import CreateTaskEvent from './src/pages/CreateTaskEvent';
import EditTaskEvent from './src/pages/EditTaskEvent'
import OnboardingScreen from './src/pages/OnboardingScreen';
import AddMember from './src/pages/AddMember';
import ComponentCompiler from './src/components/ComponentCompiler';
import CreateRewards from './src/Rewards/CreateRewards';
import RewardsList from './src/Rewards/RewardsList';
import WelcomePage from './src/pages/WelcomePage';



// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Stack Navigator for MealAI
const MealStack = createStackNavigator();
// Main Stack Navigator
const Stack = createStackNavigator();

// Apollo Client setup
const client = new ApolloClient({
//  uri: 'http://98.81.234.60/api/graphql', // Your GraphQL endpoint
  // uri: 'http://10.128.226.175:4000/api/graphql', // Your GraphQL endpoint

  // uri: 'http://98.81.234.60/api/graphql', // Your GraphQL endpoint
  uri: 'http://192.168.1.174:4000/graphql', // Your GraphQL endpoint
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


  // const client = new ApolloClient({
  //   // uri: 'http://172.20.10.3:4000/graphql',
  //   uri: 'http://192.168.110.150:4000/graphql',
  //   cache: new InMemoryCache(),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   // connectToDevTools: true,
  // });

  return (
    <ApolloProvider client={client}>
      <ShoppingListProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomePage">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="AddMember" component={AddMember} options={{ headerShown: false }}/>
         <Stack.Screen name="HomePage" component={HomePage}  options={{ headerShown: false }} />
          <Stack.Screen name="CalenderPage" component={CalendarPage} />
          <Stack.Screen name="CreateTaskEvent" component={CreateTaskEvent} />
          <Stack.Screen name="EditTaskEvent" component={EditTaskEvent} />
          <Stack.Screen name="CreateReward" component={CreateRewards} />
          <Stack.Screen name="RewardsList" component={RewardsList} />
          <Stack.Screen name="ComponentCompiler" component={ComponentCompiler} />
          <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }}/>
          
        </Stack.Navigator>
        
      </NavigationContainer>
      <Toast />
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