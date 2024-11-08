import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ShoppingListContext } from '../../components/contexts/ShoppingListContext';

const { height } = Dimensions.get('window');

const ResultScreen = ({ navigation, route }) => {
    const { imageUri } = route.params;
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentServings, setCurrentServings] = useState(4); // Default to 4 servings
    const { shoppingListItems, setShoppingListItems } = useContext(ShoppingListContext);

    const fetchMealRecognition = async () => {
        try {
            const formData = new FormData();
            formData.append('mealImage', {
                uri: imageUri,
                name: 'meal.jpg',
                type: 'image/jpg',
            });
            formData.append('export', 'json');

            const response = await fetch('http://192.168.110.150:3000/api/recognize-meal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();
            const parsedResponse = data.response || data;

            setApiResponse(parsedResponse);
            setLoading(false);
        } catch (err) {
            console.log('Error fetching meal recognition:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMealRecognition();
    }, []);

    const handleBack = () => {
        navigation.goBack();
    };

    const adjustServings = (type) => {
        if (type === 'increment') {
            setCurrentServings(currentServings + 1);
        } else if (type === 'decrement' && currentServings > 1) {
            setCurrentServings(currentServings - 1);
        }
    };

    const addToShoppingList = () => {
        if (!apiResponse) return;

        const newMeal = {
            mealId: apiResponse.id,
            mealTitle: apiResponse.title,
            ingredients: apiResponse.extendedIngredients.map(ingredient => ({
                name: ingredient.name,
                amount: parseFloat((ingredient.amount * (currentServings / apiResponse.servings)).toFixed(2)),
                unit: ingredient.unit || '',
                checked: false,
            }))
        };

        setShoppingListItems([...shoppingListItems, newMeal]);

        // Navigate to MealPlanner with the Shopping List tab active
        navigation.navigate('MealPlanner', {
            selectedTab: 'Shopping List',
        });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ImageBackground source={{ uri: imageUri }} style={styles.mealImage} resizeMode="cover">
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <FontAwesome6 name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.mealInfoContainer}>
                {apiResponse && apiResponse.title ? (
                    <>
                        <Text style={styles.mealTitle}>{apiResponse.title}</Text>
                        <Text style={styles.summaryText}>{apiResponse.summary}</Text>

                        {/* Servings */}
                        <View style={styles.servingsContainer}>
                            <Text style={styles.servingsText}>Servings: {currentServings}</Text>
                            <View style={styles.servingsAdjustContainer}>
                                <TouchableOpacity onPress={() => adjustServings('decrement')} style={styles.servingsButton}>
                                    <Text style={styles.servingsButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.servingsNumber}>{currentServings}</Text>
                                <TouchableOpacity onPress={() => adjustServings('increment')} style={styles.servingsButton}>
                                    <Text style={styles.servingsButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Ingredients */}
                        <Text style={styles.sectionTitle}>Ingredients:</Text>
                        {apiResponse.extendedIngredients?.map((item, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <Text style={styles.ingredientAmount}>
                                    {parseFloat((item.amount * (currentServings / apiResponse.servings)).toFixed(2))} {item.unit}
                                </Text>
                                <Text style={styles.ingredientName}>{item.name}</Text>
                            </View>
                        ))}

                        <TouchableOpacity style={styles.addButton} onPress={addToShoppingList} activeOpacity={0.7}>
                            <Text style={styles.addButtonText}>Add Ingredients to Shopping List</Text>
                        </TouchableOpacity>

                        {/* Instructions */}
                        <Text style={styles.sectionTitle}>Instructions:</Text>
                        {apiResponse.instructions?.length > 0
                            ? apiResponse.instructions.map((instruction, index) => (
                                  <Text key={index} style={styles.instructionText}>
                                      {index + 1}. {instruction.step}
                                  </Text>
                              ))
                            : <Text>No instructions available.</Text>}
                    </>
                ) : (
                    <Text style={styles.errorText}>Sorry, we couldn't recognize the meal.</Text>
                )}

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CameraScreen')}>
                        <Text style={styles.buttonText}>Retake Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('MealAI')}>
                        <Text style={styles.buttonText}>Go Back to MealAI</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mealImage: {
        width: '100%',
        height: height * 0.4,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backButton: {
        padding: 8,
    },
    mealInfoContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    mealTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 16,
        marginBottom: 8,
    },
    servingsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    servingsAdjustContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    servingsButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 4,
        marginHorizontal: 4,
    },
    servingsButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    servingsNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    ingredientAmount: {
        fontSize: 16,
    },
    ingredientName: {
        fontSize: 16,
    },
    instructionText: {
        fontSize: 16,
        marginBottom: 4,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#2e86de',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#2e86de',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ResultScreen;
