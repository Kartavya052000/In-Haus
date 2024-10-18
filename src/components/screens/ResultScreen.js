import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const ResultScreen = ({ navigation, route }) => {
    const { imageUri } = route.params;
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMealRecognition = async () => {
        try {
            const formData = new FormData();
            formData.append('mealImage', {
                uri: imageUri,
                name: 'meal.jpg',
                type: 'image/jpg',
            });
            formData.append('export', 'json');

            const response = await fetch('http://10.128.213.4:3000/api/recognize-meal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();
            console.log('API Response:', data);
            const parsedResponse = data.response || data;

            setApiResponse(parsedResponse);
            setLoading(false);
        } catch (err) {
            console.log('Error:', err);
            setError('Error fetching meal recognition');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMealRecognition();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>What is this?</Text>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={{ width: '100%', height: 200, marginBottom: 20 }} />
                )}

                {apiResponse ? (
                    apiResponse.isRecognized === 'true' && apiResponse.isMeal === 'true' ? (
                        <View>
                            <Text style={styles.title}>{apiResponse.mealName}</Text>
                            <Text style={styles.description}>{apiResponse.fullDescription}</Text>

                            <Text style={styles.subtitle}>Ingredients:</Text>
                            {apiResponse.ingredients.map((item, index) => (
                                <View key={index} style={styles.ingredientContainer}>
                                    <Text style={styles.bulletPoint}>• {item.name}: {item.qty}</Text>
                                    <Text style={styles.note}>{item.note}</Text>
                                </View>
                            ))}

                            <Text style={styles.subtitle}>Recipe:</Text>
                            <Text>{apiResponse.recipe}</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.errors}>Sorry, we couldn't recognize the meal.</Text>
                        </View>
                    )
                ) : (
                    <Text>{error}</Text>
                )}

                {/* Buttons for Retrying or Navigating back */}
                <View style={styles.buttonContainer}>
                    <Button title="Retake Picture" onPress={() => navigation.navigate('CameraScreen')} />
                    <Button
                        title="Go Back to Meal-AI"
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'MealAI' }],
                        })}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1, // Ensure ScrollView takes up available space
        justifyContent: 'space-between', // Ensure content and buttons are spaced correctly
    },
    contentContainer: {
        padding: 20,
    },
    errors: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    heading: {
        paddingTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    ingredientContainer: {
        marginBottom: 5,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    bulletPoint: {
        fontSize: 16,
        marginRight: 10,
    },
    note: {
        fontStyle: 'italic',
        marginLeft: 10, // For indentation under the bullet point
    },
    buttonContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingBottom: 50, // Add padding to prevent the buttons from being cut off
        marginBottom: 20,
    },
});

export default ResultScreen;
