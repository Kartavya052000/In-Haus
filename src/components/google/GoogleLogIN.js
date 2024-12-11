import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { GoogleIcon } from '../icons/icons';
import { GOOGLE_MUTATION } from '../../graphql/mutations/authMutations';

const webClientId = "733893558665-4pfkbdmufs6o2iedfcp9u2sfbiiiur74.apps.googleusercontent.com";
const androidClientId = "733893558665-hcbq18figicoor76644ns71as472u0cq.apps.googleusercontent.com";
const iosClientId = "733893558665-m4dp5irjobsimc7n3ea4rjmvj27p8626.apps.googleusercontent.com";

WebBrowser.maybeCompleteAuthSession();

const storeToken = async (token, points) => {
  try {
    await SecureStore.setItemAsync('authToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing token:', error);
    Alert.alert('Storage Error', 'Failed to store authentication token securely.');
  }
};

export default function GoogleLogIN() {
  const navigation = useNavigation();

  const [googleLogIn] = useMutation(GOOGLE_MUTATION, {
    onCompleted: (data) => {
      console.log('Login successful:', data.googleSignIn.token, data.googleSignIn.points);
      storeToken(data.googleSignIn.token, data.googleSignIn.points);
      navigation.replace('HomePage');
    },
    onError: (error) => {
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message || 'An error occurred during login.');
    },
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId,
    iosClientId,
    androidClientId,
  });

  const handleToken = () => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const token = authentication?.accessToken;
      getUserProfile(token);
    }
  };

  const getUserProfile = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();

      googleLogIn({
        variables: {
          email: user.email,
          username: user.name,
          googleId: user.id,
        },
      });
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  return (
<View style={styles.ContainerButton}>
  <View style={styles.GoogleIconWrapper}>
    <GoogleIcon style={styles.GoogleIcon} />
  </View>
  <TouchableOpacity
    style={styles.Button}
    disabled={!request}
    onPress={() => promptAsync()}
  >
    <Text style={styles.ButtonText}>Continue with Google</Text>
  </TouchableOpacity>
</View>

  );
}

const styles = StyleSheet.create({
  ContainerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#476BFB',
    borderRadius: 17,
    height: 50,
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  GoogleIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,
    marginLeft: 10,
  },
  GoogleIcon: {
    width: 20,
    height: 20,
  },
  Button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
