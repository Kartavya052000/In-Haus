import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations';
// import * as Keychain from 'react-native-keychain';
import InputField from '../components/Inputs/InputField';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'; 
import GoogleLogIN from '../components/google/GoogleLogIN';

// Storing the token securely
const storeToken = async (token,points) => {
  try {
    await SecureStore.setItemAsync('authToken', token);
    await SecureStore.setItemAsync('points', points.toString()); // Ensure points are stored as a string
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
    Alert.alert('Storage Error', 'Failed to store authentication token securely.');
  }
};
const Login = () => {
  const [email, setEmail] = useState('Mateo@gmail.com');
  const [password, setPassword] = useState('password123');
  const navigation = useNavigation();
  const [logIn] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log('Login successful:', data.login.token,data.login.points);
      storeToken(data.login.token,data.login.points); // Store the token securely
      navigation.replace('HomePage'); // Navigate to HomePage upon success
      // Alert.alert('Login Successful', 'You have successfully logged in!');
    },
    onError: (error) => {
      console.error('Login errorrr:', error);
      Alert.alert('Login Error', error.message || 'An error occurred during login.');
    },
  });
  const handleLogin = () => {
    // Check if fields are filled before logging in
    if (email && password) {
    console.log("Hit")
     
      logIn({
        variables: {
          email,
          password,
        },
      });
    } else {
      Alert.alert('Validation Error', 'Both email and password are required.');
    }
  };
  return (
    <ScrollView style={styles.container}>
      <InputField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.inputField}
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleLogin}>
          <Text style={styles.saveText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={styles.createAccountText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
      <GoogleLogIN />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputField: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
  },
  saveButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  createAccountText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Login;