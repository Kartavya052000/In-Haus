import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations';
import * as Keychain from 'react-native-keychain';
import InputField from '../Inputs/InputField';
import { useNavigation } from '@react-navigation/native'; 

// Storing the token securely
const storeToken = async (token) => {
  try {
    await Keychain.setGenericPassword('authToken', token); // Use a descriptive key name
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); 

  const [logIn] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log('Login successful:', data.login.token);
      storeToken(data.login.token); // Store the token securely
      navigation.replace('HomePage'); // Navigate to HomePage upon success
      Alert.alert('Login Successful', 'You have successfully logged in!');
    },
    onError: (error) => {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message || 'An error occurred during login.');
    },
  });

  const handleLogin = () => {
    // Check if fields are filled before logging in
    if (email && password) {
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
