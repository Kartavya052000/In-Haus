import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '../graphql/mutations/authMutations';
// import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import InputField from '../components/Inputs/InputField';
import * as SecureStore from 'expo-secure-store';
// Storing the token
const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync('authToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
    Alert.alert('Storage Error', 'Failed to store authentication token securely.');
  }
};
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Get navigation from the hook
  const [signUp] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      console.log('Signup successful:', data.signup.token);
    storeToken(data.signup.token);
    navigation.replace('HomePage'); // Use replace here
    Alert.alert('Signup Successful', 'You have successfully signed up!');
      // Optionally navigate to another screen or reset form here
    },
    onError: (error) => {
      console.error('Error signing up:', error);
      Alert.alert('Signup Error', error.message);
    },
  });
  const handleSave = () => {
    // Add logic to save event to backend if needed
    // Call the sign-up mutation when saving the event
    if (username && email && password) {
      signUp({
        variables: {
          username,
          email,
          password,
        },
      });
    } else {
      Alert.alert('Validation Error', 'All fields are required.');
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Register for Event</Text>
      </View> */}
      {/* User Information */}
      <InputField
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={styles.inputField}
      />
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
      {/* Discard and Save Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createAccountText}>Already Have an Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
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
});
export default SignUp;