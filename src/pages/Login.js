import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations';
import * as Keychain from 'react-native-keychain';

// Storing the token
const storeToken = async (token) => {
  try {
    await Keychain.setGenericPassword('token', token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: async (data) => {
      console.log('Login successful:', data.login);
      await storeToken(data.login.token); // Store the token
      Alert.alert('Login Successful', 'Welcome back!');
      // Optionally navigate to another screen or reset form here
    },
    onError: (error) => {
      console.error('Error logging in:', error);
      Alert.alert('Error', error.message); // Display error message
    },
  });

  const handleSubmit = () => {
    if (email && password) {
      // Call the login mutation
      login({
        variables: {
          email,
          password,
        },
      });
    } else {
      Alert.alert('Validation Error', 'Both fields are required.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default Login;
