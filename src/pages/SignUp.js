import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '../graphql/mutations/authMutations';
import * as Keychain from 'react-native-keychain';
import {
  Box,
  Text,
  Input,
  Button,
  AlertDialog,
  useDisclose,
} from 'gluestack-ui';

// Storing the token
const storeToken = async (token) => {
  try {
    await Keychain.setGenericPassword('token', token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isOpen, onOpen, onClose } = useDisclose();
  const [errorMessage, setErrorMessage] = useState('');

  const [signup] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      console.log('Signup successful:', data.signUp);
      storeToken(data.signUp.token);
      Alert.alert('Signup Successful', 'You have successfully signed up!');
      // Optionally navigate to another screen or reset form here
    },
    onError: (error) => {
      console.error('Error signing up:', error);
      setErrorMessage(error.message);
      onOpen();
    },
  });

  const handleSubmit = () => {
    if (username && email && password) {
      signup({
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
    <Box flex={1} justifyContent="center" padding={4}>
      <Text fontSize={24} marginBottom={4} textAlign="center">
        Sign Up
      </Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        marginBottom={3}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        marginBottom={3}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        marginBottom={4}
      />
      <Button onPress={handleSubmit}>Sign Up</Button>

      {/* Alert Dialog for errors */}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.Header>Error</AlertDialog.Header>
          <AlertDialog.Body>{errorMessage}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button onPress={onClose}>Close</Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default SignUp;
