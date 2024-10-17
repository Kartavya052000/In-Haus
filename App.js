import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomLoadingScreen from './src/components/Loading/CustomLoadingScreen'; // Custom loading screen
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Import your screens
import { Haus, Calendar, MealAI, Profile, Rewards, CameraScreen, ResultScreen, FixMealCameraScreen, FixMealResultScreen } from './src/components/screens';
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import HomePage from './src/pages/HomePage';

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// Stack Navigator for MealAI
const MealStack = createStackNavigator();
// Main Stack Navigator
const Stack = createStackNavigator();

// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://98.81.234.60/api/graphql', // Your GraphQL endpoint
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// MealAI Stack Navigator
// function MealAIStack() {
//   return (
//     <MealStack.Navigator initialRouteName="MealMenu">
//       <MealStack.Screen name="MealMenu" component={MealAI} />
//       <MealStack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
//       <MealStack.Screen name="ResultScreen" component={ResultScreen} />
//       <MealStack.Screen name="FixMealCameraScreen" component={FixMealCameraScreen} options={{ headerShown: false }} />
//       <MealStack.Screen name="FixMealResultScreen" component={FixMealResultScreen} />
//     </MealStack.Navigator>
//   );
// }

// Screen options for the tab bar
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

// Main Tab Navigator
// const TabNavigator = () => {
//   return (
//     <Tab.Navigator screenOptions={screenOptions}>
//       <Tab.Screen 
//         name="Haus" 
//         component={Haus} 
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: "center", justifyContent: "center" }}>
//               <FontAwesome6 name="house" size={24} color="black" />
//               <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>Haus</Text>
//             </View>
//           ),
//         }} 
//       />
//       <Tab.Screen 
//         name="Calendar" 
//         component={Calendar} 
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: "center", justifyContent: "center" }}>
//               <FontAwesome6 name="calendar-day" size={24} color="black" />
//               <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>Calendar</Text>
//             </View>
//           ),
//         }} 
//       />
//       <Tab.Screen 
//         name="MealAI" 
//         component={MealAIStack} 
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: "center", justifyContent: "center" }}>
//               <FontAwesome6 name="bowl-food" size={24} color="black" />
//               <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>MealAI</Text>
//             </View>
//           ),
//         }} 
//       />
//       <Tab.Screen 
//         name="Rewards" 
//         component={Rewards} 
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: "center", justifyContent: "center" }}>
//               <FontAwesome6 name="ranking-star" size={24} color="black" />
//               <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>Rewards</Text>
//             </View>
//           ),
//         }} 
//       />
//       <Tab.Screen 
//         name="Profile" 
//         component={Profile} 
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: "center", justifyContent: "center" }}>
//               <FontAwesome6 name="user-large" size={24} color="black" />
//               <Text style={{ fontSize: 12, color: focused ? '#000000' : '#666666' }}>Profile</Text>
//             </View>
//           ),
//         }} 
//       />
//     </Tab.Navigator>
//   );
// };

// Main Stack Navigator
// const MainStackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//       <Stack.Screen name="HomePage" component={HomePage} />
//       <Stack.Screen name="MainTabs" component={TabNavigator} /> {/* Tabs wrapped inside stack */}
//     </Stack.Navigator>
//   );
// };

// App component
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        Aleo: require('./assets/Fonts/Aleo-VariableFont_wght.ttf'),
        BostonRegular: require('./assets/Fonts/BostonRegular.otf'),
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
      <NavigationContainer>
        {/* <MainStackNavigator /> */}
        <Stack.Navigator initialRouteName="HomePage" >
       <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="SignUp" component={SignUp} />
       <Stack.Screen name="HomePage" component={HomePage}  options={{ headerShown: false }} />
       {/* <Stack.Screen name="MainTabs" component={TabNavigator} /> Tabs wrapped inside stack */}
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