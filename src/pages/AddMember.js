import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import InputField from '../components/Inputs/InputField';
import Dropdown from '../components/Dropdown/Dropdown';
import PrimaryButton2 from '../components/buttons/PrimaryButton2';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CREATE_GROUP } from '../graphql/mutations/authMutations';
import * as SecureStore from "expo-secure-store";



export default function AddMember() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigation = useNavigation();
const [authToken,setAuthToken]=useState('');
const [createGroup, { loading, error }] = useMutation(CREATE_GROUP, {
  context: {
    headers: {
      Authorization: `${authToken}`,
    },
  },    onCompleted: (data) => {
      Alert.alert('Success', `Group created successfully`);
      console.log('Group Data:', data);
      navigation.goBack(); // Navigate back on success
    },
    onError: (err) => {
      Alert.alert('Error', err.message || 'Something went wrong');
    },
  });
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
          setAuthToken(token);
        } else {
          console.error("No auth token found");
        }
      } catch (error) {
        console.error("Error retrieving auth token:", error);
      }
    };

    getToken();
  }, []);
  const handleAddMember = () => {
    if (!email) {
      Alert.alert('Please provide an email');
      return;
    }

    // Static group name
    const groupName = 'Family';

    // Call the mutation
    createGroup({
      variables: { groupName, email },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Add Member</Text>
      </View>

      {/* Name Field */}
      <InputField
        label="Name"
        placeholder="Member Name"
        value={name}
        onChangeText={setName}
      />

      {/* Role Dropdown */}
      {/* <View style={styles.fieldContainer}>
        <Text style={styles.label}>Role</Text>
        <Dropdown
          options={['Admin', 'Parent', 'Child']}
          selectedValue={role}
          onValueChange={(value) => setRole(value)}
        />
      </View> */}

      {/* Email Field */}
      <InputField
        label="Email"
        placeholder="email@email.com"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      {/* Age Dropdown */}
      {/* <View style={styles.fieldContainer}>
        <Text style={styles.label}>Age</Text>
        <Dropdown
          options={['10', '15', '20', '25', '30', '35', '40']}
          selectedValue={age}
          onValueChange={(value) => setAge(value)}
        />
      </View> */}

      <View style={styles.buttonContainer}>
        <PrimaryButton2
          backgroundColor="#476BFB"
          textColor="#FFFFFF"
          buttonText={loading ? 'Adding...' : 'Add'}
          size="large"
          disabled={loading}
          hasIcon={false}
          hasText={true}
          textAlignment="center"
          onPress={handleAddMember}
        />
      </View>

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backText: {
    color: '#333232',
    fontSize: 16,
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333232',
    textAlign: 'center',
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 100,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});