import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Typography from '../typography/Typography';
import Colors from '../Colors/Colors';

import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/client";
import { MY_PROFILE } from '../../graphql/mutations/authMutations'; // Ajusta la ruta según tu estructura de carpetas


const { height } = Dimensions.get('window');

export default function Profile() {
  const navigation = useNavigation();

  // Realiza la consulta MY_PROFILE para obtener los datos del usuario
  const { loading, error, data } = useQuery(MY_PROFILE);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  // Extrae los datos de perfil obtenidos de la consulta
  const { username, email } = data.myProfile;
  const role = "Admin"; // Puedes ajustar este valor según tus necesidades

  const handleOptionPress = (option) => {
    if (option === 'Settings') {
      navigation.navigate('Settings');
    } else if (option === 'Notifications') {
      navigation.navigate('Notifications');
    } else if (option === 'Add/Remove Member') {
      navigation.navigate('AddRemoveMember');
    } else if (option === 'Terms & Conditions') {
      navigation.navigate('TermsConditions');
    } else if (option === 'Log Out') {
      navigation.navigate('Login');
    }
  };

  const handleProfileImagePress = () => {
    navigation.navigate('UserProfile');
  };

  const logOut = async () => {
    try {
      // Delete only the authToken from SecureStore
      await SecureStore.deleteItemAsync("authToken");
  
      // Navigate to the WelcomePage after logging out

      navigation.navigate("WelcomePage");
    } catch (error) {
      console.log("Error logging out:", error);
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
        <Typography
          variant="H5"
          color={Colors.Secondary.Blue[500]}
          align="center"
          style={styles.headerText}
        >
          Edit Profile
        </Typography>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={handleProfileImagePress}>
            <View style={styles.profileImagePlaceholder} />
          </TouchableOpacity>
          <Typography variant="SH3" style={styles.userName}>
            {username}
          </Typography>
          <Typography variant="S" style={styles.userInfo} color={Colors.Secondary.Gray[400]}>
            {role}
          </Typography>
          <Typography variant="S" style={styles.userInfo} color={Colors.Secondary.Gray[400]}>
            {email}
          </Typography>
          <View style={styles.optionsList}>
            {['Settings', 'Notifications', 'Add/Remove Member', 'Terms & Conditions'].map((option, index) => (
              <TouchableOpacity key={index} style={styles.optionItem} onPress={() => handleOptionPress(option)}>
                <Typography variant="SH3" style={styles.userInfo}>
                  {option}
                </Typography>
                <Text style={styles.optionIcon}>›</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.logoutItem} onPress={logOut}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

          </View>
        </View>
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
    // paddingHorizontal: 16,
  },
  headerText: {
    marginBottom: 20,
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
  },
  profileCard: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#333',
    lineHeight: 24,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  optionsList: {
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    fontWeight: '700',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionIcon: {
    fontSize: 18,
    color: '#999',
  },
  logoutItem: {
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
