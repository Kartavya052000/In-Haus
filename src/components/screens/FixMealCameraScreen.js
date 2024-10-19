import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

export default function FixMealCameraScreen({ navigation }) {
    const [facing, setFacing] = useState('back');
    const [loading, setLoading] = useState(false);
    const cameraRef = useRef(null);

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: false };
            const photo = await cameraRef.current.takePictureAsync(options);

            // Resize the image to a maximum of 500x500 pixels
            const resizedImage = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 500, height: 500 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );

            setLoading(true); // Show loading indicator

            // Navigate to FixMealResultScreen with the resized image URI
            navigation.navigate('FixMealResultScreen', { imageUri: resizedImage.uri });
            setLoading(false); // Hide loading indicator after navigation
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.flip_camera_btn} onPress={toggleCameraFacing}>
                        <FontAwesome6 name="camera-rotate" size={44} color="white" />
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.take_photo_btn} onPress={takePicture}>
                        <FontAwesome6 name="camera" size={44} color="white" />
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.close_camera_btn} onPress={() => navigation.goBack()}>
                        <FontAwesome6 name="window-close" size={44} color="white" />
                        <Text style={styles.text}>Close Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
    flip_camera_btn: {
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        alignItems: 'center',
    },
    take_photo_btn: {
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        alignItems: 'center',
    },
    close_camera_btn: {
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: 'white',
        marginTop: 5,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
