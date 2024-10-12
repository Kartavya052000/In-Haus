import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React from 'react';
import * as Keychain from 'react-native-keychain';

export default function HomePage({ navigation }) {
  const handleLogout = async () => {
    try {
        if (Keychain) {
          await Keychain.resetGenericPassword();
          Alert.alert('Logout Successful', 'You have been logged out.');
          navigation.replace('Login');
        } else {
          Alert.alert('Error', 'Keychain is not available.');
        }
      } catch (error) {
        console.error('Error logging out', error);
        Alert.alert('Logout Error', 'Failed to log out. Please try again.');
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomePage</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
