// UserList.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NextIcon, BackIcon } from '../icons/icons';
import Colors from '../Colors/Colors';
import Typography from '../typography/Typography';
import { useLazyQuery } from '@apollo/client';
import { GET_GROUP } from '../../graphql/mutations/taskMutations'; // Adjust the path to your GraphQL query
import * as SecureStore from 'expo-secure-store';

const { height } = Dimensions.get('window');

export default function AddRemoveMember() {
  const [members, setMembers] = useState([]);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const [groupId, setGroupId] = useState('');


  const [fetchGroup, { loading, error }] = useLazyQuery(GET_GROUP, {
    onCompleted: (data) => {
      const transformedMembers = data.getGroup.members.map((member) => ({
        name: member.username,
        id: member.id,
        role: member.role // Assuming `role` exists in your data schema
      }));
      setMembers(transformedMembers);
    },
    onError: (error) => {
      console.error('Error fetching group:', error.message);
    },
  });

  // Retrieve the token from secure storage and fetch group data
  const getToken = async () => {
    try {
      const authToken = await SecureStore.getItemAsync('authToken');
      if (authToken) {
        setToken(authToken);
        fetchGroupData(authToken);
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      Alert.alert('Retrieval Error', 'Failed to retrieve authentication token.');
    }
  };

  const fetchGroupData = (authToken) => {
    fetchGroup({
      context: {
        headers: {
          Authorization: `${authToken}`,
        },
      },
      variables: {
        groupID: 'test', // Replace 'test' with the actual group ID if required
      },
    });
  };

  useEffect(() => {
    getToken(); // Fetch the token and group data when the component mounts
  }, []);

  const handleUserPress = (user) => {
    navigation.navigate('UserDetails', { user });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors?.Primary?.Blue} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching data: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(235, 251, 255, 1)', 'rgba(143, 214, 233, 1)']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      />
      <ScrollView style={styles.contentContainer}>
        <SafeAreaView style={styles.thirdContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <View style={styles.viewBackButton}>
                <BackIcon color={Colors?.Secondary?.Blue?.[400]} />
              </View>
            </TouchableOpacity>
            <Typography variant="H5" color={Colors?.Secondary?.Blue?.[500]} align="center" style={styles.headerText}>
              Add/Remove
            </Typography>
          </View>
        </SafeAreaView>
      </ScrollView>
      <ScrollView style={styles.mainContentContainer}>
        <View style={styles.headBackground}>
          <Typography variant="BodyS" color={Colors?.Secondary?.Blue?.[500]} align="left" style={styles.description}>
            Easily add or remove family members and assign roles to each. This helps you organize tasks and sync everyone’s schedules, making sure the right person gets the right task at the right time. Keep your household in sync and running smoothly by managing your family roles here.
          </Typography>
        </View>
        {members.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userContainer}
            onPress={() => handleUserPress(user)}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userRole}>{user.role}</Text>
              </View>
              <NextIcon color={"black"} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
    flex: 1,
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 16,
  },
  userContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 14,
    color: '#888',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.19,
  },
  thirdContainer: {
    marginTop: height * 0.12,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  mainContentContainer: {
    position: 'absolute',
    top: height * 0.16,
    alignSelf: 'center',
    width: '90%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  headerRow: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
});
