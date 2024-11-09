import React from 'react';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations';
import InputField from '../components/Inputs/InputField';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'; 
import GoogleLogIN from '../components/google/GoogleLogIN';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Typography from '../components/typography/Typography';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const storeToken = async (token, points) => {
  try {
    await SecureStore.setItemAsync('authToken', token);
    await SecureStore.setItemAsync('points', points.toString());
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
    Alert.alert('Storage Error', 'Failed to store authentication token securely.');
  }
};

const Login = () => {
  const [email, setEmail] = useState('Mateo@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidad de la contraseña
  const navigation = useNavigation();
  const [logIn] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log('Login successful:', data.login.token, data.login.points);
      storeToken(data.login.token, data.login.points);
      navigation.replace('HomePage');
    },
    onError: (error) => {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message || 'An error occurred during login.');
    },
  });

  const handleLogin = () => {
    if (email && password) {
      logIn({
        variables: { email, password },
      });
    } else {
      Alert.alert('Validation Error', 'Both email and password are required.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Círculo de fondo con degradado */}
      <LinearGradient
        colors={['rgba(243, 245, 255, 1)','rgba(199, 210, 255, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.backgroundCircle}
        opacity={0.5}
      />
      
      <View style={styles.seconContainer}>
        <Typography fontWeight="700" variant="H2" style={styles.title}>Welcome back</Typography>
        <InputField
          label="Username"
          placeholder="Enter your username"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.inputField}
          width={'100%'}
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

        <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password reset feature coming soon!')}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        <GoogleLogIN />
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={styles.createAccountText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f4ff',
  },
  backgroundCircle: {
    position: 'absolute',
    top: -165,
    left: -90,
    width: width*1.4,
    height: width*1.4,
    borderRadius: 304, // Hace que sea un círculo perfecto
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
  passwordContainer: {
    width: '100%',
  },
  seconContainer: {
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#6b77f0',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 30,
    textDecorationLine: 'none',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#4f67ff',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 80,
    marginBottom: 15,
    width: '80%',
    height: 52,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  createAccountText: {
    color: '#4f67ff',
    textAlign: 'center',
    marginTop: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: "5%",
    top: '50%',
    transform: [{ translateY: -11 }],
  },
});

export default Login;
