import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';
import { gql, useMutation } from '@apollo/client';

const SAVE_RECIPE = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`;

const convertImageToBase64 = async (imageUri) => {
  try {
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

const MealDetailsAI = ({ route, navigation }) => {
  const { response, image } = route.params || {};
  const { title, fullDescription, recipe, servings, ingredients, readyInMinutes, healthScore } = response;

  const [authToken, setAuthToken] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(true);

  const [saveRecipe] = useMutation(SAVE_RECIPE, {
    onCompleted: (data) => {
      console.log('onCompleted triggered:', data);
      console.log('Navigating to MealDetails...');
      navigation.replace('MealDetails', {
        id: data.addRecipe.id,
        image: base64Image, // Pass base64Image from state
        title,
        selectedServings: servings,
      });
      console.log('Navigation executed');
      setLoading(false);
    },
    onError: (error) => {
      console.error('Error saving recipe to DB:', error.message);
      setLoading(false);
    },
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        // Retrieve auth token
        const token = await SecureStore.getItemAsync('authToken');
        if (!token) {
          console.error('No auth token found');
          setLoading(false);
          return;
        }

        console.log('Token found:', token);
        setAuthToken(token);

        // Convert image to base64
        const convertedImage = await convertImageToBase64(image);
        setBase64Image(convertedImage); // Save converted image to state

        // Execute mutation
        const aiID = parseInt('1001' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0'));
        await saveRecipe({
          context: {
            headers: {
              Authorization: `${token}`,
            },
          },
          variables: {
            recipe: {
              id: aiID,
              title,
              image: convertedImage,
              summary: fullDescription,
              readyInMinutes: readyInMinutes.toString(),
              healthScore: healthScore.toString(),
              cuisines: ['international'],
              servings: servings.toString(),
              instructions: recipe,
              ingredients: ingredients.map((ing) => ({
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit,
              })),
              steps: recipe.split('\n').map((step) => ({ step })),
            },
          },
        });
      } catch (error) {
        console.error('Error during initialization:', error.message);
        setLoading(false);
      }
    };

    initialize();
  }, [
    image,
    ingredients,
    recipe,
    saveRecipe,
    servings,
    title,
    fullDescription,
    readyInMinutes,
    healthScore,
    navigation,
  ]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealDetailsAI;
