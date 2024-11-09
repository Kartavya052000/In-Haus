import { Dimensions } from 'react-native';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Typography from '../typography/Typography';
import Colors from '../Colors/Colors';
import { useNavigation } from '@react-navigation/native';
import Dropdown from '../Dropdown/Dropdown';
import InputField from '../Inputs/InputField';
import { BackIcon } from '../icons/icons';
import { useQuery, useMutation } from "@apollo/client";
import { MY_PROFILE, UPDATE_PROFILE_MUTATION } from '../../graphql/mutations/authMutations'; // Ajusta esta ruta según tu estructura

const { height } = Dimensions.get('window');

export default function UserProfile() {
    const navigation = useNavigation();

    const { data, loading, error } = useQuery(MY_PROFILE);
    
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');

    React.useEffect(() => {
        if (data) {
            setName(data.myProfile.username);
            setRole("Admin");
            setEmail(data.myProfile.email);
        }
    }, [data]);

    // const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    //     onCompleted: () => Alert.alert("Profile updated successfully!"),
    //     onError: (err) => Alert.alert("Error updating profile", err.message),
    // });

    const handleSave = () => {
        updateProfile({
            variables: {
                username: name,
                email: email,
                role: role,
            },
        });
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;

    return (
        <View style={styles.container}>
          <LinearGradient
            colors={['rgba(235, 251, 255, 1)', 'rgba(143, 214, 233, 1)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.headerBackground}
          />
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <View style={styles.viewBackButton}>
                <BackIcon color={Colors?.Secondary?.Blue?.[400]} />
              </View>
            </TouchableOpacity>
            
            <Typography 
              variant="H5" 
              color={Colors.Secondary.Blue[500]}
              align="center"
              style={styles.headerText}
            >
              Edit Profile
            </Typography>
            <View style={styles.permissionCard}>
                {/* Contenedor centrado para la imagen del perfil */}
                <View style={styles.profileImageContainer}>
                    <View style={styles.profileImagePlaceholder}>
                        {/* Espacio reservado para la imagen */}
                    </View>
                </View>
                  
                <InputField
                    label="Full Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    inputWidth="100%"
                />
                <InputField
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    inputWidth="100%"
                    disabled
                />
                <InputField
                    label="Date of Birth"
                    placeholder="DD/MM/YYYY"
                    inputWidth="100%"
                    disabled
                />
                <InputField
                    label="Groups"
                    placeholder="Team Atlas"
                    inputWidth="100%"
                />

                <Dropdown 
                    label="Role" 
                    options={['Admin', 'User', 'Guest']}
                    selectedValue={role}
                    onValueChange={setRole}
                    disabled={true}
                />
                  
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    profileImageContainer: {
        alignItems: 'center', // Centra horizontalmente
        justifyContent: 'center', // Centra verticalmente
        marginBottom: 16,
    },
    profileImagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ccc',
        marginBottom: 12,
    },
    saveButton: {
        width: 361,
        height: 52,
        paddingVertical: 16,
        backgroundColor: Colors.Primary.Brand[400],
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
