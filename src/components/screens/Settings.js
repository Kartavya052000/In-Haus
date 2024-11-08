import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import Typography from '../typography/Typography';
import Colors from '../Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import { BackIcon } from '../icons/icons';

const { height } = Dimensions.get('window');

export default function Settings() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.getPermissionsAsync();
        if (status === 'granted') {
          setHasCameraPermission(true);
          setIsCameraEnabled(true);
        } else {
          setHasCameraPermission(false);
        }
      } catch (error) {
        console.error("Error getting camera permissions:", error);
      }
    })();
  }, []);

  const handleToggle = async () => {
    try {
      if (!isCameraEnabled) {
        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {
          setHasCameraPermission(true);
          setIsCameraEnabled(true);
        } else {
          setHasCameraPermission(false);
          Alert.alert(
            'Permission Denied',
            'Camera access is required to use this feature.'
          );
        }
      } else {
        setIsCameraEnabled(false);
      }
    } catch (error) {
      console.error("Error requesting camera permissions:", error);
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
          Settings
        </Typography>

        <View style={styles.permissionCard}>
        <Typography variant="BodyS" color={Colors?.Secondary?.Blue?.[500]} align="left" style={styles.headerText}>Allowing camera access will enhance your experience with mealAI. Take pictures of ingredients to get instant meal suggestions, or snap a photo of prepared dishes to discover recipes. With camera access, meal planning becomes easier and more interactive. </Typography>
          <Text style={styles.permissionDescription}  variant="S">
            
          </Text>
          <View style={styles.toggleContainer}>
            <Typography variant="SH3" color={Colors?.Primary?.Blue?.[500]} align="left" style={styles.cameraHeaderText}>Camera</Typography>
            <Switch
              value={isCameraEnabled}
              onValueChange={handleToggle}
              trackColor={{ false: '#767577', true: Colors?.Primary?.Blue?.[500] || '#0000ff' }}
              thumbColor={isCameraEnabled ? Colors?.Primary?.Blue?.[500] || '#0000ff' : '#f4f3f4'}
            />
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
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: -20,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    paddingBottom: 16,
  },
  permissionCard: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraHeaderText: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    paddingBottom: 16,
    paddingLeft: 16,
  },
viewBackButton: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

});