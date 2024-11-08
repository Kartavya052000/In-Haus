import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Typography from '../typography/Typography';
import Colors from '../Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../Dropdown/Dropdown';
import InputField from '../Inputs/InputField';
import { BackIcon } from '../icons/icons';

const { height } = Dimensions.get('window');

const profileData = {
    name: "Arthur Weasley",
    role: "Admin",
    email: "arthurw00@hogwarts.com",
  };

export default function UserProfile({ name = profileData.name, role = profileData.role, email = profileData.email }) {
    const navigation = useNavigation();
  
    return (
        <View style={styles.container}>
          <LinearGradient
            colors={['rgba(235, 251, 255, 1)', 'rgba(143, 214, 233, 1)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.headerBackground}
          />
          <View style={styles.contentContainer}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <View style={styles.viewBackButton}>
                <BackIcon color={Colors?.Secondary?.Blue?.[400]} />
              </View>
            </TouchableOpacity>
            
            {/* Header */}
            <Typography 
              variant="H5" 
              color={Colors.Secondary.Blue[500]}
              align="center"
              style={styles.headerText}
            >
              Edit Profile
            </Typography>
            <View style={styles.permissionCard}>

                  {/* Profile Image Placeholder with Camera Icon */}
                  <View style={styles.profileImageContainer}>
                    <View style={styles.profileImagePlaceholder}>
                      {/* Espacio reservado para la imagen */}
                    </View>
                    <View style={styles.cameraIconContainer}>
                      {/* Icono de cámara (deja en blanco por ahora) */}
                    </View>
                  </View>
                  
                  {/* Profile Form Fields */}
                  <InputField label="Full Name" placeholder="Arthur Weasley" value={name} inputWidth="100%" />
                  <InputField label="Email" placeholder="arthurw00@hogwarts.com" value={email} inputWidth="100%" />
                  <InputField label="Date of Birth" placeholder="Oct 10, 1989" inputWidth="100%" />
                  <InputField label="Groups" placeholder="Weasley Wizard Family" inputWidth="100%" />
                  
                  {/* Dropdown for Role */}
                  <Dropdown 
                    label="Role" 
                    options={['Admin', 'User', 'Guest']} 
                    selectedValue={role}
                  />
                  
                  {/* Save Button */}
                  <TouchableOpacity style={styles.saveButton}>
                    <Typography style={styles.saveButtonText} variant="BodyS" color="#FFFFFF">
                      Save
                    </Typography>
                  </TouchableOpacity>

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
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 28,
        paddingBottom: 16,
      },
      permissionCard: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '90%',
        marginBottom: 16,
      },
      permissionDescription: {
        // fontSize: 14,
        // color: '#333',
        marginBottom: 16,
      },
      toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      toggleLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      cameraHeaderText: {
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 28,
        paddingBottom: 16,
        paddingLeft: 16,
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
        width: 361, // Anchura completa
        height: 52, // Altura específica
        paddingVertical: 16, // Espacio superior e inferior
        paddingHorizontal: 0, // Sin espacio lateral
        backgroundColor: Colors.Primary.Brand[400], // Color de fondo azul (ajustado al color de la imagen)
        borderRadius: 16, // Bordes redondeados
        alignItems: 'center', // Centrado horizontal
        justifyContent: 'center', // Centrado vertical
        opacity: 1, // Asegurar opacidad
      },
      profileImagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ccc',
        marginBottom: 12,
      },

});
