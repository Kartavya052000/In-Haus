

import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { GOOGLE_MUTATION } from '../../graphql/mutations/authMutations';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


const webClientId ="733893558665-4pfkbdmufs6o2iedfcp9u2sfbiiiur74.apps.googleusercontent.com"
const androidClientId="733893558665-hcbq18figicoor76644ns71as472u0cq.apps.googleusercontent.com"
const iosClientId="733893558665-m4dp5irjobsimc7n3ea4rjmvj27p8626.apps.googleusercontent.com"
WebBrowser.maybeCompleteAuthSession();
// Storing the token securely
const storeToken = async (token,points) => {
  try {
    await SecureStore.setItemAsync('authToken', token);
    // await SecureStore.setItemAsync('points', points); // Ensure points are stored as a string
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
    Alert.alert('Storage Error', 'Failed to store authentication token securely.');
  }
};
export default function GoogleLogIN() {
  const config ={
    webClientId,
    iosClientId,
    androidClientId
  }
  const navigation = useNavigation();

  const [googleLogIn] = useMutation(GOOGLE_MUTATION, {
    onCompleted: (data) => {
      console.log('Login successful:', data.googleSignIn.token,data.googleSignIn.points);
      storeToken(data.googleSignIn.token,data.googleSignIn.points); // Store the token securely
      navigation.replace('HomePage'); // Navigate to HomePage upon success
      // Alert.alert('Login Successful', 'You have successfully logged in!');
    },
    onError: (error) => {
      console.error('Login errorrr:', error);
      Alert.alert('Login Error', error.message || 'An error occurred during login.');
    },
  });
  const [request, response, promptAsync] = Google.useAuthRequest(config)

  const handleToken = () =>{
    if(response?.type === 'success'){
      const { authentication } = response;
      const token = authentication?.accessToken;
      getUserProfile(token)
      console.log("access token",token)
    }
  }
const getUserProfile = async(token) => {
if(!token) return;
try{
  // jwt authentication api 
  const response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
    headers: { Authorization: `Bearer ${token}` }
  })
  const user = await response.json();
  
  googleLogIn({
    variables: {
      email:user.email,
      username:user.name,
      googleId:user.id
    },
  });
  // console.log(user,"user")
  console.log("user",user.fullname,user.email,user.id)
}catch(error){
  console.log("error",error)
}
}
  useEffect(()=>{
handleToken()
  },[response])
  return (
    <View style={styles.ContainerButton}>
      <FontAwesome name="google" size={24} color="white" style={{ marginRight: 10 }} />
      <Button
        title="Continue with Google"
        color={'white'}
        style={styles.Button}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  ContainerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#476BFB',
    borderRadius: 17,
    height: 50,
    marginBottom: 20,
  },
});