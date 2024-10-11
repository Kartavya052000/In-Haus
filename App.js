import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ComponentCompiler from './src/ComponentCompiler';
import * as Font from 'expo-font';
import CustomLoadingScreen from './src/Loading/CustomLoadingScreen';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import HomePage from './src/pages/HomePage';

const Stack = createNativeStackNavigator();

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

  const client = new ApolloClient({
    // uri: 'http://172.20.10.3:4000/graphql',
    uri: 'http://98.81.234.60/api/graphql',
    cache: new InMemoryCache(),
    headers: {
      'Content-Type': 'application/json',
    },
    // connectToDevTools: true,
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="ComponentCompiler" component={ComponentCompiler} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="HomePage" component={HomePage} />
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
