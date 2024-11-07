import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { SIGN_UP_MUTATION } from '../graphql/mutations/authMutations';
import * as SecureStore from 'expo-secure-store';
import InputField from '../components/Inputs/InputField';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

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
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidad de la contraseña

  const [signUp] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      console.log('Signup successful:', data.signup.token);
      storeToken(data.signup.token);
      navigation.replace('Onboarding');
      Alert.alert('Signup Successful', 'You have successfully signed up!');
    },
    onError: (error) => {
      console.error('Error signing up:', error);
      Alert.alert('Signup Error', error.message);
    },
  });

  const handleSave = () => {
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
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
          <LinearGradient
            colors={['rgba(243, 245, 255, 1)','rgba(199, 210, 255, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.backgroundCircle}
            opacity={0.5}
          />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Create an account</Text>
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
    <View style={styles.passwordContainer}>
              <InputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              >
                <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
                  <Icon 
                    name={showPassword ? 'visibility' : 'visibility-off'} 
                    size={24} 
                    color="gray" 
                  />
                </TouchableOpacity>
              </InputField>
            </View>
            <View style={styles.passwordContainer}>
              <InputField
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              >
                <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
                  <Icon 
                    name={showPassword ? 'visibility' : 'visibility-off'} 
                    size={24} 
                    color="gray" 
                  />
                </TouchableOpacity>
              </InputField>
            </View>
                  <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.createAccountText}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
    justifyContent: 'center',
    // backgroundColor: '#f0f4ff', // Fondo similar a los otros estilos
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  inputField: {
    marginBottom: 20,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Ubica el contenedor a 20px del fondo
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4f67ff',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 80,
    marginBottom: 15,
    width: '80%',
    height: 52,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  createAccountText: {
    color: '#4f67ff',
    fontSize: 14,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: "5%",
    top: '50%',
    transform: [{ translateY: -11 }],
  },
  backgroundCircle: {
    position: 'absolute',
    top: -165,
    left: -90,
    width: width*1.4,
    height: width*1.4,
    borderRadius: 304,
  },
});

export default SignUp;

