import React, { useState, useEffect } from 'react';
import { View, Alert, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Dropdown from '../../components/Dropdown/Dropdown';
import PrimaryButton2 from '../../components/buttons/PrimaryButton2';
import InputField from '../../components/Inputs/InputField';
import Colors from '../Colors/Colors';
import { BackIcon, SaveIcon } from '../icons/icons';
import Typography from '../typography/Typography';

const { height } = Dimensions.get('window');

export default function UserDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params;

  // State variables with default values from route.params.user
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState(user.role);
  const [groups, setGroups] = useState('');

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://your-api-endpoint.com/users/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setEmail(data.email || user.email || '');
          setDob(data.dob || user.dob || '');
          setGroups(data.groups || user.groups || '');
        } else {
          // Use the user data passed from route.params if fetch fails
          setEmail(user.email || '');
          setDob(user.dob || '');
          setGroups(user.groups || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Set default values from route.params on error
        setEmail(user.email || '');
        setDob(user.dob || '');
        setGroups(user.groups || '');
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async (field, value) => {
    try {
      const response = await fetch(`https://your-api-endpoint.com/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });
      if (response.ok) {
        Alert.alert('User details saved successfully');
      } else {
        Alert.alert('Error saving user details');
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      Alert.alert('Error saving user details');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(235, 251, 255, 1)', 'rgba(143, 214, 233, 1)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      />
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.viewBackButton}>
            <BackIcon color={Colors?.Secondary?.Blue?.[400]} />
          </View>
        </TouchableOpacity>
        <Typography variant="H5" color={Colors?.Secondary?.Blue?.[500]} align="center" style={styles.headerText}>
          Add/Remove
        </Typography>
        <TouchableOpacity style={styles.saveButton}>
          <View style={styles.viewsaveButton}>
            <SaveIcon color={"white"} />
          </View>
        </TouchableOpacity>
        <View style={styles.userDetailsCard}>
          <InputField
            label="Full Name"
            placeholder="Enter full name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              handleSave('name', text);
            }}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              handleSave('email', text);
            }}
            keyboardType="email-address"
          />
          <InputField
            label="Date of Birth"
            placeholder="Enter date of birth"
            value={dob}
            onChangeText={(text) => {
              setDob(text);
              handleSave('dob', text);
            }}
          />
          <InputField
            label="Groups"
            placeholder="Enter groups"
            value={groups}
            onChangeText={(text) => {
              setGroups(text);
              handleSave('groups', text);
            }}
          />

          <View style={styles.fieldContainer}>
            <Typography variant="SH4" style={styles.label}>Role</Typography>
            <Dropdown
              options={['Admin', 'User']}
              selectedValue={role}
              onValueChange={(value) => {
                setRole(value);
                handleSave('role', value);
              }}
            />
          </View>

        </View>
          <TouchableOpacity style={styles.removeButton}>
            <Text style={styles.removeText}>Remove from Family</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.19,
  },
  contentContainer: {
    marginTop: height * 0.12,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 28,
    paddingBottom: 16,
  },
  userDetailsCard: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  removeButton: {
    marginTop: 20,
    padding: 15,
    borderColor: '#ff5c5c',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
  },
  removeText: {
    color: '#ff5c5c',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: -20,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  viewBackButton: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  saveButton: {
    position: 'absolute',
    top: -10,
    right: 10,
    padding: 10,
    zIndex: 1,
    backgroundColor: Colors?.Secondary?.Blue?.[400],
    borderRadius: 16,
  },
});
