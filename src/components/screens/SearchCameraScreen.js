import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { CameraView } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import Typography from '../../components/typography/Typography'; // Import Typography
import CustomLoadingScreen from '../../components/Loading/CustomLoadingScreen'; // Import CustomLoadingScreen


export default function SearchCameraScreen({ navigation }) {
    const [facing, setFacing] = useState('back');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState('Recognize'); // New state for mode toggle (Recognize/Suggest)
    const cameraRef = useRef(null);

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        setLoading(true); // Start loading
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: false };
            const photo = await cameraRef.current.takePictureAsync(options);

            // Resize the image to a maximum of 500x500 pixels
            const resizedImage = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 500, height: 500 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );


            try {
                const apiResponse = await fetchOpenAIWithImage(resizedImage.uri);
                const response = apiResponse.response;
                console.log('AI Response:', apiResponse);
                navigation.navigate('MealDetailsAI', {
                    isRecognized: apiResponse.isRecognized, // Use apiResponse directly
                    isMeal: apiResponse.isMeal,
                    image: resizedImage.uri,
                    title: apiResponse.title,
                    fullDescription: apiResponse.fullDescription,
                    recipe: apiResponse.recipe,
                    servings: apiResponse.servings,
                    ingredients: apiResponse.ingredients,
                    readyInMinutes: apiResponse.readyInMinutes,
                    healthScore: apiResponse.healthScore,
                });
            } catch (error) {
                console.error('Failed to recognize image', error);
            }

            setLoading(false);
        }
    };


    const fetchOpenAIWithImage = async (imageUri) => {
        try {
            const formData = new FormData();
            formData.append('mealImage', {
                uri: imageUri,
                name: 'meal.jpg',
                type: 'image/jpg',
            });
            formData.append('export', 'json'); // Ensure export format is set to JSON

            var api_fetch = 'suggest-meal';
            if (mode === 'Recognize') {
                api_fetch = 'recognize-meal';
            }

            console.log('attempting to ' + api_fetch);
            const response = await fetch('http://192.168.1.174:3000/api/' + api_fetch, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Failed to process image');
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('API call error:', error);
            throw error;
        }
    };



    return (
        <View style={{ flex: 1 }}>
            {/* Loading Overlay */}

            {loading && (

                <View style={styles.loadingOverlay}>
                    <CustomLoadingScreen style={styles.loadingText} />

                </View>

            )}



            {/* Top bar with dismiss button */}
            <View style={styles.topBar}>
                <Text style={styles.topText}>Take a picture to recognize or suggest.</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="times-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

            {/* Bottom bar with mode toggle and capture button */}
            <View style={styles.bottomBar}>
                <View style={styles.modeContainer}>
                    <TouchableOpacity onPress={() => setMode('Recognize')}>
                        <Text style={[styles.modeText, mode === 'Recognize' && styles.activeModeText]}>Recognize</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setMode('Suggest')}>
                        <Text style={[styles.modeText, mode === 'Suggest' && styles.activeModeText]}>Suggest</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
                    <FontAwesome6 name="camera" size={40} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.flipBtn} onPress={toggleCameraFacing}>
                    <FontAwesome6 name="camera-rotate" size={24} color="white" />
                </TouchableOpacity>
            </View>

        </View >
    );

}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,

    },

    loadingText: {

        marginTop: 10,

        color: '#fff',

        fontSize: 18,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    topText: {
        color: 'white',
        fontSize: 16,
    },
    closeBtn: {
        padding: 8,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 24,
        paddingTop: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginBottom: 12,
    },
    modeText: {
        color: 'gray',
        fontSize: 16,
    },
    activeModeText: {
        color: 'white',
        textDecorationLine: 'underline',
    },
    captureBtn: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 20,
        marginBottom: 10,
    },
    flipBtn: {
        position: 'absolute',
        right: 16,
        bottom: 24,
    },
});
