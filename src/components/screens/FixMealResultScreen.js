import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const FixMealResultScreen = ({ navigation, route }) => {
    const { imageUri } = route.params;
    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMealSuggestions = async () => {
        try {
            const formData = new FormData();
            formData.append('mealImage', {
                uri: imageUri,
                name: 'meal.jpg',
                type: 'image/jpg',
            });
            formData.append('export', 'json');

            const response = await fetch('http://10.128.195.186:3000/api/fix-me-a-meal', {
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
            setError('Error fetching meal suggestions');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMealSuggestions();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Meal Suggestions</Text>
            {imageUri && (
                <Image source={{ uri: imageUri }} style={{ width: '100%', height: 200, marginBottom: 20 }} />
            )}

            {apiResponse ? (
                apiResponse.isRecognized === 'true' && apiResponse.hasIngredients === 'true' ? (
                    <View>
                        <Text style={styles.description}>{apiResponse.fullDescription}</Text>

                        <Text style={styles.subtitle}>Recognized Ingredients:</Text>
                        {apiResponse.ingredientsRecognized.map((item, index) => (
                            <View key={index} style={styles.ingredientContainer}>
                                <Text style={styles.bulletPoint}>• {item.name}</Text>
                            </View>
                        ))}

                        <Text style={styles.subtitle}>Meal Suggestions:</Text>
                        {apiResponse.mealSuggestions.map((meal, index) => (
                            <View key={index} style={styles.mealContainer}>
                                <Text style={styles.mealName}>{meal.mealName}</Text>
                                <Text style={styles.recipe}>{meal.recipe}</Text>

                                <Text style={styles.subtitle}>Ingredients:</Text>
                                {meal.ingredients.map((ingredient, idx) => (
                                    <View key={idx} style={styles.ingredientContainer}>
                                        <Text style={styles.bulletPoint}>• {ingredient.name}: {ingredient.qty}</Text>
                                        <Text style={styles.note}>{ingredient.note}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                ) : (
                    <View>
                        <Text>Sorry, we couldn't provide any meal suggestions.</Text>
                    </View>
                )
            ) : (
                <Text>{error}</Text>
            )}

            <View style={styles.buttonContainer}>
                <Button title="Retake Picture" onPress={() => navigation.navigate('FixMealCameraScreen')} />
                <Button title="Go Back to MealAI" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'MealAI' }] })} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 80,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    mealContainer: {
        marginVertical: 20,
    },
    mealName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipe: {
        marginBottom: 10,
    },
    note: {
        fontStyle: 'italic',
        marginLeft: 10,
    },
    buttonContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FixMealResultScreen;
