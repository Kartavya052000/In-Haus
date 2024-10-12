import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Haus, Calendar, MealAI, Profile, Rewards, CameraScreen, ResultScreen, FixMealCameraScreen, FixMealResultScreen} from './src/components/screens';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import CustomLoadingScreen from './src/Loading/CustomLoadingScreen'; // Importar la pantalla de carga personalizada
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();
const MealStack = createStackNavigator(); // Stack for the MealAI navigation

function MealAIStack() {
  return (
    <MealStack.Navigator initialRouteName="MealMenu">
      <MealStack.Screen
        name="MealMenu"
        component={MealAI}
       
      />
      <MealStack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }} // Hide header for the camera screen
      />
      <MealStack.Screen
        name="ResultScreen"
        component={ResultScreen}
        
      />
      <MealStack.Screen name="FixMealCameraScreen" component={FixMealCameraScreen} options={{ headerShown: false }}  />
      <MealStack.Screen name="FixMealResultScreen" component={FixMealResultScreen} />
    </MealStack.Navigator>
  );
}

const screenOptions = {
tabBarShowLabel: false,
headerShown: false,
tabBarStyle: {
  position: 'absolute',
  bottom:0,
  left:0,
  right:0,
  elevation:0,
  height: 60,
  background: '#ffffff',

}
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Función para cargar las fuentes
  const loadFonts = async () => {
    await Font.loadAsync({
      Aleo: require('./assets/Fonts/Aleo-VariableFont_wght.ttf'),
      BostonRegular: require('./assets/Fonts/BostonRegular.otf'),
    });
  };

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  // Si las fuentes no están cargadas, muestra la pantalla de carga personalizada
  // if (!fontsLoaded) {
  //   return <CustomLoadingScreen />;
  // }

  // Si las fuentes están cargadas, renderiza la app normalmente
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
        name="Haus" 
        component={Haus} 
        options={{
          tabBarIcon: ({focused}) => {
           return ( <View style={{alignItems:"center", justifyContent:"center"}}>
           <FontAwesome6 name="house" size={24} color="black" />
              <Text style={{ fontSize:12, color: focused ? '#000000' : '#666666', }}>Haus</Text>
            </View>
           )
          }
        }}
        />
        <Tab.Screen 
        name="Calendar" 
        component={Calendar}
         options={{
          tabBarIcon: ({focused}) => {
           return ( <View style={{alignItems:"center", justifyContent:"center"}}>
           <FontAwesome6 name="calendar-day" size={24} color="black" />
              <Text style={{ fontSize:12, color: focused ? '#000000' : '#666666', }}>Calendar</Text>
            </View>
           )
          }
        }}
        />
        <Tab.Screen 
        name="MealAI" 
        component={MealAIStack}  // Use the stack navigator for the MealAI tab
         options={{
          tabBarIcon: ({focused}) => {
           return ( <View style={{alignItems:"center", justifyContent:"center"}}>
           <FontAwesome6 name="bowl-food" size={24} color="black" />
              <Text style={{ fontSize:12, color: focused ? '#000000' : '#666666', }}>MealAI</Text>
            </View>
           )
          }
        }}
        />
        <Tab.Screen 
        name="Rewards" 
        component={Rewards}
         options={{
          tabBarIcon: ({focused}) => {
           return ( <View style={{alignItems:"center", justifyContent:"center"}}>
           <FontAwesome6 name="ranking-star" size={24} color="black" />
              <Text style={{ fontSize:12, color: focused ? '#000000' : '#666666', }}>Rewards</Text>
            </View>
           )
          }
        }}
        />
        <Tab.Screen 
        name="Profile" 
        component={Profile}
         options={{
          tabBarIcon: ({focused}) => {
           return ( <View style={{alignItems:"center", justifyContent:"center"}}>
           <FontAwesome6 name="user-large" size={24} color="black" />
              <Text style={{ fontSize:12, color: focused ? '#000000' : '#666666', }}>Profile</Text>
            </View>
           )
          }
        }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
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
